import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation } from "react-router-dom";

dayjs.extend(customParseFormat);

function Summary() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState();
    const location = useLocation();
    const summaryId = location.pathname.split("/")[2];
    const [showDescription, setShowDescription] = useState(false);

    function toggleDescription() {
        setShowDescription(!showDescription);
    }

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Summaries/${summaryId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setSummary(response.data.Summary);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should log in again", "error");
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
        fetchSummary();
    }, [summaryId, navigate]);

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                    <IoIosWarning />
                    <h1>Summary Not Found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 p-4">
            <div className="flex justify-between w-full">
                <div className="w-[90%]">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {summary?.Image ? (
                                <img
                                    className="w-[220px] h-[220px] object-cover"
                                    src={`http://localhost:3000/${summary?.Image}`}
                                    alt="Summary image"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-[220px] h-[220px] bg-gray-100">
                                    <CiImageOn className="text-xl" />
                                </div>
                            )}
                            <div>
                                <div className="text-gray_v text-lg font-semibold">
                                    {summary?.Title}
                                </div>
                                <div className="text-gray_v font-semibold">
                                    {summary?.Category}
                                </div>
                                {summary?.Price && (
                                    <div className="text-gray_v font-semibold">
                                        {summary?.Price} DA
                                    </div>
                                )}
                                <div className="text-gray_v font-semibold">
                                    Created at:{" "}
                                    {dayjs(summary?.createdAt).format(
                                        "DD MMMM YYYY"
                                    )}
                                </div>
                                <div className="flex gap-6 font-semibold text-gray_v pt-6">
                                    <div className="flex gap-4">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, index) =>
                                                index <
                                                Math.floor(
                                                    summary?.Rate || 0
                                                ) ? (
                                                    <FaStar
                                                        key={index}
                                                        className="text-yellow-400"
                                                    />
                                                ) : index <
                                                  Math.ceil(
                                                      summary?.Rate || 0
                                                  ) ? (
                                                    <FaStarHalf
                                                        key={index}
                                                        className="text-yellow-400"
                                                    />
                                                ) : (
                                                    <FaStar
                                                        key={index}
                                                        className="text-gray-400"
                                                    />
                                                )
                                            )}
                                        </div>
                                        <div>
                                            {summary?.Students_count
                                                ? `${summary?.Students_count} Enrolment`
                                                : "0 Enrolment"}
                                        </div>
                                        <div>
                                            {summary?.Pages_Count
                                                ? `${summary?.Pages_Count} Pages`
                                                : "0 Pages"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-600 font-semibold text-sm">
                        {showDescription ? (
                            <div className="w-[80%] pl-8 py-4">
                                <div
                                    className="select-none flex gap-2 items-center cursor-pointer"
                                    onClick={toggleDescription}
                                >
                                    Show Description <FaArrowUp />
                                </div>
                                <div className="pb-4">
                                    <p className="text-gray text-base">
                                        {summary?.Description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-[80%] pl-8 py-4">
                                <div
                                    className="select-none flex gap-2 items-center cursor-pointer"
                                    onClick={toggleDescription}
                                >
                                    Show Description <FaArrowDown />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-[10%]">
                    <Link
                        to={`/Teacher/Summaries/${summary?.id}/Edit`}
                        className="flex items-center justify-center font-bold p-2 mt-6 bg-gray-500 text-white cursor-pointer rounded-lg"
                    >
                        Edit Summary
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default Summary;
