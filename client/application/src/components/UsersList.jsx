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
    render() {
        return (
            <Row gutter={16} style={{ padding: "20px" }}>
                <Col className="gutter-row" span={6}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <UserOutlined
                                style={{ fontSize: "40px", paddingTop: "15px" }}
                            />
                        }
                        actions={[
                            <EditOutlined key="edit" />,
                            <DeleteOutlined key="detele" />,
                        ]}
                    >
                        <Meta
                            title="Ivan Logunov"
                            description="Status: Active"
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <UserOutlined
                                style={{ fontSize: "40px", paddingTop: "15px" }}
                            />
                        }
                        actions={[
                            <EditOutlined key="edit" />,
                            <DeleteOutlined key="detele" />,
                        ]}
                    >
                        <Meta
                            title="Ivan Logunov"
                            description="Status: Active"
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}
