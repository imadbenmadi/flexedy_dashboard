import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegImage } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
function Payment() {
    const location = useLocation();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const [only_see, set_only_see] = useState(false);
    const [deletLoading, setDeleteLoading] = useState(false);

    const [image_state, setimage_state] = useState(null);
    const [imageChanged, setimageChanged] = useState(false);
    const fileInputRef = useRef(null);
    const [image_from_server, setimage_from_server] = useState(null);
    const [AcceptLoading, setAcceptLoading] = useState(false);
    const [RejectLoading, setRejectLoading] = useState(false);
    const courseId = location.pathname.split("/")[2];
    useEffect(() => {
        setLoading(true);
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Payment/${courseId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const coursesData = response.data.course;
                    setCourse(coursesData);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);
    const handle_Accept = async () => {
        setAcceptLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Payment/${
                    location.pathname.split("/")[2]
                }/Accept`,
                {},
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Payment Accepteed Successfully",
                    "success"
                );
                Navigate("/Courses_Paying");
            } else if (response.status == 401) window.location.href = "Login";
            else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter`,
                "error"
            );
        } finally {
            setAcceptLoading(false);
        }
    };
    const handle_Reject = async () => {
        setRejectLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Payment/${
                    location.pathname.split("/")[2]
                }/Reject`,
                {},
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Payment Rejected Successfully",
                    "success"
                );
                Navigate("/Courses_Paying");
            } else if (response.status == 401) window.location.href = "Login";
            else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter`,
                "error"
            );
        } finally {
            setRejectLoading(false);
        }
    };
    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-green_b pb-6">
                Course Payment
            </div>
            <div className=" text-center font-semibold pb-12">
                {course?.status === "Payed" ? (
                    <>
                        <div className="">
                            <span className="text-green_v">Payed :</span>{" "}
                            Teacher Payed the Course fees
                        </div>
                    </>
                ) : !course?.isPayment_ScreenShot_uploaded &&
                  course?.status === "Accepted" &&
                  course?.FreelancerId ? (
                    <>
                        <div className="">
                            <span className=" text-red-500">
                                Teacher have not yet uploaded payment screenshot
                            </span>
                        </div>
                    </>
                ) : course?.isPayment_ScreenShot_uploaded &&
                  course?.status === "Accepted" &&
                  course?.FreelancerId &&
                  !course?.isPayment_ScreenShot_Rejected ? (
                    <div className="">
                        <span className="text-green_v">
                            Teacher uploaded the payment screenshot :
                        </span>{" "}
                        <span className=" text-gray_v">
                            Waiting for Payment Validation
                        </span>
                    </div>
                ) : course?.isPayment_ScreenShot_uploaded &&
                  course?.status === "Accepted" &&
                  course?.FreelancerId &&
                  course?.isPayment_ScreenShot_Rejected ? (
                    <>
                        <div className="">
                            <span className="text-red-500">
                                Payment Rejected :
                            </span>{" "}
                            <span className=" text-gray_v">
                                Waiting Teacher to reupload the Payment
                                screenshot
                            </span>
                        </div>
                    </>
                ) : course?.status === "Accepted" && !course?.FreelancerId ? (
                    <div>
                        <span className="text-green_v">Accepted :</span>{" "}
                        Wainting for freelancers to Apply for this course
                    </div>
                ) : null}
            </div>
            <div className=" text-lg pb-2 font-semibold md:mx-20">
                Payment Informations
            </div>

            <div className=" text-gray_v flex justify-center md:justify-start flex-col md:flex-row items-start gap-3 md:gap-12 md:mx-24 ">
                <div>
                    <div className=" flex flex-col gap-4">
                        <div>
                            Course fees :{" "}
                            <span className=" font-semibold">
                                {course?.Money ? course?.Money : "non set"}
                            </span>
                        </div>
                        <div>
                            DeadLine :{" "}
                            <span className=" font-semibold">
                                {course?.DeadLine
                                    ? course?.DeadLine
                                    : "non set"}
                            </span>
                        </div>
                        <div>
                            {" "}
                            Teacher ccp number :{" "}
                            <span className=" font-semibold">
                                {course?.Client_CCP_number
                                    ? course?.Client_CCP_number
                                    : "non set"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {course?.Pyament_ScreenShot_Link && (
                <div className=" pt-8">
                    <div className=" flex justify-center w-full">
                        <a
                            href={
                                "http://localhost:3000" +
                                course?.Pyament_ScreenShot_Link
                            }
                            target="_blank"
                        >
                            <img
                                src={
                                    "http://localhost:3000" +
                                    course?.Pyament_ScreenShot_Link
                                }
                                alt="Payment screen shot"
                                className=" w-[300px] h-[300px] object-cover rounded-lg  "
                            />
                        </a>
                    </div>
                    {!course?.isPayment_ScreenShot_Rejected && (
                        <div className=" py-12 flex justify-center items-center gap-12 ">
                            {AcceptLoading ? (
                                <div className=" small-loader mx-12"></div>
                            ) : (
                                <div
                                    className=" bg-green_v cursor-pointer py-2 px-4 rounded-xl text-white font-semibold "
                                    onClick={handle_Accept}
                                >
                                    Accept Payment{" "}
                                </div>
                            )}
                            {RejectLoading ? (
                                <div className=" small-loader mx-12"></div>
                            ) : (
                                <div
                                    className=" bg-red-500 cursor-pointer py-2 px-4 rounded-xl text-white font-semibold"
                                    onClick={handle_Reject}
                                >
                                    Reject Payment{" "}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
const errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Payment;
