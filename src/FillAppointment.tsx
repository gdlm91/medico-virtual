import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Row, Col, Button, Skeleton } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { Patient } from './types';
import useTabsPosition from './hooks/useTabPosition';
import useStory from './hooks/useStory';
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
import VitalSigns from './components/VitalSigns';
import './FillAppointment.css';

interface Props extends RouteComponentProps {
    storyKey?: string;
    appointmentKey?: string;
}

const FillAppointment: React.FC<Props> = ({ storyKey, appointmentKey }) => {
    const { response: storyResponse, api: storyApi } = useStory(storyKey as string);
    const tabPosition = useTabsPosition();

    const { TabPane } = Tabs;
    const loadingData = !storyResponse.data;

    const handlePatientUpdate = (patientInfo: Store) => {
        storyApi.updatePatientInfo(patientInfo as Patient);
    };

    return (
        <>
            <h1>
                <Skeleton loading={loadingData} paragraph={false} active={true}>
                    Consulta médica
                </Skeleton>
            </h1>

            <Tabs defaultActiveKey="1" tabPosition={tabPosition}>
                <TabPane tab="Datos personales" key={'1'} disabled={loadingData}>
                    <Skeleton loading={loadingData} active={true}>
                        {storyResponse.data && (
                            <PatientDetails data={storyResponse.data.patient} onValuesChange={handlePatientUpdate} />
                        )}
                    </Skeleton>
                </TabPane>
                <TabPane tab="Motivo de Consulta" key={'2'} disabled={loadingData}>
                    <ConsultationReason />
                </TabPane>
                <TabPane tab="Resultado de laboratorio y RX" key={'3'} disabled={loadingData}>
                    <LabResults />
                </TabPane>
                <TabPane tab="Revisión por sistema" key={'4'} disabled={loadingData}>
                    <SystemReview />
                </TabPane>
                <TabPane tab="Antecedentes personales" key={'5'} disabled={loadingData}>
                    <PersonalHistory />
                </TabPane>
                <TabPane tab="Antecedentes familiares" key={'6'} disabled={loadingData}>
                    <FamilyHistory />
                </TabPane>
                <TabPane tab="Signos vitales" key={'7'} disabled={loadingData}>
                    <VitalSigns />
                </TabPane>
                <TabPane tab="Exámen fisico" key={'8'} disabled={loadingData}>
                    <PhysicalExam />
                </TabPane>
                <TabPane tab="Diagnóstico" key={'9'} disabled={loadingData}>
                    <Diagnosis />
                </TabPane>
                <TabPane tab="Tratamiento" key={'10'} disabled={loadingData}>
                    <Treatment />
                </TabPane>
                <TabPane tab="Descargables" key={'11'} disabled={loadingData}>
                    <Downloadables />
                </TabPane>
            </Tabs>
            <Row justify="end">
                <Col>{loadingData ? <Skeleton.Button active /> : <Button>Siguiente</Button>}</Col>
            </Row>
        </>
    );
};

export default FillAppointment;
