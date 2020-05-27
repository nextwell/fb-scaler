import React from "react";
import settings from "./../containers/settings";

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
    message,
} from "antd";
import {
    LoadingOutlined,
    SmileOutlined,
    PlusOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import axios from "axios";

let url = settings.url;

console.log("SETTING URL: " + url);

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
            ad_account_id: null,
            confirmLoading: false,

            pixels: [],
        };
    }

    setModalVisible = (status) => {
        this.setState({
            visibleModal: status,
        });
    };

    handleCancel = (e) => {
        this.setState({
            visibleModal: false,
        });
    };
    userSelected(user_id) {
        let user;

        this.props.users.data.forEach((item) => {
            if (item._id == user_id) user = item;
        });

        if (user) {
            this.setState({
                user: user,
                isUserSelected: true,
            });
        }
    }
    async onFinish(formData) {
        console.log(formData);
        let campaign = formData;
        message.info(`Процесс создания кампании запущен`);

        this.setModalLoading(true);
        let res = await axios.get(
            `${url}/api/proxies/${this.state.user.proxy_id}/check`
        );
        if (res.data.success) {
            message.success(`Проверка прокси прошла успешно`);

            let create_campaign_document = await axios.post(
                `${url}/api/campaigns/new`,
                campaign
            );
            let data = create_campaign_document.data;
            if (data.success) {
                message.success(`Кампания (ID: ${data.id}) успешна создана`);
                campaign.campaign_id = data.id;
                axios.post(`${url}/api/adsets/create`, campaign);
                message.success(
                    `Загрузка адсетов и объявлений запущена, можно закрыть страницу`
                );

                this.setModalLoading(false);
                this.setModalVisible(false);
                this.resetForm();
            }
        } else if (res.data.err) {
            message.error(res.data.err);
        }
        this.setModalLoading(false);
    }

    setModalLoading = (loading) => {
        this.setState({ confirmLoading: loading });
    };
    resetForm = () => {
        this.setState({
            user: null,
            isUserSelected: false,
            isAdAccountSelected: false,
        });
        this.formRef.current.resetFields();
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
                        title="Давайте попробуем создать кампанию!"
                        extra={
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                Создать
                            </Button>
                        }
                    />

                    <Modal
                        title="Создание кампании"
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
                            initialValues={{ proxy_id: this.proxy_value() }}
                        >
                            <Form.Item
                                name={"user_id"}
                                label="Пользователь"
                                rules={[{ required: true }]}
                            >
                                {this.users_list()}
                            </Form.Item>
                            <Form.Item
                                name={"proxy_id"}
                                rules={[{ required: true }]}
                                label="Proxy"
                                style={
                                    this.state.isUserSelected == true
                                        ? {}
                                        : { display: "none" }
                                }
                            >
                                {this.proxy_list()}
                            </Form.Item>
                            <Form.Item
                                name={"ad_account_id"}
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

                            <Form.Item
                                name={"page"}
                                label="Page"
                                rules={[{ required: true }]}
                                style={
                                    this.state.isAdAccountSelected == true
                                        ? {}
                                        : { display: "none" }
                                }
                            >
                                {this.pages_list()}
                            </Form.Item>
                            <Form.Item
                                name={"template_campaign_id"}
                                label="Template Campaign"
                                rules={[{ required: true }]}
                                style={
                                    this.state.isAdAccountSelected == true
                                        ? {}
                                        : { display: "none" }
                                }
                            >
                                {this.templates_campaigns()}
                            </Form.Item>
                            <Form.Item
                                name={"pixel"}
                                label="Pixel"
                                rules={[{ required: true }]}
                                style={
                                    this.state.isAdAccountSelected == true
                                        ? {}
                                        : { display: "none" }
                                }
                            >
                                {this.pixels_list()}
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>

                {/* <MarkDown /> */}
            </Layout>
        );
    }
    proxy_value() {
        if (this.state.user) {
            this.formRef.current.setFieldsValue({
                proxy_id: this.state.user.proxy_id,
            });
            return this.state.user.proxy_id;
        }
    }
    proxy_list() {
        if (this.state.user) {
            return (
                <Select defaultValue={this.proxy_value()}>
                    {this.props.proxies.data.map((proxy, index) => (
                        <Option value={proxy._id}>
                            {proxy.name} ({proxy.ip}:{proxy.port})
                        </Option>
                    ))}
                </Select>
            );
        }
    }
    templates_campaigns() {
        console.log(this.props.tcampaigns);

        if (this.props.tcampaigns.isLoading == false) {
            if (this.props.tcampaigns.data.campaigns_settings) {
                return (
                    <Select>
                        {this.props.tcampaigns.data.campaigns_settings.map(
                            (campaign, index) => (
                                <Option value={campaign._id}>
                                    {campaign.name}
                                </Option>
                            )
                        )}
                    </Select>
                );
            }
        }
    }
    pages_list() {
        let user = this.state.user;
        let options = [];
        if (user) {
            user.bms.forEach((bm) => {
                for (let i = 0; i < bm.pages.length; i++) {
                    let page = bm.pages[i];
                    options.push(<Option value={page.id}>{page.name}</Option>);
                }
            });
            return <Select>{options}</Select>;
        }
    }
    pixels_list() {
        if (this.state.ad_account_id) {
            return (
                <Select>
                    {this.state.pixels.map((pixel, index) => (
                        <Option value={pixel.id}>
                            {pixel.name} (id: {pixel.id})
                        </Option>
                    ))}
                </Select>
            );
        }
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
            ad_account_id: value,
        });
        this.loadPixels(value);
    }
    async loadPixels(ad_account_id) {
        let res = await axios.get(
            `${url}/api/pixels/list/${this.state.user._id}/${ad_account_id}`
        );
        console.log(res);

        if (res.data) {
            this.setState({
                pixels: res.data.data,
            });
        }
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        proxies: state.proxies,
        tcampaigns: state.tcampaigns,
    };
}

export default connect(mapStateToProps)(createCampaign);
