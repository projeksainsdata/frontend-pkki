import React from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/Banner";
import Keynote from "../components/Keynote";
import Timeline from "../components/Timeline";
import About from "../components/About";
import Topics from "../components/Topics";
import Pricelist from "../components/Pricelist";
import Venue from "../components/Venue";
import Countdown from "../components/Countdown";
import Trip from "../components/Trip";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Speaker from "../components/Speaker";
import JenisHaki from "../components/Timeline";

const Home = () => {
    return (
    <>
        <Navbar/>
        <Banner/>
        <About/>
        <JenisHaki/>
        <Trip/>
        <Contact/>
        <Footer/>
    </>
    )
}

export default Home
