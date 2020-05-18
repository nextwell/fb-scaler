import React from "react";

import axios from "axios";

import { connect } from "react-redux";
import settings from "./../../containers/settings";

import {
    PlusOutlined,
    DownOutlined,
    UploadOutlined,
    LoadingOutlined,
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
    console.log("Upload event:", e);
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
        console.log(key);
        //return <span>1</span>;
        let adset = null;
        let adsets = this.props.tcampaigns.data.adsets;
        for (let i = 0; i < adsets.length; i++) {
            if (adsets[i].key == key && adsets[i].campaign_key == campaign_key) {
                adset = adsets[i];
                break;
            }
        }
        if (adset) {
            let ads = adset.ads;
            console.log(ads);
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
        ];
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
            // { title: "Date", dataIndex: "createdAt", key: "createdAt" },
            // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
        ];
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
