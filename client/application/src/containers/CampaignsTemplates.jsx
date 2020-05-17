import React from "react";

import { connect } from "react-redux";
import CampaignsFunctions from "./../components/CampaignsTemplates/CampaignsFunctions";

import { Layout } from "antd";
const { Header, Content } = Layout;

class CampaignsTemplates extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout>
                <Header style={{ background: "#fff", padding: "0" }}>
                    <CampaignsFunctions />
                </Header>

                <Content
                    style={{
                        background: "#fff",
                        margin: "16px 12px 0",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    templates list
                </Content>
                {/* <MarkDown /> */}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        files: state.files,
        user: state.user,
    };
}

export default connect(mapStateToProps)(CampaignsTemplates);
