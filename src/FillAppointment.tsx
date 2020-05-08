import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Row, Col, Button } from 'antd';
import PatientDetails from './components/PatientDetails';
import ConsultationReason from './components/ConsultationReason';
import LabResults from './components/LabResults';
import SystemReview from './components/SystemReview';
import PersonalHistory from './components/PersonalHistory';
import FamilyHistory from './components/FamilyHistory';
import PhysicalExam from './components/PhysicalExam';
import Diagnosis from './components/Diagnosis';
import Treatment from './components/Treatment';
import Downloadables from './components/Downloadables';
import './FillAppointment.css';

const FillAppointment: React.FC<RouteComponentProps> = () => {
    const { TabPane } = Tabs;

    return (
        <div>
            <Row className="titulo-name">
                <Col span={6}>
                    <h1>Nombre del Paciente</h1>
                </Col>
                <Col span={15}>
                    <h2>Consulta medica</h2>
                </Col>
            </Row>
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane className="fill-appointment-tab-container" tab="Datos personales" key={'1'}>
                    <PatientDetails />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Motivo de Consulta" key={'2'}>
                    <ConsultationReason />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Resultado de laboratorio y RX" key={'3'}>
                    <LabResults />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Revisión por sistema" key={'4'}>
                    <SystemReview />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Antecedentes personales" key={'5'}>
                    <PersonalHistory />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Antecedentes familiares" key={'6'}>
                    <FamilyHistory />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Signos vitales" key={'7'}>
                    Signos vitales
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Exámen fisico" key={'8'}>
                    <PhysicalExam />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Diagnóstico" key={'9'}>
                    <Diagnosis />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Tratamiento" key={'10'}>
                    <Treatment />
                </TabPane>
                <TabPane className="fill-appointment-tab-container" tab="Descargables" key={'11'}>
                    <Downloadables />
                </TabPane>
            </Tabs>
            <Row justify="end" className="button-next">
                <Button>Proximo</Button>
            </Row>
        </div>
    );
};

export default FillAppointment;
