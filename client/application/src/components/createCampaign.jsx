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
            life_events: [],
            pixels: [],
        };
    }

    async load_life_events(user_id) {
        let res = await axios.get(
            `${url}/api/fb/targeting/category/life-events/${user_id}`
        );
        if (res.data) {
            this.setState({
                life_events: res.data.data,
            });
        }
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
            this.load_life_events(user_id);
        }
    }
    async onFinish(formData) {
        let campaign = formData.campaign;

        console.log(formData);
        this.setModalLoading(true);
        let res = await axios.get(
            `${url}/api/proxies/${this.state.user.proxy_id}/check`
        );
        if (res.data.success) {
            message.success(`Проверка прокси прошла успешно`);
            campaign.proxy_id = this.state.user.proxy_id;
            let create_campaign_document = await axios.post(
                `${url}/api/campaigns/new`,
                campaign
            );
            let data = create_campaign_document.data;
            if (data.success) {
                message.success(`Компания (ID: ${data.id}) успешна создана`);
                console.log({
                    user_id: this.state.user._id,
                    proxy_id: this.state.user.proxy_id,
                    adsets: formData.adsets,
                    campaign: {
                        id: data.id,
                        pixel_id: campaign.campaign_pixel_id,
                        custom_event_type: campaign.custom_event_type,
                    },
                });
                let createAdSets_document = await axios.post(
                    `${url}/api/adsets/create`,
                    {
                        user_id: this.state.user._id,
                        proxy_id: this.state.user.proxy_id,
                        adsets: formData.adsets,
                        campaign: {
                            id: data.id,
                            ad_account_id: campaign.ad_account_id,
                            pixel_id: campaign.campaign_pixel_id,
                            custom_event_type:
                                campaign.campaign_custom_event_type,
                        },
                    }
                );

                if (createAdSets_document.data.success) {
                    message.success(
                        `Успешно создано ${createAdSets_document.data.success_adsets} адсетов`
                    );
                    this.setModalLoading(false);
                    this.setModalVisible(false);
                    this.resetForm();
                } else {
                    message.error("Произошла ошибка при создании адсетов");
                }
            } else if (data.err) {
                message.error(data.err);
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
                        title="Давайте попробуем создать компанию!"
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
                            {this.adsets_sector()}
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
            ad_account_id: value,
        });
        this.loadPixels(value);
    }
    async loadPixels(ad_account_id) {
        let res = await axios.get(
            `${url}/api/pixels/list/${this.state.user._id}/${ad_account_id}`
        );

        if (res.data) {
            this.setState({
                pixels: res.data.data,
            });
        }
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
                <Form.Item
                    label="Pixel"
                    name={["campaign", "campaign_pixel_id"]}
                    rules={[{ required: true }]}
                >
                    <Select>
                        {this.state.pixels.map((pixel, index) => (
                            <Option value={pixel.id}>
                                {pixel.name} (id: {pixel.id})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>,
                <Form.Item
                    label="Pixel Event Type"
                    name={["campaign", "campaign_custom_event_type"]}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="LEAD">LEAD</Option>
                    </Select>
                </Form.Item>,
            ];
        }
    }
    adsets_sector() {
        if (this.state.isAdAccountSelected) {
            return [
                <Alert
                    message="Раздел adsets"
                    type="info"
                    showIcon
                    style={{ marginBottom: "20px" }}
                />,
                <Form.List name="adsets" style={{ width: "100%" }}>
                    {(fields, { add, remove }) => {
                        /**
                         * `fields` internal fill with `name`, `key`, `fieldKey` props.
                         * You can extends this into sub field to support multiple dynamic fields.
                         */
                        return (
                            <div>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{
                                        width: "100%",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <PlusOutlined /> Добавить adset
                                </Button>
                                {fields.map((field, index) => (
                                    <div
                                        style={{
                                            padding: "20px 20px 0 20px",
                                            border: "1px solid #91d5ff",
                                            marginTop: "10px",
                                        }}
                                        className="asset-block"
                                    >
                                        <Form.Item
                                            label="Name"
                                            name={[field.name, "name"]}
                                            rules={[{ required: true }]}
                                            fieldKey={[field.fieldKey, "name"]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Destination Type"
                                            name={[
                                                field.name,
                                                "destination_type",
                                            ]}
                                            rules={[{ required: true }]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "destination_type",
                                            ]}
                                        >
                                            <Select>
                                                <Option value="MESSENGER">
                                                    MESSENGER
                                                </Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Daily Budget"
                                            name={[field.name, "daily_budget"]}
                                            rules={[{ required: true }]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "daily_budget",
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Geo Locations"
                                            name={[field.name, "geo_locations"]}
                                            rules={[{ required: true }]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "geo_locations",
                                            ]}
                                        >
                                            <Select>
                                                <Option value="US">US</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Life Events"
                                            name={[field.name, "life_events"]}
                                            rules={[{ required: true }]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "life_events",
                                            ]}
                                        >
                                            <Select>
                                                {this.state.life_events.map(
                                                    (event, index) => (
                                                        <Option
                                                            value={event.id}
                                                        >
                                                            {event.name}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Status"
                                            name={[field.name, "status"]}
                                            rules={[{ required: true }]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "status",
                                            ]}
                                        >
                                            <Select>
                                                <Option value="PAUSED">
                                                    PAUSED
                                                </Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Окно конверсии"
                                            name={[field.name, "window_days"]}
                                            rules={[{ required: true }]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "window_days",
                                            ]}
                                        >
                                            <Select>
                                                <Option value="1">
                                                    1 день после клика
                                                </Option>
                                                <Option value="7">
                                                    7 дней после клика
                                                </Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "20px" }}
                                        >
                                            <Button
                                                style={{
                                                    fontSize: "10px",
                                                }}
                                                type="link"
                                                danger
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            >
                                                Удалить
                                            </Button>
                                        </Form.Item>
                                    </div>
                                ))}
                            </div>
                        );
                    }}
                </Form.List>,
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
