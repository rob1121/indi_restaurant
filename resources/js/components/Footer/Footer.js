import React from "react";
import "./Footer.style.scss";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Row, Col } from "antd";

const Footer = () => {
    const { info } = useContext(AppContext);

    return (
        <Row>
            <Col span={24}>
                <div className="footer">
                    <div className="copyright">
                        Copyright © 2020-2024 {info.name}. All Rights Reserved.
                    </div>
                </div>
            </Col>
        </Row>
    );
};
export default Footer;
