import settings from "./../containers/settings";

import React from "react";

import { store } from "../store/store.jsx";

import { fetchUsers } from "./../actions/actionUser.jsx";

import axios from "axios";

import { connect } from "react-redux";

import { Menu, Modal, Button, Select } from "antd";

import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

import { Form, Input } from "antd";
const { Option } = Select;

let url = settings.url;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, loading: false };
        this.formRef = React.createRef();
    }
    setModalVisible = (modal) => {
        this.setState({ modal: modal });
    };
    setModalLoading = (loading) => {
        this.setState({ loading: loading });
    };
    onFinish = async (values) => {
        this.setModalLoading(true);
        let result = await axios.post(`${url}/api/users/new`, values.user);
        store.dispatch(fetchUsers(`${url}/api/users/`));

        this.setModalLoading(false);
        this.setModalVisible(false);
        this.reset();
    };
    reset = () => {
        this.formRef.current.resetFields();
    };
    render() {
        let proxies = this.props.proxies.data;
        console.log(proxies);
        return (
            <Menu
                theme="light"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
                selectable={false}
            >
                <Menu.Item key="1">
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => this.setModalVisible(true)}
                    >
                        Добавить пользователя
                    </Button>
                </Menu.Item>
                <Menu.Item key="2" danger>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => console.log("Update")}
                    >
                        Обновить все данные
                    </Button>
                </Menu.Item>
                <Modal
                    title="Создание нового пользователя"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modal}
                    confirmLoading={this.state.loading}
                    onCancel={() => this.setModalVisible(false)}
                    cancelText="Закрыть"
                    okText="Создать"
                    okButtonProps={{
                        form: "new-user",
                        key: "submit",
                        htmlType: "submit",
                    }}
                >
                    <Form
                        {...layout}
                        name="new-user"
                        onFinish={this.onFinish}
                        ref={this.formRef}
                    >
                        <Form.Item
                            name={["user", "name"]}
                            label="Имя"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["user", "user_agent"]}
                            label="UserAgent"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["user", "access_token"]}
                            label="AccessToken"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["user", "proxy_id"]}
                            label="Proxy"
                            rules={[{ required: true }]}
                        >
                            <Select
                                showSearch
                                placeholder="Выберите прокси"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.indexOf(input) >= 0
                                }
                            >
                                {proxies.map((proxy) => {
                                    console.log(1);
                                    return (
                                        <Option value={proxy._id}>
                                            <span style={{ color: "green" }}>
                                                {proxy.region}
                                            </span>{" "}
                                            / {proxy.name} / {proxy.ip}:
                                            {proxy.port} ({proxy.region})
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
        proxies: state.proxies,
    };
}

export default connect(mapStateToProps)(AddUser);
