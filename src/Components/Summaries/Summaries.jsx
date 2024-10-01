import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { FaRegHandshake } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

function Summaries() {
    const navigate = useNavigate();
    const [Summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD  MMMM  YYYY");
    };
    useEffect(() => {
        setLoading(true);
        const fetchSummaries = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Summaries`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setSummaries(response.data.Summary);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummaries();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [SummariesTypeFilter, setSummariesTypeFilter] = useState("");
    const filteredSummariess = Summaries.filter((summarys) => {
        const title = `${summarys.Title}`.toLowerCase();
        return title.includes(searchQuery.toLowerCase());
    }).filter((summarys) => {
        if (SummariesTypeFilter) {
            return summarys.status === SummariesTypeFilter;
        }
        return true;
    });

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold  text-green_b pb-6">
                    flexedu Summaries
                </div>
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-end md:mr-6 md:gap-6 text-gray-600">
                    <div className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                        <IoSearch className="w-fit shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <select
                        value={SummariesTypeFilter}
                        onChange={(e) => setSummariesTypeFilter(e.target.value)}
                        className="border p-2 w-fit mx-auto md:mx-0 rounded-md text-sm font-semibold"
                    >
                        <option value="">All</option>
                        <option value="Payed">Payed</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                {filteredSummariess.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray-600 pt-6">
                        No Summaries found
                    </div>
                ) : (
                    <div>
                        <table className="table-auto w-full mt-4 text-sm ">
                            <thead>
                                <tr className="bg-gray-200 font-normal">
                                    <th className="px-4 py-2 rounded-tl-md">
                                        Summary Title
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Status{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        DeadLine{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Fees{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Status Description{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Created At
                                    </th>
                                    <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold ">
                                {filteredSummariess.map((summary) => (
                                    <tr key={summary.id}>
                                        <td className="border px-4 py-2">
                                            {`${summary?.Title}`}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {summary?.status}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {summary?.DeadLine ? (
                                                summary?.DeadLine
                                            ) : (
                                                <div className="text-red-600">
                                                    No Deadline
                                                </div>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {summary?.Money ? (
                                                summary?.Money
                                            ) : (
                                                <div className="text-red-600">
                                                    Not set
                                                </div>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {summary?.status === "Payed" &&
                                            !summary?.isWorkUploaded ? (
                                                <>
                                                    <div className="">
                                                        <span className="text-green_v">
                                                            Payed :
                                                        </span>{" "}
                                                        payment accepted. <br />
                                                        a Student is working on
                                                        the summary
                                                    </div>
                                                </>
                                            ) : summary?.status === "Payed" &&
                                              summary?.isWorkUploaded &&
                                              !summary?.isWorkRejected ? (
                                                <div className="">
                                                    <span className="text-green_v">
                                                        Uploaded :
                                                    </span>{" "}
                                                    The Student Upload the files
                                                    of the summary .
                                                </div>
                                            ) : summary?.status === "Payed" &&
                                              summary?.isWorkUploaded &&
                                              summary?.isWorkRejected ? (
                                                <div className="">
                                                    <span className="text-red-500">
                                                        Rejection Sent to the
                                                        Student :
                                                    </span>{" "}
                                                    student is correcting the
                                                    mentioned pointes .
                                                </div>
                                            ) : summary?.status ===
                                              "Rejected" ? (
                                                <div className="">
                                                    <span className="text-red-600">
                                                        Rejected :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        the summary has been
                                                        rejected.
                                                    </span>
                                                </div>
                                            ) : summary?.status ===
                                              "Completed" ? (
                                                <div className="">
                                                    <span className="text-green_v">
                                                        Completed :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        the summary has been
                                                        closed.
                                                    </span>
                                                </div>
                                            ) : !summary?.isPayment_ScreenShot_uploaded &&
                                              summary?.status === "Accepted" &&
                                              summary?.FreelancerId ? (
                                                <div className="">
                                                    <span className="text-gray_v">
                                                        Accepted :
                                                    </span>{" "}
                                                    <span className=" text-red-500">
                                                        waiting teacher to pay
                                                        the summary fees
                                                    </span>
                                                </div>
                                            ) : summary?.isPayment_ScreenShot_uploaded &&
                                              summary?.status === "Accepted" &&
                                              summary?.FreelancerId &&
                                              !summary?.isPayment_ScreenShot_Rejected ? (
                                                <div className="">
                                                    <span className="text-green_v">
                                                        Accepted :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        Waiting for payment
                                                        Validation
                                                    </span>
                                                </div>
                                            ) : summary?.isPayment_ScreenShot_uploaded &&
                                              summary?.status === "Accepted" &&
                                              summary?.FreelancerId &&
                                              summary?.isPayment_ScreenShot_Rejected ? (
                                                <div className="">
                                                    <span className="text-red-500">
                                                        Payment Rejected :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        Payment Rejected ,
                                                        waiting for the Teacher
                                                        to reupload the payment
                                                        screenshot
                                                    </span>
                                                </div>
                                            ) : summary?.isPayment_ScreenShot_uploaded &&
                                              summary?.status === "Accepted" &&
                                              summary?.FreelancerId &&
                                              summary?.isPayment_ScreenShot_Rejected ? (
                                                <div className="">
                                                    <span className=" text-red-500">
                                                        the payment has been
                                                        rejected :{" "}
                                                    </span>
                                                    <span className="text-gray_v">
                                                        Payment Rejected ,
                                                        waiting for the Teacher
                                                        to reupload the payment
                                                        screenshot{" "}
                                                    </span>{" "}
                                                </div>
                                            ) : summary?.status ===
                                                  "Accepted" &&
                                              !summary?.FreelancerId ? (
                                                <div>
                                                    <span className="text-green_v">
                                                        Accepted
                                                    </span>{" "}
                                                    Searching For the Student
                                                </div>
                                            ) : summary?.status ===
                                              "Pending" ? (
                                                <div>
                                                    <span className="text-green_v">
                                                        Pending
                                                    </span>{" "}
                                                    <span className="">
                                                        waiting for validation
                                                    </span>
                                                </div>
                                            ) : null}
                                            {/* {summary?.status} */}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {/* {new Date(
                                            summary.createdAt
                                        ).toLocaleDateString()} */}
                                            {formatDate(summary?.createdAt)}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        `/Summaries/${summary.id}`
                                                    );
                                                }}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

export default Summaries;
