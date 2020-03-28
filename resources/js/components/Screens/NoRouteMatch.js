import React from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router-dom";

const NoRouteMatch = ({ history }) => {
    const redirectHome = () => {
        history.push("/");
    };

    const resultProps = {
        title: "500",
        subTitle: "Sorry, the server is wrong.",
        extra: (
            <Button type="primary" onClick={redirectHome}>
                Back Home
            </Button>
        )
    };

    return <Result status={500} {...resultProps} />;
};

export default withRouter(NoRouteMatch);
