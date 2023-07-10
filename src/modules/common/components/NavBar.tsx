import React, {useContext} from "react";
import {NavBarEnum} from "../enum/navBarEnum";
import {AuthContext} from "../../auth/components/AuthContext";

const NavBar = () => {
    const { user, setIsAuth } = useContext(AuthContext);

    const handleLogout = () => {
        setIsAuth(false)
        localStorage.setItem("token", "loggedOut")
        window.location.reload()
    }

    return (
        <>
            <nav className="bg-gray-800">
                <div className="sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a href="/" className="flex-shrink-0 flex items-center">
                            <img className="h-8 w-auto" src="/logo.svg" alt="Logo"/>
                        </a>
                        <div className="flex justify-start items-center">
                            <a href="/booking" className={`${NavBarEnum.navItemClass}`}>My Booking</a>
                            <a href="/lesson" className={`${NavBarEnum.navItemClass}`}>Lessons</a>
                            <a href="/payment" className={`${NavBarEnum.navItemClass}`}>Payment</a>
                        </div>
                        <div className="flex  items-center  ml-auto">
                            <span className={`${NavBarEnum.navItemClass}`}>{user}</span>
                            <button onClick={handleLogout} className={`${NavBarEnum.navItemClass}`}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export {NavBar}