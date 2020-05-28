import React from 'react';
import { Router, Link } from '@reach/router';
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Layout, Menu } from 'antd';

import './App.css';
import History from './History';
import Agenda from './Agenda';
import DoctorProfile from './DoctorProfile';
import FillAppointment from './FillAppointment';
import Api from './Api';
import HistoryDetails from './HistoryDetails';

interface MenuItemProps {
    to: string;
}

function App() {
    const { Header, Content, Footer } = Layout;

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header>
                <Row>
                    <Col>
                        <div className="logo" />
                    </Col>
                    <Col>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key="/">
                                <Link to="/">Agenda</Link>
                            </Menu.Item>
                            <Menu.Item key="/stories">
                                <Link to="/stories">Historia</Link>
                            </Menu.Item>
                            <Menu.Item key="/users">
                                <Link to="/users">Usuarios</Link>
                            </Menu.Item>
                            <Menu.Item key="/reports">
                                <Link to="/reports">Reportes</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col flex="auto"></Col>
                    <Col>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key="/profile">
                                <Link to="/profile">
                                    <Avatar icon={<UserOutlined />} />
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '60px 50px 0' }}>
                <div className="site-layout-content">
                    <Router>
                        <Agenda path="/" />
                        <History path="/stories">
                            <HistoryDetails path=":storyKey" />
                        </History>
                        <DoctorProfile path="/profile" />
                        <FillAppointment path="/appointment/:key" />
                        <Api path="/api" />
                    </Router>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default App;
