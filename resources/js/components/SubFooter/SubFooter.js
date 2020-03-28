import React, { useContext } from "react";
import "./SubFooter.style.scss";
import { Row, Col } from "antd";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import capitalize from "lodash/capitalize";
import Inquiry from "./components/Inquiry";
import AppContext from "../../context/AppContext";

const SubFooter = () => {
    const { info } = useContext(AppContext);

    return (
        <Row type="flex" justify="center">
            <Col span={20}>
                <div className="sub-footer">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <Row type="flex" justify="start">
                                <Inquiry />
                            </Row>
                        </Col>
                        <Col xs={24} md={6}>
                            <Row type="flex" justify="start">
                                <Col span={24}>
                                    <h3>Contact Us</h3>
                                </Col>

                                <Col span={24}>{info.address}</Col>

                                {!isEmpty(info.contacts) && (
                                    <Col span={24}>
                                        <strong>Call Us At:</strong>
                                    </Col>
                                )}
                                {map(info.contacts, (contact, key) => (
                                    <Col span={24} key={key}>
                                        <strong>
                                            {capitalize(contact.type)}:{" "}
                                        </strong>
                                        {contact.contact}
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col xs={24} md={6}>
                            <Row type="flex" justify="center">
                                <Col span={24}>
                                    <h3>Quick Links</h3>
                                </Col>
                                <Col span={24}>Home</Col>
                                <Col span={24}>Menu</Col>
                                <Col span={24}>Gallery</Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={6}>
                            <Row type="flex" justify="center">
                                <Col span={24}>
                                    <h3>Hours of operation</h3>
                                </Col>
                                <Col span={24}>
                                    <strong>7 DAYS OPEN</strong>
                                    <br />
                                    Monday, Wednesday, Thursday and Sunday
                                    <br />
                                    Lunch 11:30am – 3pm
                                    <br />
                                    Dinner 5pm-10pm
                                    <br />
                                    Tuesday – Closed
                                    <br />
                                    <strong>Friday & Saturday</strong>
                                    <br />
                                    Lunch 11:30am – 3 PM
                                    <br />
                                    Dinner 5pm – 11pm
                                    <br />
                                    <strong>DAILY LUNCH BUFFET</strong>
                                    <br />
                                    Monday to Friday
                                    <br />
                                    Saturday Ala Carte only
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default SubFooter;
