import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Spin, Button, Popconfirm, message } from "antd";
import {
    LoadingOutlined,
    CloseCircleOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import { store } from "./../store/store.jsx";

import { fetchUsers } from "./../actions/actionUser.jsx";

import axios from "axios";

import settings from "./../containers/settings";
let url = settings.url;

const loader = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateLoaders: {} };
    }
    async handleDelete(user) {
        let res = await axios.get(`${url}/api/users/remove/${user._id}`);
        if (res.data.success) {
            store.dispatch(fetchUsers(`${url}/api/users/`));
        }
    }
    async handleUpdate(user) {
        this.setUpdate_Loaders(user._id, true);
        let res = await axios.get(`${url}/api/users/${user._id}/update`);
        console.log(res.data);
        if (res.data.success) {
            store.dispatch(fetchUsers(`${url}/api/users/`));
            message.success(
                `Обновление пользователя (${user.name}) прошло успешно`
            );
        } else if (res.data.err) message.error(res.data.err);
        console.log("Update user");
        this.setUpdate_Loaders(user._id, false);
    }
    setUpdate_Loaders(index, value) {
        let updateLoaders = this.state.updateLoaders;
        updateLoaders[index] = value;
        this.setState({
            updateLoaders: updateLoaders,
        });
    }
    usersList = () => {
        console.log(this.props);
        let table = [];

        // Outer loop to create parent
        let users = this.props.users.data;
        if (users.length) {
            users.forEach((user) => {
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
                            title={user.name}
                            extra={<a href="#">Открыть</a>}
                            style={{ width: 300 }}
                            actions={[
                                <Popconfirm
                                    title="Вы уверены?"
                                    cancelText="Нет"
                                    okText="Да"
                                    icon={
                                        <CloseCircleOutlined
                                            style={{ color: "red" }}
                                        />
                                    }
                                    onConfirm={() => this.handleDelete(user)}
                                >
                                    <Button danger type="link">
                                        Удалить
                                    </Button>
                                </Popconfirm>,
                                <Popconfirm
                                    title="Вы уверены?"
                                    cancelText="Нет"
                                    okText="Да"
                                    icon={<ReloadOutlined />}
                                    onConfirm={() => this.handleUpdate(user)}
                                >
                                    <Button
                                        type="link"
                                        className="link-success"
                                        loading={
                                            this.state.updateLoaders[user._id]
                                        }
                                    >
                                        Обновить
                                    </Button>
                                </Popconfirm>,
                            ]}
                        >
                            <div>
                                <p>Business Managers:</p>
                                <ul>
                                    {user.bms.map((bm) => {
                                        return (
                                            <li>
                                                {bm.name}
                                                {bm.ad_accounts.length > 0 && (
                                                    <div>
                                                        <small
                                                            style={{
                                                                marginLeft:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Ad Accounts:
                                                        </small>
                                                        <ul>
                                                            {bm.ad_accounts.map(
                                                                (
                                                                    ad_account
                                                                ) => {
                                                                    return (
                                                                        <li>
                                                                            <small>
                                                                                {
                                                                                    ad_account.name
                                                                                }{" "}
                                                                                (
                                                                                {
                                                                                    ad_account.account_status_text
                                                                                }

                                                                                )
                                                                            </small>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                                {bm.pages.length > 0 && (
                                                    <div>
                                                        <small
                                                            style={{
                                                                marginLeft:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Pages:
                                                        </small>
                                                        <ul>
                                                            {bm.pages.map(
                                                                (page) => {
                                                                    return (
                                                                        <li>
                                                                            <small>
                                                                                {
                                                                                    page.name
                                                                                }
                                                                            </small>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </Card>
                    </Col>
                );
            });
        }
        return table;
    };
    render() {
        console.log(this.props);
        return (
            <Spin
                spinning={this.props.users.isLoading}
                size="large"
                indicator={loader}
                tip="Загрузка..."
                style={{ fontSize: "20px", marginTop: "25%" }}
                alignment="middle"
            >
                <Row gutter={12} style={{ padding: "20px" }}>
                    {this.usersList()}
                </Row>
            </Spin>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
    };
}

export default connect(mapStateToProps)(UsersList);
