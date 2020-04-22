import React from "react";

import { Menu, Button } from "antd";

import {
    LogoutOutlined,
    UserOutlined,
    SettingOutlined,
    HomeOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

export default class SideBar extends React.Component {
    render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                style={{ height: "100%" }}
                defaultSelectedKeys={["1"]}
            >
                <Menu.Item key="1">
                    <Link to="/home">
                        <HomeOutlined />
                        Главная
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/users">
                        <UserOutlined />
                        Пользователи
                    </Link>
                </Menu.Item>

                <Menu.Item key="3">
                    <Link to="/settings">
                        <SettingOutlined />
                        Настройки
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link href="/logout">
                        <LogoutOutlined />
                        Выйти
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}
