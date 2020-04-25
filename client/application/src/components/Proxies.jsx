import React from "react";
import { store } from "./../store/store.jsx";

import { fetchProxies } from "./../actions/actionProxy.jsx";

import axios from "axios";
import { connect } from "react-redux";
import ProxiesFunctions from "./ProxiesFunctions";
import { CloseCircleOutlined } from "@ant-design/icons";

import { Layout, Table, Tag, Popconfirm, Button } from "antd";
const { Header, Content } = Layout;

let url = "";

class Proxies extends React.Component {
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
                render: (text, record) => (
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
                    </Popconfirm>
                ),
            },
        ];
        return columns;
    }
    async handleDelete(record) {
        let res = await axios.get(`${url}/api/proxies/remove/${record._id}`);
        if (res.data.success) {
            store.dispatch(fetchProxies(`${url}/api/proxies/`));
        }
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
        proxies: state.proxy,
    };
}

export default connect(mapStateToProps)(Proxies);
