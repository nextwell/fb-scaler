import React from "react";

import MarkDown from "./MarkDown.jsx";
import { Layout } from "antd";
const { Header, Content } = Layout;

export default class Home extends React.Component {
    render() {
        return (
            <Layout>
                {/* <Header style={{ background: "#fff", padding: 0 }}></Header> */}

                <Content
                    style={{
                        margin: "24px 16px 0",
                        height: "100%",
                        overflowY: "auto",
                    }}
                ></Content>
                {/* <MarkDown /> */}
            </Layout>
        );
    }
}
