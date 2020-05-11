import React from 'react';
import { Router, Link } from '@reach/router';
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Layout, Menu } from 'antd';
import './App.css';
import History from './History';
import Agenda from './Agenda';
import DoctorProfile from './DoctorProfile';
import FillAppointment from './FillAppointment';

function App() {
    const { Header, Content, Footer } = Layout;

    return (
        <Layout className="layout">
            <Header>
                <Row>
                    <Col>
                        <div className="logo" />
                    </Col>
                    <Col>
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item key="agenda">
                                <Link to="/">Agenda</Link>
                            </Menu.Item>
                            <Menu.Item key="historia">
                                <Link to="/history">Historia</Link>
                            </Menu.Item>
                            <Menu.Item key="usuarios">Usuarios</Menu.Item>
                            <Menu.Item key="reportes">Reportes</Menu.Item>
                        </Menu>
                    </Col>
                    <Col flex="auto"></Col>
                    <Col>
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item>
                                <Link to="/doctorProfile">
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
                        <History path="/history" />
                        <DoctorProfile path="/doctorProfile" />
                        <FillAppointment path="/appointment/:key" />
                    </Router>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default App;
