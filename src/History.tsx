import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Row, Col, Button, Input } from 'antd';
import PatientDetails from './components/PatientDetails';

const History: React.FC<RouteComponentProps> = () => {
    const { Search } = Input;
    const { TabPane } = Tabs;

    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Search
                        placeholder="Buscar paciente por nombre o documento"
                        onSearch={(value) => console.log(value)}
                        enterButton
                    />
                    <br />
                    <br />
                </Col>
                <Col span={4}>
                    <Button type="primary">Registrar nuevo paciente</Button>
                </Col>
                <Col span={2} offset={5}>
                    <Button>Descargar historia</Button>
                </Col>
                <Col span={2} offset={1}>
                    <Button>Crear consulta inmediata</Button>
                </Col>
            </Row>

            <Row className="titulo-name">
                <Col span={6}>
                    <h1>Nombre del Paciente</h1>
                </Col>
            </Row>
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane className="fill-appointment-tab-container" tab="Datos personales" key={'1'}>
                    <PatientDetails />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Historia de consultas" key={'2'}>
                    Por ahora nada!
                </TabPane>
            </Tabs>
        </>
    );
};

export default History;
