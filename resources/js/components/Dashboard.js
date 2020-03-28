import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { spring, AnimatedSwitch } from "react-router-transition";
import Info from "./Screens/Info";
import Comments from "./Screens/Comments";
import BanquetFacility from "./Screens/BanquetFacility";
import NoRouteMatch from "./Screens/NoRouteMatch";
import Layout from "./Layout";
import "./dashboard.scss";
import Appetizers from "./Screens/Appetizers";
import WeddingPackages from "./Screens/WeddingPackages";
import PromoPackages from "./Screens/PromoPackages";
import PartyTrays from "./Screens/PartyTrays";
import Events from "./Screens/Events";
import Menu from "./Screens/Menu";
import Gallery from "./Screens/Gallery";

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

const Dashboard = () => {
    return (
        <>
            <Router>
                <Layout onClick={({ key }) => setSelectedContent(key)}>
                    <AnimatedSwitch
                        atEnter={bounceTransition.atEnter}
                        atLeave={bounceTransition.atLeave}
                        atActive={bounceTransition.atActive}
                        mapStyles={mapStyles}
                        className="route-wrapper"
                    >
                        <Route path="/home" component={Info} exact />
                        <Route path="/comments" component={Comments} exact />
                        <Route
                            path="/facilities"
                            component={BanquetFacility}
                            exact
                        />
                        <Route
                            path="/appetizers"
                            component={Appetizers}
                            exact
                        />
                        <Route
                            path="/wedding-packages"
                            component={WeddingPackages}
                            exact
                        />
                        <Route
                            path="/promo-packages"
                            component={PromoPackages}
                            exact
                        />
                        <Route
                            path="/party-trays"
                            component={PartyTrays}
                            exact
                        />
                        <Route path="/gallery" component={Gallery} exact />
                        <Route path="/menu" component={Menu} exact />
                        <Route path="/events" component={Events} exact />
                        <Route component={NoRouteMatch} exact />
                    </AnimatedSwitch>
                </Layout>
            </Router>
        </>
    );
};

export default Dashboard;

if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
