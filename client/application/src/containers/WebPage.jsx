import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./../components/Home.jsx";
import Settings from "./../components/Settings.jsx";
import Users from "./../components/Users.jsx";
import SideBar from "./../components/SideBar.jsx";

import { connect } from "react-redux";

import { Layout } from "antd";
const { Sider } = Layout;

class WebPage extends React.Component {
    test() {
        console.log(this.props.config);
    }
    render() {
        return (
            <Router>
                <Layout style={{ height: "100%" }}>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                        stype={{ position: "fixed" }}
                    >
                        <SideBar />
                    </Sider>
                    <Route exact path="/home" component={Home} />

                    <Route path="/users" component={Users} />
                    <Route path="/settings" component={Settings} />
                </Layout>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        config: state.config,
        files: state.files,
        user: state.user,
    };
}

export default connect(mapStateToProps)(WebPage);
