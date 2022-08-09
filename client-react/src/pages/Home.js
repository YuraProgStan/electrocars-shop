import React from 'react';
import Navbar from "../components/Navbar";
import Models from "../components/Models";
import Footer from "../components/Footer";
import {RequireAuth} from "../hoc/RequireAuth";

const Home = () => {
    return (
        <>
           <Navbar/>
            <Models/>
            <Footer/>
        </>


    );
};

export default Home;