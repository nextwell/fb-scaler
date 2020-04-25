import React from "react";

import { store } from "../store/store.jsx";

import { Menu, Modal, Button, Select } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { Form, Input } from "antd";
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export default class AddUser extends React.Component {
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
    onFinish = (values) => {
        this.setModalLoading(true);

        // push form data to server

        setTimeout(() => {
            this.setModalLoading(false);
            this.setModalVisible(false);
            this.reset();
        }, 2000);

        console.log(values);
    };
    reset = () => {
        this.formRef.current.resetFields();
    };
    render() {
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
                            name={["user", "user-agent"]}
                            label="UserAgent"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["user", "access-token"]}
                            label="AccessToken"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["user", "proxy"]}
                            label="proxy"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                <Option value="1">Proxy 1 | RU</Option>
                                <Option value="2">Proxy 3 | UK</Option>
                                <Option value="3">Proxy 4 | US</Option>
                                <Option value="4">Proxy 5 | FR</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Menu>
        );
    }
}
