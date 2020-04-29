import settings from "./../containers/settings";

import React from "react";
import { store } from "./../store/store.jsx";

import { fetchProxies } from "./../actions/actionProxy.jsx";

import axios from "axios";
import { connect } from "react-redux";
import ProxiesFunctions from "./ProxiesFunctions";
import { CloseCircleOutlined } from "@ant-design/icons";

import { Layout, Table, Tag, Popconfirm, Button, message } from "antd";
const { Header, Content } = Layout;

let url = settings.url;

let msg = (type, text) => {
    switch (type) {
        case "success": {
            message.success(text);
            break;
        }
        case "error": {
            message.error(text);
            break;
        }
        case "warning": {
            message.warning(text);
            break;
        }
    }
};

class Proxies extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checkLoaders: {} };
    }
    dataSource() {
        return this.props.proxies.data;
    }
    columns() {
        let columns = [
            {
                title: "Название",
                dataIndex: "name",
                key: "name",

                sorter: (a, b) => a.name.length == b.name.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Регион",
                dataIndex: "region",
                key: "region",
                sorter: (a, b) => a.region.length == b.region.length,
                sortDirections: ["descend", "ascend"],
                render: (region) => (
                    <span>
                        <Tag color="green" key={region}>
                            {region}
                        </Tag>
                    </span>
                ),
            },
            {
                title: "IP",
                dataIndex: "ip",
                key: "ip",
            },
            {
                title: "Port",
                key: "port",
                dataIndex: "port",
            },
            {
                title: "Функции",
                key: "action",
                render: (text, record) => [
                    <Popconfirm
                        title="Вы уверены?"
                        cancelText="Нет"
                        okText="Да"
                        icon={<CloseCircleOutlined style={{ color: "red" }} />}
                        onConfirm={() => this.handleDelete(record)}
                    >
                        <Button type="link" danger>
                            Удалить
                        </Button>
                    </Popconfirm>,
                    <Button
                        loading={this.state.checkLoaders[record._id]}
                        type="link"
                        onClick={() => {
                            this.handleCheck(record);
                        }}
                    >
                        Проверить
                    </Button>,
                ],
            },
        ];
        return columns;
    }
    setCheck_Loader(index, value) {
        let checkLoaders = this.state.checkLoaders;
        checkLoaders[index] = value;
        this.setState({
            loadings: checkLoaders,
        });
    }
    async handleDelete(record) {
        let res = await axios.get(`${url}/api/proxies/remove/${record._id}`);
        if (res.data.success) {
            store.dispatch(fetchProxies(`${url}/api/proxies/`));
        }
    }
    async handleCheck(record) {
        this.setCheck_Loader(record._id, true);
        console.log(record);
        let checkStatus = await axios.get(
            `${url}/api/proxies/${record._id}/check`
        );
        checkStatus = checkStatus.data;
        if (checkStatus.success) {
            msg(
                "success",
                `Проверка прокси (${checkStatus.proxy.name}) прошла успешно`
            );
        } else if (checkStatus.err) {
            msg("error", checkStatus.err);
        }
        this.setCheck_Loader(record._id, false);
    }
    render() {
        return (
            <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                    <ProxiesFunctions />
                </Header>
                <Content
                    style={{
                        background: "#fff",
                        margin: "16px 12px 0",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    <Table
                        dataSource={this.dataSource()}
                        columns={this.columns()}
                    />
                </Content>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        proxies: state.proxies,
    };
}

export default connect(mapStateToProps)(Proxies);
