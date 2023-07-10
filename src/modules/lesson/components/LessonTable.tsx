import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Lesson} from "../interfaces/lesson";
import {getLessonList} from "../requests/requests";

const LessonTable = () => {

    const [lessonList, setLessonList] = useState<Lesson[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getLessonList("")
            .then(res => {
                setLessonList(res.data);
            });
    }, []);

    const handleEdit = (lesson: Lesson) => {
        navigate(`/booking/createBooking`, {state: lesson.lessonName });
    };

    return (
        <>
            <div className="flex justify-between items-center p-3 ">
                <div />
                <div className="flex">
                    <button
                        onClick={() => {
                            navigate("/lesson/createLesson");
                        }}
                        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"}
                    >
                        Create Lesson
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
                {lessonList.map((lesson) => (
                    <div
                        key={lesson.lessonId}
                        className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <a href={`/${lesson.lessonId}`}>
                                <h2 className="text-lg font-bold hover:text-blue-500">{lesson.lessonName}</h2>
                            </a>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">Price: ${lesson.lessonPrice}</p>
                        <p className="text-gray-700 text-sm mb-2">Description: {lesson.lessonDescription}</p>
                        <p className="text-gray-700 text-sm mb-2">Start Time: {lesson.lessonStartTime}</p>
                        <p className="text-gray-700 text-sm mb-2">End Time: {lesson.lessonEndTime}</p>
                        <p className="text-gray-700 text-sm mb-2">Duration: {lesson.lessonDuration} minutes</p>
                        <p className="text-gray-700 text-sm mb-2">Created At: {lesson.createTs}</p>
                        <p className="text-gray-700 text-sm mb-4">Last Update At: {lesson.updateTs}</p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    handleEdit(lesson);
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all duration-300 ease-in-out"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export {LessonTable};