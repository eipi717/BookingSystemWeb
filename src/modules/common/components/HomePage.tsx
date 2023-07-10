import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../auth/components/AuthContext";
import {getRecommendedLessons} from "../../booking/requests/requests";
import {useNavigate} from "react-router-dom";


const HomePage = () => {
    const {user} = useContext(AuthContext)

    const [recommendedLessons, setRecommendedLessons] = useState<string[]>(['Gym', 'Yoga Basics', 'Zumba'])

    const navigate = useNavigate();

    const onRegister = (lesson: string) => {
        navigate(`/booking/createBooking`, {state: lesson});
    }

    // useEffect(() => {
    //     getRecommendedLessons(user)
    //         .then(res => {
    //             setRecommendedLessons(res)
    //         })
    // }, [user])

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-white shadow-lg">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">
                            Welcome to Lesson Booking System
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                        <div
                            className="hero-section bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 px-6 rounded-lg shadow-xl">
                            <h1 className="text-4xl font-bold mb-6">
                                Book your next lesson today
                            </h1>
                            <p className="text-lg mb-10">
                                Find and book your perfect lesson with ease. Our lesson booking
                                system makes it simple to discover and reserve your favorite
                                classes.
                            </p>
                            <a
                                href="/lesson"
                                className="bg-white text-blue-500 py-3 px-8 rounded-full shadow-md hover:bg-blue-100 transition-colors duration-300 ease-in-out"
                            >
                                Book Now
                            </a>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-6 text-center">Recommended Lessons for You</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedLessons.map((lesson, index) => (
                                <div key={index} className="bg-white rounded-md shadow-md overflow-hidden">
                                    <img
                                        src={process.env.PUBLIC_URL + `/lessonImage/${lesson}.png`}
                                        alt={`${lesson}`}
                                        className="h-56 w-full object-cover"
                                    />
                                    <div className="p-4">
                                        <p className="text-lg font-medium text-gray-700 mb-2">{lesson}</p>
                                        <div className="flex justify-between items-center">
                                            <button
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded"
                                                onClick={() => onRegister(lesson)}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export {HomePage}