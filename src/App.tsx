import React from 'react';
import { Router, Link, Location, WindowLocation } from '@reach/router';
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Layout, Menu } from 'antd';

import './App.css';
import History from './History';
import Agenda from './Agenda';
import DoctorProfile from './DoctorProfile';
import Appointment from './Appointment';
import Api from './Api';
import HistoryDetails from './HistoryDetails';

function App() {
    const { Header, Content, Footer } = Layout;

    const getSelectedKey = (location: WindowLocation) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, base] = location.pathname.split('/');

        const key = base === '' ? 'agenda' : base;

        return [key];
    };

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header>
                <Location>
                    {({ location }) => (
                        <Row>
                            <Col>
                                <div className="logo" />
                            </Col>
                            <Col>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    selectable={false}
                                    selectedKeys={getSelectedKey(location)}
                                >
                                    <Menu.Item key="agenda">
                                        <Link to="/">Agenda</Link>
                                    </Menu.Item>
                                    <Menu.Item key="stories">
                                        <Link to="/stories">Historia</Link>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col flex="auto"></Col>
                            <Col>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    selectable={false}
                                    selectedKeys={getSelectedKey(location)}
                                >
                                    <Menu.Item key="profile">
                                        <Link to="/profile">
                                            <Avatar icon={<UserOutlined />} />
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                        </Row>
                    )}
                </Location>
            </Header>
            <Content style={{ padding: '60px 50px 0' }}>
                <div className="site-layout-content" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <Router>
                        <Agenda path="/" />
                        <History path="/stories">
                            <HistoryDetails path=":storyKey" />
                        </History>
                        <Appointment path="/stories/:storyKey/appointments/:appointmentKey" />
                        <DoctorProfile path="/profile" />
                        <Api path="/api" />
                    </Router>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Médico Virtual - All rights reserved</Footer>
        </Layout>
    );
}

export default App;
