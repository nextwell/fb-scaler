import React from "react";

import {
    Layout,
    Menu,
    Modal,
    Button,
    Select,
    Form,
    Input,
    Spin,
    Row,
    Col,
    Result,
    Timeline,
    Alert,
} from "antd";
import { LoadingOutlined, SmileOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const { Header, Content } = Layout;

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const loader = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class createCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            loading: false,
            visibleModal: false,
            is_proxy_available: false,
            user: null,
            isUserSelected: false,
            isAdAccountSelected: false,
            confirmLoading: false,
        };
    }
    showModal = () => {
        this.setState({
            visibleModal: true,
        });
    };

    handleCancel = (e) => {
        this.setState({
            visibleModal: false,
        });
    };
    userSelected(user_id) {
        let user;

        console.log("PROPS");
        console.log(this.props);

        this.props.users.data.forEach((item) => {
            console.log(item._id + ": " + user_id);
            if (item._id == user_id) user = item;
        });

        if (user) {
            this.setState({
                user: user,
                isUserSelected: true,
            });
        }
    }
    proxy_block() {}
    onFinish(campaign) {
        console.log(this);
        this.setModalLoading(true);
        console.log(campaign);
    }

    setModalLoading = (loading) => {
        this.setState({ confirmLoading: loading });
    };
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
                    <Result
                        style={{ marginTop: "5%" }}
                        icon={<SmileOutlined />}
                        title="Давайте попробуем создать компанию!"
                        extra={
                            <Button type="primary" onClick={this.showModal}>
                                Создать
                            </Button>
                        }
                    />

                    <Modal
                        title="Создание компании"
                        visible={this.state.visibleModal}
                        onCancel={this.handleCancel}
                        okButtonProps={{
                            form: "new-campaign",
                            key: "submit",
                            htmlType: "submit",
                        }}
                        confirmLoading={this.state.confirmLoading}
                        cancelText="Закрыть"
                        okText="Создать"
                    >
                        <Form
                            name="new-campaign"
                            onFinish={(formData) => this.onFinish(formData)}
                            ref={this.formRef}
                            {...layout}
                        >
                            <Form.Item
                                name={["campaign", "user_id"]}
                                label="Пользователь"
                                rules={[{ required: true }]}
                            >
                                {this.users_list()}
                            </Form.Item>
                            <Form.Item
                                name={["campaign", "ad_account_id"]}
                                label="Рекламный аккаунт"
                                rules={[{ required: true }]}
                                style={
                                    this.state.isUserSelected == true
                                        ? {}
                                        : { display: "none" }
                                }
                            >
                                {this.ad_accounts_list()}
                            </Form.Item>

                            {this.compaign_sector()}
                        </Form>
                    </Modal>
                </Content>

                {/* <MarkDown /> */}
            </Layout>
        );
    }
    users_list() {
        let users = this.props.users.data;
        if (users) {
            if (users.length) {
                return (
                    <Select
                        showSearch
                        placeholder="Выберите пользователя"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.indexOf(input) >= 0
                        }
                        onChange={(value) => this.userSelected(value)}
                    >
                        {users.map((user) => {
                            return (
                                <Option value={user._id}>{user.name}</Option>
                            );
                        })}
                    </Select>
                );
            }
        }
    }
    ad_accounts_list() {
        if (this.state.user) {
            return (
                <Select
                    showSearch
                    placeholder="Выберите рекламный аккаунт"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.indexOf(input) >= 0
                    }
                    onChange={(value) => this.ad_account_Selected(value)}
                >
                    {this.state.user.bms.map((bm) => {
                        return bm.ad_accounts.map((ad_account) => {
                            return (
                                <Option value={ad_account.account_id}>
                                    {ad_account.name}
                                </Option>
                            );
                        });
                    })}
                </Select>
            );
        } else return <div></div>;
    }
    ad_account_Selected(value) {
        this.setState({
            isAdAccountSelected: true,
        });
    }
    compaign_sector() {
        if (this.state.isAdAccountSelected) {
            return [
                <Alert
                    message="Данные компании"
                    type="info"
                    showIcon
                    style={{ marginBottom: "20px" }}
                />,
                ,
                <Form.Item
                    label="Campaign Name"
                    name={["campaign", "campaign_name"]}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>,
                <Form.Item
                    label="Buying Type"
                    name={["campaign", "campaign_buying_type"]}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="AUCTION">AUCTION</Option>
                    </Select>
                </Form.Item>,
                <Form.Item
                    label="Objective"
                    name={["campaign", "campaign_objective"]}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="CONVERSIONS">CONVERSIONS</Option>
                    </Select>
                </Form.Item>,
                <Form.Item
                    label="Status"
                    name={["campaign", "campaign_status"]}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="PAUSED">PAUSED</Option>
                    </Select>
                </Form.Item>,
                <Form.Item
                    label="Special Ad Category"
                    name={["campaign", "campaign_special_ad_category"]}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="NONE" default>
                            NONE
                        </Option>
                    </Select>
                </Form.Item>,
            ];
        }
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        proxies: state.proxies,
    };
}

export default connect(mapStateToProps)(createCampaign);
