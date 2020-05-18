import React from "react";

import axios from "axios";

import { connect } from "react-redux";
import settings from "./../../containers/settings";
import { fetchTemplatesCampaigns } from "./../../actions/actionTemplateCampaign";

import { PlusOutlined, DownOutlined, UploadOutlined } from "@ant-design/icons";

import { store } from "./../../store/store.jsx";

import {
    Form,
    Input,
    Table,
    Badge,
    Menu,
    Modal,
    Button,
    Select,
    Popover,
    Alert,
    Upload,
    message,
} from "antd";

const { TextArea } = Input;

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

let url = settings.url;

const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

class CampaignsFunctions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adsets_edit_count: 0,
            ad_edit_count: 0,
            edit_campaign_count: 0,
            modal: false,
            loading: false,
            life_events: [],
            countries: [],
            campaign_data: {
                campaigns_settings: [
                    {
                        key: 1,
                        name: "campaign_1",
                        buying_type: "AUCTION",
                        objective: "CONVERSIONS",
                        status: "PAUSED",
                    },
                ],
                adsets: [
                    // {
                    //     key: 1,
                    //     name: "ad_set_1",
                    //     destination_type: "MESSENGER",
                    //     daily_budget: 100,
                    //     age_min: "18",
                    //     geo_locations: "US",
                    //     custom_event_type: "LEAD",
                    //     status: "ACTIVE",
                    //     window_days: 1,
                    //     ads: [
                    //         {
                    //             name: "ad_1",
                    //             key: 1,
                    //             adset_key: 1,
                    //         },
                    //     ],
                    // },
                ],
            },
            default: {
                campaign: {
                    campaigns_settings: [
                        {
                            key: 1,
                            name: "campaign_1",
                            buying_type: "AUCTION",
                            objective: "CONVERSIONS",
                            status: "PAUSED",
                        },
                    ],
                    adsets: [],
                },
                adset: {
                    name: "template adset",
                    destination_type: "MESSENGER",
                    daily_budget: 100,
                    age_min: "18",
                    geo_locations: "US",
                    custom_event_type: "LEAD",
                    status: "ACTIVE",
                    window_days: 1,
                    ads: [],
                },
                ad: {
                    name: "template ad",
                    action: "APPLY_NOW",
                },
            },
        };
    }
    adsets_data() {
        let cm = this.state.campaign_data;
        return cm.adsets;
    }

    ad_rows(key) {
        let adset = null;
        let adsets = this.state.campaign_data.adsets;
        for (let i = 0; i < adsets.length; i++) {
            if (adsets[i].key == key) {
                adset = adsets[i];
                break;
            }
        }
        if (adset) {
            let ads = adset.ads;
            return (
                <Table
                    dataSource={ads}
                    columns={this.columns_ads()}
                    pagination={false}
                    key={this.state.ad_edit_count}
                    size="small"
                />
            );
        }
    }

    adsets_row(key) {
        return (
            <Table
                dataSource={this.state.campaign_data.adsets}
                columns={this.columns_adset()}
                pagination={false}
                key={this.state.adsets_edit_count}
                expandable={{
                    expandedRowRender: (record) => [
                        this.ad_rows(record.key),
                        <Button
                            type="dashed"
                            className="yellow-color"
                            style={{ marginTop: "10px", width: "100%" }}
                            onClick={() => this.new_ad(record.key)}
                        >
                            Add new ad
                        </Button>,
                    ],
                    rowExpandable: (record) => record.key !== "Not Expandable",
                }}
                size="small"
            />
        );
    }
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
                        Добавить шаблон кампании
                    </Button>
                </Menu.Item>

                <Modal
                    title="Создание нового шаблона кампании"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modal}
                    confirmLoading={this.state.loading}
                    onCancel={() => this.setModalVisible(false)}
                    cancelText="Закрыть"
                    okText="Создать"
                    okButtonProps={{
                        onClick: this.onFinish,
                        form: "new-template-campaign",
                        key: "submit",
                        htmlType: "submit",
                    }}
                    className="new_campaigns-modal"
                    style={{ minWidth: "1400px" }}
                >
                    {this.main_table()}
                </Modal>
            </Menu>
        );
    }

    main_table() {
        let table = (
            <Table
                columns={this.columns_campaign()}
                expandable={{
                    expandedRowRender: (record) => [
                        this.adsets_row(record.key),
                        <Button
                            type="dashed"
                            className="blue-color"
                            style={{
                                marginTop: "10px",
                                width: "100%",
                            }}
                            onClick={() => this.new_adset()}
                        >
                            Add new adset
                        </Button>,
                    ],
                    rowExpandable: (record) => record.key !== "Not Expandable",
                }}
                pagination={false}
                dataSource={this.state.campaign_data.campaigns_settings}
                bordered
                key={this.state.edit_campaign_count}
            />
        );
        return table;
    }
    setModalVisible = (value) => {
        this.setState({ modal: value });
    };
    setModalLoading = (loading) => {
        this.setState({ loading: loading });
    };
    reset = () => {
        this.formRef.current.resetFields();
    };
    remove_adset(key) {
        console.log(`REMOVE ADSET (KEY:${key})`);
        let campaign_data = this.state.campaign_data;
        let index = null;
        for (let i = 0; i < campaign_data.adsets.length; i++) {
            let adset = campaign_data.adsets[i];
            if (adset.key == key) {
                index = i;
                break;
            }
        }
        if (index != null) {
            campaign_data.adsets.splice(index, 1);
        }

        this.setState({
            campaign_data: campaign_data,
            adsets_edit_count: this.state.adsets_edit_count + 1,
        });
    }
    copy_adset(adset_source) {
        console.log(`COPY ADSET (ID:${adset_source.key})`);
        let adset = Object.assign({}, adset_source);
        let adset_ads = adset.ads;
        const { campaign_data } = this.state;
        let adsets = campaign_data.adsets;
        let lastId;
        if (adsets.length) lastId = adsets[adsets.length - 1].key;
        else lastId = 0;

        adset.key = lastId + 1;
        adset.name += " (Copy)";

        adset.ads = [];
        for (let i = 0; i < adset_ads.length; i++) {
            let newobj_ad = Object.assign({}, adset_ads[i]);
            newobj_ad.adset_key = adset.key;
            adset.ads.push(newobj_ad);
        }
        campaign_data.adsets.push(adset);
        this.setState({
            campaign_data: campaign_data,
            adsets_edit_count: this.state.adsets_edit_count + 1,
        });
    }
    copy_ad(adset_key, ad) {
        ad = Object.assign({}, ad);
        console.log(`COPY AD (ID:${ad.key}, ADSET_ID: ${adset_key})`);

        let campaign_data = this.state.campaign_data;
        let adsets = campaign_data.adsets;

        for (let i = 0; i < adsets.length; i++) {
            if (adsets[i].key == adset_key) {
                let lastId;
                if (adsets[i].ads)
                    lastId = adsets[i].ads[adsets[i].ads.length - 1].key + 1;
                else lastId = 0;

                ad.name = ad.name + " (Copy)";
                ad.key = lastId;
                campaign_data.adsets[i].ads.push(ad);
                this.setState({
                    campaign_data: campaign_data,
                    ad_edit_count: this.state.ad_edit_count + 1,
                });
                break;
            }
        }
    }
    new_adset() {
        let t = JSON.stringify(this.state.default.adset);
        let new_adset = JSON.parse(t);
        let campaign = this.state.campaign_data;
        let adsets = campaign.adsets;
        let lastId;
        if (adsets.length) lastId = adsets[adsets.length - 1].key;
        else lastId = 0;

        new_adset.key = lastId + 1;
        campaign.adsets.push(new_adset);
        this.setState({
            campaign_data: campaign,
            adsets_edit_count: this.state.adsets_edit_count + 1,
        });
        console.log(this.state.campaign_data);
    }
    new_ad(adset_key) {
        let t = JSON.stringify(this.state.default.ad);
        let new_ad = JSON.parse(t);
        let campaign = this.state.campaign_data;
        let adsets = campaign.adsets;

        for (let i = 0; i < adsets.length; i++) {
            if (adsets[i].key === adset_key) {
                console.log(adsets[i]);
                let lastId;
                if (adsets[i].ads.length)
                    lastId = adsets[i].ads[adsets[i].ads.length - 1].key;
                else lastId = 0;

                new_ad.key = lastId + 1;
                new_ad.adset_key = adset_key;

                console.log(campaign.adsets[i]);
                campaign.adsets[i].ads.push(new_ad);
                this.setState({
                    campaign_data: campaign,
                    ad_edit_count: this.state.ad_edit_count + 1,
                });
                break;
            }
        }
    }
    remove_ad(adset_key, ad) {
        console.log(`COPY AD (ID:${ad.key}, ADSET_ID: ${adset_key})`);

        let campaign_data = this.state.campaign_data;
        let adsets = campaign_data.adsets;

        for (let i = 0; i < adsets.length; i++) {
            if (adsets[i].key == adset_key) {
                for (let y = 0; y < adsets[i].ads.length; y++) {
                    if (adsets[i].ads[y].key == ad.key) {
                        campaign_data.adsets[i].ads.splice(y, 1);
                        this.setState({
                            campaign_data: campaign_data,
                            ad_edit_count: this.state.ad_edit_count + 1,
                        });
                        break;
                    }
                }
            }
        }
    }
    columns_ads() {
        return [
            {
                title: <span className="yellow-color text-xs">Ad Name</span>,
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                    <span className="text-xs">{text}</span>
                ),
            },
            {
                title: <span className="yellow-color text-xs">Title</span>,
                dataIndex: "title",
                key: "title",
                render: (text, record) => (
                    <span className="text-xs">{text}</span>
                ),
            },
            {
                title: <span className="yellow-color text-xs">Text</span>,
                dataIndex: "text",
                key: "text",
                render: (text, record) => (
                    <span className="text-xs">{text}</span>
                ),
            },
            {
                title: (
                    <span className="yellow-color text-xs">Description</span>
                ),
                dataIndex: "description",
                key: "description",
                render: (text, record) => (
                    <span className="text-xs">{text}</span>
                ),
            },
            {
                title: (
                    <span className="yellow-color text-xs">Welcome Text</span>
                ),
                dataIndex: "welcome_text",
                key: "welcome_text",
                render: (text, record) => (
                    <span className="text-xs">{text}</span>
                ),
            },
            {
                title: <span className="yellow-color text-xs">Answer</span>,
                dataIndex: "answer",
                key: "answer",
                render: (text, record) => (
                    <span className="text-xs">{text}</span>
                ),
            },

            {
                title: <span className="yellow-color text-xs">Image</span>,
                dataIndex: "file_image",
                key: "file_image",
                render: (text, record) => {
                    if (record.file_image) {
                        if (record.file_image.fileList) {
                            if (record.file_image.fileList.length) {
                                return (
                                    <img
                                        style={{
                                            width: "75px",
                                            height: "75px",
                                        }}
                                        src={
                                            record.file_image.fileList[
                                                record.file_image.fileList
                                                    .length - 1
                                            ].thumbUrl
                                        }
                                    ></img>
                                );
                            }
                        }
                    } else return <span>-</span>;
                },
            },
            {
                title: <span className="yellow-color text-xs">Action</span>,
                dataIndex: "action",
                key: "action",
                render: (text, record) => (
                    <span className="text-xs">{text}</span>
                ),
            },
            {
                title: <span className="yellow-color text-xs">Функции</span>,
                dataIndex: "functions",
                key: "functions",

                render: (text, record) => [
                    <Button
                        type="link"
                        className="red-color text-xs"
                        onClick={() => this.remove_ad(record.adset_key, record)}
                        key="functions-delete"
                    >
                        Remove
                    </Button>,
                    <Button
                        type="link"
                        className="red-blue text-xs"
                        onClick={() => this.copy_ad(record.adset_key, record)}
                        key="functions-copy"
                    >
                        Copy
                    </Button>,
                    <Popover
                        content={this.edit_ad_content(record)}
                        title={`Edit ad settings (${record.name})`}
                        trigger="click"
                        style={{ width: "1000px" }}
                        overlayStyle={{
                            width: "400px",
                        }}
                    >
                        <Button type="primary">Edit</Button>
                    </Popover>,
                ],
            },
        ];
    }
    columns_adset() {
        return [
            {
                title: <span className="blue-color text-s">Adset Name</span>,
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                    <span className="text-s">{text}</span>
                ),
            },
            {
                title: (
                    <span className="blue-color text-s">Destination Type</span>
                ),
                dataIndex: "destination_type",
                key: "destination_type",
                render: (text, record) => (
                    <span className="text-s">{text}</span>
                ),
            },
            {
                title: <span className="blue-color text-s">Daily Budget</span>,
                dataIndex: "daily_budget",
                key: "daily_budget",
                render: (text, record) => (
                    <span className="text-s">{text}</span>
                ),
            },
            {
                title: <span className="blue-color text-s">Genders</span>,
                dataIndex: "genders",
                key: "genders",
                render: (text, record) => {
                    let gender;
                    if (text == "1") gender = "Male";
                    else if (text == "2") gender = "Female";
                    else gender = "-";
                    return <span className="text-xs">{gender}</span>;
                },
            },
            {
                title: <span className="blue-color text-s">Age Min</span>,
                dataIndex: "age_min",
                key: "age_min",
                render: (text, record) => {
                    if (!text) {
                        text = "-";
                    }
                    return <span className="text-xs">{text}</span>;
                },
            },
            {
                title: <span className="blue-color text-s">Age Max</span>,
                dataIndex: "age_max",
                key: "age_max",
                render: (text, record) => {
                    if (!text) {
                        text = "-";
                    }
                    return <span className="text-xs">{text}</span>;
                },
            },
            {
                title: <span className="blue-color text-s">Geo</span>,
                dataIndex: "geo_locations",
                key: "geo_locations",
                render: (text, record) => (
                    <span className="text-s">{text}</span>
                ),
            },
            {
                title: <span className="blue-color text-s">Life Events</span>,
                dataIndex: "life_events",
                key: "life_events",
                render: (text, record) => {
                    let events = this.state.life_events;
                    let eventText = "-";
                    for (let i = 0; i < events.length; i++) {
                        if (events[i].id == text) eventText = events[i].name;
                    }
                    return <span className="text-s">{eventText}</span>;
                },
            },
            {
                title: <span className="blue-color text-s">Status</span>,
                dataIndex: "status",
                key: "status",
                render: (text, record) => (
                    <span className="text-s">{text}</span>
                ),
            },
            {
                title: <span className="blue-color text-s">Window Days</span>,
                dataIndex: "window_days",
                key: "window_days",
                render: (text, record) => (
                    <span className="text-s">{text}</span>
                ),
            },
            {
                title: <span className="blue-color text-s">Functions</span>,
                dataIndex: "functions",
                key: "functions",

                render: (text, record) => [
                    <Button
                        type="link"
                        className="red-color text-s"
                        onClick={() => this.remove_adset(record.key)}
                        key="functions-delete"
                    >
                        Remove
                    </Button>,
                    <Button
                        type="link"
                        className="red-blue text-s"
                        onClick={() => this.copy_adset(record)}
                        key="functions-copy"
                    >
                        Copy
                    </Button>,
                    <Popover
                        content={this.edit_adset_content(record)}
                        title={`Edit adset settings (${record.name})`}
                        trigger="click"
                        style={{ width: "1000px" }}
                        overlayStyle={{
                            width: "400px",
                        }}
                    >
                        <Button type="primary">Edit</Button>
                    </Popover>,
                ],
            },
        ];
    }
    edit_adset = (record) => {
        let campaign = this.state.campaign_data;
        for (let i = 0; i < campaign.adsets.length; i++) {
            if (campaign.adsets[i].key == record.key) {
                campaign.adsets[i] = record;
                this.setState({
                    campaign_data: campaign,
                    adsets_edit_count: this.state.adsets_edit_count + 1,
                });
                break;
            }
        }
    };
    edit_adset_content = (record) => {
        const layout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
        };
        return [
            <Alert
                message="Раздел adsets"
                type="info"
                showIcon
                style={{ marginBottom: "20px" }}
            />,
            <Form
                {...layout}
                size="small"
                onFinish={this.edit_adset}
                initialValues={record}
            >
                <Form.Item name={"key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item name={"ads"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name={"name"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Destination Type"
                    name={"destination_type"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="MESSENGER">MESSENGER</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Daily Budget"
                    name={"daily_budget"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Genders" name={"genders"}>
                    <Select allowClear defaultValue="">
                        <Option value="">-</Option>
                        <Option value="1">Male</Option>
                        <Option value="2">Female</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Age Min" name={"age_min"}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Age Max" name={"age_max"}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Geo"
                    name={"geo_locations"}
                    rules={[{ required: true }]}
                >
                    <Select
                        showSearch
                        filterOption={(input, option) =>
                            option.children.indexOf(input) >= 0
                        }
                    >
                        {this.state.countries.map((country, index) => (
                            <Option value={country.key}>
                                {country.name} ({country.key})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Events"
                    name={"life_events"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        {this.state.life_events.map((event, index) => {
                            return (
                                <Option value={event.id}>{event.name}</Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name={"status"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="ACTIVE">ACTIVE</Option>
                        <Option value="PAUSED">PAUSED</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Window Days"
                    name={"window_days"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="1">1</Option>
                        <Option value="7">7</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Pixel Event"
                    name={"custom_event_type"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="LEAD">LEAD</Option>
                    </Select>
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>,
        ];
    };
    edit_campaign = (data) => {
        let c_data = this.state.campaign_data;
        for (let i = 0; i < c_data.campaigns_settings.length; i++) {
            if (c_data.campaigns_settings[i].key == data.key) {
                c_data.campaigns_settings[i] = data;
                this.setState({
                    campaign_data: c_data,
                    edit_campaign_count: this.state.edit_campaign_count + 1,
                });
                break;
            }
        }
    };
    edit_ad = (record) => {
        console.log(record);
        let campaign = this.state.campaign_data;
        for (let i = 0; i < campaign.adsets.length; i++) {
            if (campaign.adsets[i].key == record.adset_key) {
                for (let y = 0; y < campaign.adsets[i].ads.length; y++) {
                    if (campaign.adsets[i].ads[y].key == record.key) {
                        campaign.adsets[i].ads[y] = record;
                        this.setState({
                            campaign_data: campaign,
                            ad_edit_count: this.state.ad_edit_count + 1,
                        });
                        break;
                    }
                }
            }
        }
    };
    edit_ad_content(record) {
        const layout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
        };

        return [
            <Alert
                message="Данные объявления"
                type="info"
                showIcon
                style={{ marginBottom: "20px" }}
            />,
            <Form
                {...layout}
                size="small"
                onFinish={this.edit_ad}
                initialValues={record}
            >
                <Form.Item name={"key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item name={"adset_key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name={"name"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name={"title"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Text"
                    name={"text"}
                    rules={[{ required: true }]}
                >
                    <TextArea rows={4} style={{ fontSize: "10px" }} />
                </Form.Item>
                <Form.Item label="Description" name={"description"}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Welcome text"
                    name={"welcome_text"}
                    rules={[{ required: true }]}
                >
                    <TextArea rows={4} style={{ fontSize: "10px" }} />
                </Form.Item>
                <Form.Item
                    label="answer"
                    name={"answer"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Action"
                    name={"action"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="APPLY_NOW">APPLY_NOW</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="file_image" label="Image">
                    <Upload
                        name="file_image"
                        valuePropName="fileList"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                    >
                        <Button>
                            <UploadOutlined /> Загрузить
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item rules={[{ required: true }]}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>,
        ];
    }
    edit_campaign_content(record) {
        const layout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
        };
        return [
            <Alert
                message="Данные компании"
                type="info"
                showIcon
                style={{ marginBottom: "20px" }}
            />,
            <Form
                {...layout}
                size="small"
                onFinish={this.edit_campaign}
                initialValues={record}
            >
                <Form.Item name={"key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name={"name"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Buying Type"
                    name={"buying_type"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="AUCTION">AUCTION</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Objective"
                    name={"objective"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="CONVERSIONS">CONVERSIONS</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name={"status"}
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="PAUSED">PAUSED</Option>
                        <Option value="ACTIVE">ACTIVE</Option>
                    </Select>
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>,
        ];
    }
    columns_campaign() {
        return [
            { title: "Campaign Name", dataIndex: "name", key: "name" },
            {
                title: "Buying Type",
                dataIndex: "buying_type",
                key: "buying_type",
            },
            { title: "Objective", dataIndex: "objective", key: "objective" },
            { title: "Status", dataIndex: "status", key: "status" },
            {
                title: "Functions",
                dataIndex: "functions",
                key: "functions",
                render: (text, record) => {
                    return (
                        <Popover
                            content={this.edit_campaign_content(record)}
                            title={`Edit campaign settings (${record.name})`}
                            trigger="click"
                            overlayStyle={{
                                width: "400px",
                            }}
                        >
                            <Button type="primary">Edit</Button>
                        </Popover>
                    );
                },
            },
            // { title: "Date", dataIndex: "createdAt", key: "createdAt" },
            // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
        ];
    }
    onFinish = async () => {
        let new_campaign = this.state.campaign_data;
        console.log(new_campaign);
        this.setModalLoading(true);

        let res = await axios.post(
            `${url}/api/campaigns/template/new`,
            new_campaign
        );

        if (res.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
            message.success("Success creating template campaign");
            this.setModalLoading(false);
            this.setModalVisible(false);

            let str = JSON.stringify(this.state.default.campaign);
            let default_campaign = JSON.parse(str);
            this.setState({
                campaign_data: default_campaign,
                adsets_edit_count: 0,
                ad_edit_count: 0,
                edit_campaign_count: 0,
            });
        } else {
            message.error("Error creating template campaign");
        }
    };

    async load_countries() {
        let res = await axios.get(`${url}/api/fb/targeting/category/countries`);
        if (res.data) {
            this.setState({
                countries: res.data,
            });
        }
    }

    async load_life_events() {
        let res = await axios.get(
            `${url}/api/fb/targeting/category/life-events`
        );
        if (res.data) {
            this.setState({
                life_events: res.data,
            });
        }
    }

    componentDidMount() {
        this.load_life_events();
        this.load_countries();
        console.log("Loading data...");
    }
}

export default CampaignsFunctions;
