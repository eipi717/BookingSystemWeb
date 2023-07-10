import React from 'react';
import {Outlet} from "react-router-dom";
import {NavBar} from "./modules/common/components/NavBar";
import {Footer} from "./modules/common/components/Footer";

function App() {

    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer />
        </>
    );

}

export default App;
