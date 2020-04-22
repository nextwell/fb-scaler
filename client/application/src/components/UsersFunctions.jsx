import React from "react";

import { store } from "../store/store.jsx";

import { Menu, Icon, Modal, Button, Upload, message } from "antd";

import { UserAddOutlined } from "@ant-design/icons";

export default class AddUser extends React.Component {
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
                        icon={<UserAddOutlined />}
                        onClick={() => console.log("add")}
                    >
                        Добавить пользователя
                    </Button>
                </Menu.Item>
                {/* <Modal
                title="Загрузка файлов"
                wrapClassName="vertical-center-modal"
                visible={this.state.uploaderModal}
                onOk={() => this.setUploaderVisible(false)}
                onCancel={() => this.setUploaderVisible(false)}
                okText="Ок"
                cancelText="Закрыть"
              >
                  <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Кликните или перетащите файл для загрузки</p>
                      <p className="ant-upload-hint">Поддерживается как одиночная загрузка, так и множественная.</p>
                  </Dragger>
              </Modal> */}
            </Menu>
        );
    }
}
