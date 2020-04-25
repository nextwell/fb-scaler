import React from "react";

import MarkDown from "./MarkDown.jsx";
import { Layout } from "antd";
const { Header, Content } = Layout;

export default class Settings extends React.Component {
    render() {
        return (
            <Layout>
                {/* <Header style={{ background: "#fff", padding: 0 }}></Header> */}

                <Content
                    style={{
                        background: "#fff",
                        margin: "16px 12px 0",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    В разработке
                </Content>
                {/* <MarkDown /> */}
            </Layout>
        );
    }
}
