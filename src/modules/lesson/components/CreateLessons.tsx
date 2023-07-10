import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Lesson } from "../interfaces/lesson";
import { createLesson, getLessonList } from "../../lesson/requests/requests";

const CreateLessons = () => {
    const [data, setData] = useState<Partial<Lesson>>();
    const [lessonName, setLessonName] = useState<string[]>([])
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // save the data in a state
        setData({
            lessonName: "",
            lessonStartTime: "",
            lessonEndTime: "",
            lessonDescription: "",
            lessonPrice: 0.0
        });
        createLesson(data);
        navigate("/lesson", { state: { data }, replace: true });

        // refresh for new item
        window.location.reload();
    };

    useEffect(() => {
        getLessonList("")
            .then(response => {
                const newLessonNames = response.data.map((lesson) => (lesson.lessonName));
                setLessonName(newLessonNames);
            });
    }, []);

    return (
        <div className={"flex justify-center "}>
            <div className={"w-full max-w-screen-2xl "}>
                <form className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"} onSubmit={handleSubmit}>
                    <div className={"mb-4"}>
                        <label className={"block text-gray-500 text-sm font-bold mb-2"}>
                            Lesson Name
                        </label>
                        <input
                            className={"border rounded w-full "}
                            type="text"
                            placeholder="Lesson Name"
                            disabled={false}
                            value={data?.lessonName}
                            onChange={(event) => setData({ ...data, lessonName: event.target.value})}
                        />
                    </div>

                    <div className={"mb-4"}>

                        <label className={"block text-gray-500 text-sm font-bold mb-2"}>
                            Start Time
                        </label>
                        <input
                            className={"border rounded w-full "}
                            type="text"
                            placeholder="lessonStartTime"
                            value={data?.lessonStartTime || ""}
                            onChange={(event) => setData({ ...data, lessonStartTime: event.target.value })}
                        />
                    </div>

                    <div className={"mb-4"}>

                        <label className={"block text-gray-500 text-sm font-bold mb-2"}>
                            End Time
                        </label>
                        <input
                            className={"border rounded w-full "}
                            type="text"
                            placeholder="lessonEndTime"
                            value={data?.lessonEndTime || ""}
                            onChange={(event) => setData({ ...data, lessonEndTime: event.target.value })}
                        />
                    </div>

                    <div className={"mb-4"}>

                        <label className={"block text-gray-500 text-sm font-bold mb-2"}>
                            Description
                        </label>
                        <input
                            className={"border rounded w-full "}
                            type="text"
                            placeholder="Description"
                            value={data?.lessonDescription || ""}
                            onChange={(event) => setData({ ...data, lessonDescription: event.target.value })}
                        />
                    </div>

                    <div className={"mb-4"}>

                        <label className={"block text-gray-500 text-sm font-bold mb-2"}>
                            Price
                        </label>
                        <input
                            className={"border rounded w-full "}
                            type="text"
                            placeholder="Price"
                            value={data?.lessonPrice || ""}
                            onChange={(event) => setData({ ...data, lessonPrice: event.target.value })}
                        />
                    </div>

                    <div className={"flex justify-center"}>
                        <button
                            className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { CreateLessons };
