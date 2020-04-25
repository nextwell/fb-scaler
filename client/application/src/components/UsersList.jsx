import React from "react";

import { Card, Avatar, Row, Col } from "antd";
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    UserOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export default class AddUser extends React.Component {
    createUsers = () => {
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < 60; i++) {
            table.push(
                <Col
                    className="gutter-row"
                    span={4}
                    xxl={4}
                    xl={6}
                    lg={6}
                    md={6}
                    sm={8}
                    xs={12}
                >
                    <Card
                        hoverable
                        style={{
                            marginBottom: "10px",
                            padding: "10px",
                        }}
                        cover={
                            <UserOutlined
                                style={{ fontSize: "40px", paddingTop: "15px" }}
                            />
                        }
                    >
                        <Meta
                            title="Ivan Logunov"
                            description="Description about account"
                        />
                    </Card>
                </Col>
            );
        }
        return table;
    };
    render() {
        return (
            <Row gutter={12} style={{ padding: "20px" }}>
                {this.createUsers()}
            </Row>
        );
    }
}
