import React, { useState } from "react";
import { Menu, Icon, Carousel, Affix, Layout, Row, Col } from "antd";
import "./nav.scss";
import Book from "../Book/Book";

const { Header } = Layout;
const { SubMenu } = Menu;

const Nav = () => {
    const [current, setCurrent] = useState("mail");

    const handleClick = e => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    return (
        <>
            <Carousel>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
            <Affix>
                <Header>
                    <Row type="flex" justify="center">
                        <Col span={20}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={["2"]}
                                style={{
                                    lineHeight: "64px",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                                <Menu.Item key="4">
                                    <Book />
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
            </Affix>
        </>
    );
};

export default Nav;
