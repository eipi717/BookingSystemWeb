import React, { CSSProperties } from "react";
import {BeatLoader} from "react-spinners";

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <BeatLoader
                color="#1841d3"
            />
        </div>
    )
}

export { Spinner }