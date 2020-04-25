import React from "react";

import UsersFunctions from "./UsersFunctions.jsx";
import UsersList from "./UsersList.jsx";

import MarkDown from "./MarkDown.jsx";
import { Layout } from "antd";
const { Header, Content } = Layout;

export default class Users extends React.Component {
    render() {
        return (
            <Layout>
                <Header style={{ background: "#fff", padding: "0" }}>
                    <UsersFunctions />
                </Header>

                <Content
                    style={{
                        background: "#fff",
                        margin: "16px 12px 0",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    <UsersList />
                </Content>
                {/* <MarkDown /> */}
            </Layout>
        );
    }
}
