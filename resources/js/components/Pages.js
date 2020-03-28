import "antd/dist/antd.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { spring, AnimatedSwitch } from "react-router-transition";
import Welcome from "./Pages/Welcome";
import Nav from "./Layout/Nav";
import NoRouteMatch from "./Screens/NoRouteMatch";
import Footer from "./Footer";
import SubFooter from "./SubFooter";
import { BackTop } from "antd";
import AppContext from "../context/AppContext";
import { useState } from "react";
import { getInfo } from "./Screens/Info/api/info";
const mapStyles = styles => {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`
    };
};

const bounce = val => {
    return spring(val, {
        stiffness: 330,
        damping: 22
    });
};

const bounceTransition = {
    atEnter: {
        opacity: 0,
        scale: 1.2
    },
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8)
    },
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
        spring
    }
};

const Pages = () => {
    const [info, setInfo] = useState({});
    useEffect(() => {
        getInfo().then(({ data }) => setInfo(data));
    }, []);

    return (
        <AppContext.Provider value={{ info }}>
            <BackTop />
            <Nav />
            <Router>
                <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                    className="route-wrapper"
                >
                    <Route path="/" component={Welcome} exact />
                    <Route component={NoRouteMatch} exact />
                </AnimatedSwitch>
            </Router>
            <SubFooter />
            <Footer />
        </AppContext.Provider>
    );
};

export default Pages;

if (document.getElementById("pages")) {
    ReactDOM.render(<Pages />, document.getElementById("pages"));
}
