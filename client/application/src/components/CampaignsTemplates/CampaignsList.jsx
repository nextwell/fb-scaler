import React from "react";

import axios from "axios";

import { connect } from "react-redux";
import settings from "./../../containers/settings";

import { store } from "./../../store/store.jsx";

import { fetchTemplatesCampaigns } from "./../../actions/actionTemplateCampaign";

import {
    PlusOutlined,
    DownOutlined,
    UploadOutlined,
    LoadingOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

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
    Spin,
    Empty,
    Popconfirm,
} from "antd";

const loader = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { TextArea } = Input;

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

let url = settings.url;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

class CampaignsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false,
            life_events: [],
        };
    }

    ad_rows(key, campaign_key) {
        let adset = null;
        let adsets = this.props.tcampaigns.data.adsets;
        for (let i = 0; i < adsets.length; i++) {
            if (
                adsets[i].key == key &&
                adsets[i].campaign_key == campaign_key
            ) {
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
                    size="small"
                />
            );
        }
    }

    adsets_row(key) {
        let adsets = [];
        this.props.tcampaigns.data.adsets.forEach((item) => {
            if (item.campaign_key == key) adsets.push(item);
        });

        return (
            <Table
                dataSource={adsets}
                columns={this.columns_adset()}
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => {
                        return this.ad_rows(record.key, key);
                    },
                    rowExpandable: (record) => record.key !== "Not Expandable",
                }}
                size="small"
            />
        );
    }
    render() {
        return (
            <Spin
                spinning={this.props.tcampaigns.isLoading}
                size="large"
                indicator={loader}
                tip="Загрузка..."
                style={{ fontSize: "20px", marginTop: "25%" }}
                alignment="middle"
            >
                {this.main_table()}
            </Spin>
        );
    }

    main_table() {
        let container;
        if (this.props.tcampaigns) {
            if (this.props.tcampaigns.data) {
                container = (
                    <Table
                        columns={this.columns_campaign()}
                        expandable={{
                            expandedRowRender: (record) => [
                                this.adsets_row(record.key),
                            ],
                            rowExpandable: (record) =>
                                record.key !== "Not Expandable",
                        }}
                        pagination={false}
                        dataSource={
                            this.props.tcampaigns.data.campaigns_settings
                        }
                        bordered
                        style={{ padding: "25px" }}
                    />
                );
            }
        } else container = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        return container;
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
                        return (
                            <img
                                style={{
                                    width: "75px",
                                    height: "75px",
                                }}
                                src={
                                    "data:image/png;base64," +
                                    record.file_image.img
                                }
                            ></img>
                        );
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
                title: <span className="yellow-color text-xs">Functions</span>,
                dataIndex: "functions",
                key: "functions",

                render: (text, record) => [
                    <Popconfirm
                        title="Вы уверены?"
                        cancelText="Нет"
                        okText="Да"
                        icon={<CloseCircleOutlined style={{ color: "red" }} />}
                        onConfirm={() => this.remove_ad(record)}
                    >
                        <Button danger type="link">
                            Remove
                        </Button>
                    </Popconfirm>,
                    <Button
                        type="link"
                        className="red-blue text-s"
                        onClick={() => this.copy_ad(record)}
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
                render: (text, record) => {
                    return [
                        <Popconfirm
                            title="Вы уверены?"
                            cancelText="Нет"
                            okText="Да"
                            icon={
                                <CloseCircleOutlined style={{ color: "red" }} />
                            }
                            onConfirm={() => this.remove_adset(record)}
                        >
                            <Button danger type="link">
                                Remove
                            </Button>
                        </Popconfirm>,
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
                            title={`Edit adset (${record.name})`}
                            trigger="click"
                            overlayStyle={{
                                width: "400px",
                            }}
                        >
                            <Button type="primary">Edit</Button>
                        </Popover>,
                    ];
                },
            },
        ];
    }

    async copy_adset(data) {
        let doc = await axios.post(
            `${url}/api/campaigns/template/${data.campaign_id}/copy/adset`,
            { key: data.key }
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    async remove_adset(data) {
        let doc = await axios.post(
            `${url}/api/campaigns/template/${data.campaign_id}/remove/adset`,
            { key: data.key }
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    async copy_ad(data) {
        console.log(data);
        let doc = await axios.post(
            `${url}/api/campaigns/template/${data.campaign_id}/copy/ad`,
            { key: data.key, adset_key: data.adset_key }
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    async remove_ad(data) {
        let doc = await axios.post(
            `${url}/api/campaigns/template/${data.campaign_id}/remove/ad`,
            { key: data.key, adset_key: data.adset_key }
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    columns_campaign() {
        return [
            {
                title: "Campaign Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Buying Type",
                dataIndex: "buying_type",
                key: "buying_type",
            },
            { title: "Objective", dataIndex: "objective", key: "objective" },
            { title: "Status", dataIndex: "status", key: "status" },
            {
                title: <span className="blue-color text-s">Functions</span>,
                dataIndex: "functions",
                key: "functions",

                render: (text, record) => [
                    <Popconfirm
                        title="Вы уверены?"
                        cancelText="Нет"
                        okText="Да"
                        icon={<CloseCircleOutlined style={{ color: "red" }} />}
                        onConfirm={() => this.remove_campaign(record)}
                    >
                        <Button danger type="link">
                            Remove
                        </Button>
                    </Popconfirm>,
                    <Button
                        type="link"
                        className="red-blue text-s"
                        onClick={() => this.copy_campaign(record)}
                        key="functions-copy"
                    >
                        Copy
                    </Button>,
                    <Popover
                        content={this.edit_campaign_content(record)}
                        title={`Edit campaign settings (${record.name})`}
                        trigger="click"
                        overlayStyle={{
                            width: "400px",
                        }}
                    >
                        <Button type="primary">Edit</Button>
                    </Popover>,
                ],
            },
            // { title: "Date", dataIndex: "createdAt", key: "createdAt" },
            // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
        ];
    }

    async edit_campaign(data) {
        let doc = await axios.post(
            `${url}/api/campaigns/template/${data._id}/edit/campaign`,
            data
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    edit_campaign_content(record) {
        const layout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
        };
        return [
            <Alert
                message="Данные кампании"
                type="info"
                showIcon
                style={{ marginBottom: "20px" }}
            />,
            <Form
                {...layout}
                size="small"
                onFinish={(data) => {
                    this.edit_campaign(data);
                }}
                initialValues={record}
            >
                <Form.Item name={"key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item name={"_id"} hidden={true}>
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

    async edit_adset(data) {
        let doc = await axios.post(
            `${url}/api/campaigns/template/${data.campaign_id}/edit/adset`,
            data
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    edit_adset_content = (record) => {
        const layout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
        };
        return [
            <Alert
                message="Настройки Adset"
                type="info"
                showIcon
                style={{ marginBottom: "20px" }}
            />,
            <Form
                {...layout}
                size="small"
                onFinish={(data) => {
                    this.edit_adset(data);
                }}
                initialValues={record}
            >
                <Form.Item name={"key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item name={"campaign_id"} hidden={true}>
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
                        <Option>-</Option>
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

    async edit_ad(data) {
        if (!data.file_image.name) {
            data.file_image = data.file_image.file.response;
        }
        let doc = await axios.post(
            `${url}/api/campaigns/template/${data.campaign_id}/edit/ad`,
            data
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    edit_ad_content(record) {
        const layout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
        };

        return [
            <Alert
                message="Edit ad"
                type="info"
                showIcon
                style={{ marginBottom: "20px" }}
            />,
            <Form
                {...layout}
                size="small"
                onFinish={(data) => {
                    this.edit_ad(data);
                }}
                initialValues={record}
            >
                <Form.Item name={"key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item name={"adset_key"} hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item name={"campaign_id"} hidden={true}>
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
                        action={`${url}/api/fb/convert/image`}
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

    async remove_campaign(record) {
        let doc = await axios.get(
            `${url}/api/campaigns/template/${record._id}/remove`
        );

        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

    async copy_campaign(record) {
        let doc = await axios.get(
            `${url}/api/campaigns/template/${record._id}/copy`
        );
        if (doc.data.success) {
            store.dispatch(
                fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
            );
        }
    }

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

function mapStateToProps(state) {
    return {
        tcampaigns: state.tcampaigns,
    };
}

export default connect(mapStateToProps)(CampaignsList);
