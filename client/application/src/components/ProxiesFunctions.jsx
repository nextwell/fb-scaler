import settings from "./../containers/settings";

import React from "react";

import { fetchProxies } from "./../actions/actionProxy.jsx";

import { store } from "./../store/store.jsx";

import axios from "axios";

import { Menu, Modal, Button, Select } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { Form, Input } from "antd";
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

let url = settings.url;

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
    onFinish = async (values) => {
        this.setModalLoading(true);
        let result = await axios.post(`${url}/api/proxies/new`, values.proxy);
        store.dispatch(fetchProxies(`${url}/api/proxies/`));

        this.setModalLoading(false);
        this.setModalVisible(false);
        this.reset();
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
                        Добавить прокси
                    </Button>
                </Menu.Item>
                <Modal
                    title="Добавление прокси"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modal}
                    confirmLoading={this.state.loading}
                    onCancel={() => this.setModalVisible(false)}
                    cancelText="Закрыть"
                    okText="Создать"
                    okButtonProps={{
                        form: "new-proxy",
                        key: "submit",
                        htmlType: "submit",
                    }}
                >
                    <Form
                        {...layout}
                        name="new-proxy"
                        onFinish={this.onFinish}
                        ref={this.formRef}
                    >
                        <Form.Item
                            name={["proxy", "name"]}
                            label="Название"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["proxy", "region"]}
                            label="Регион"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="US" />
                        </Form.Item>
                        <Form.Item
                            name={["proxy", "ip"]}
                            label="IP"
                            rules={[{ required: true }]}
                            help="* only http proxies"
                        >
                            <Input placeholder="127.0.0.1" />
                        </Form.Item>

                        <Form.Item
                            name={["proxy", "port"]}
                            label="PORT"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="3128" />
                        </Form.Item>
                    </Form>
                </Modal>
            </Menu>
        );
    }
}
