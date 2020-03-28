import "antd/dist/antd.css";
import "./layout.scss";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Layout, Empty } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const Nav = ({ history, location, children }) => {
    const handleMenuKey = ({ key }) => {
        history.push(key);
    };

    return (
        <Layout
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 0
            }}
        >
            <Sider
                breakpoint="sm"
                collapsedWidth="0"
                style={{
                    paddingTop: 60,
                    minHeight: "100vh"
                }}
            >
                <div className="logo">
                    <h1>{process.env.MIX_APP_NAME}</h1>
                </div>
                <Menu
                    mode={"inline"}
                    theme={"dark"}
                    onClick={handleMenuKey}
                    selectedKeys={`${location.pathname}-url`}
                >
                    <Menu.Item
                        key="/home"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="info-circle" theme="twoTone" />
                        Detail
                    </Menu.Item>
                    <Menu.Item
                        key="/comments"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="message" theme="twoTone" />
                        Comments
                    </Menu.Item>
                    <Menu.Item
                        key="/facilities"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="picture" theme="twoTone" />
                        Banquet Facility
                    </Menu.Item>
                    <Menu.Item
                        key="/appetizers"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="heart" theme="twoTone" />
                        Appetizers
                    </Menu.Item>
                    <Menu.Item
                        key="/wedding-packages"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="heart" theme="twoTone" />
                        Wedding Packages
                    </Menu.Item>
                    <Menu.Item
                        key="/promo-packages"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="heart" theme="twoTone" />
                        Promo Packages
                    </Menu.Item>
                    <Menu.Item
                        key="/party-trays"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="heart" theme="twoTone" />
                        Party Trays
                    </Menu.Item>
                    <Menu.Item
                        key="/events"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="calendar" theme="twoTone" />
                        Events
                    </Menu.Item>
                    <Menu.Item
                        key="/menu"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="calendar" theme="twoTone" />
                        Menus
                    </Menu.Item>
                    <Menu.Item
                        key="/gallery"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon type="calendar" theme="twoTone" />
                        Gallery
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: "#fff", padding: 0 }} />
                <Content
                    className="layout__content"
                    style={{ margin: "24px 16px 0" }}
                >
                    {location.pathname && children}
                    {!location.pathname && <Empty />}
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Solutions Through Cloud &copy;2019
                </Footer>
            </Layout>
        </Layout>
    );
};

export default withRouter(Nav);
