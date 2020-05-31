import React, { useState } from 'react';
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
    const [activeTab, setActiveTab] = useState(0);
    const tabPosition = useTabsPosition();

    const { TabPane } = Tabs;
    const loadingData = !storyResponse.data;

    const handlePatientUpdate = (patientInfo: Store) => {
        storyApi.updatePatientInfo(patientInfo as Patient);
    };

    const renderedComponentsInForm = [
        {
            title: 'Datos personales',
            component: (
                <Skeleton loading={loadingData} active={true}>
                    {storyResponse.data && (
                        <PatientDetails data={storyResponse.data.patient} onValuesChange={handlePatientUpdate} />
                    )}
                </Skeleton>
            ),
        },
        {
            title: 'Motivo de consulta',
            component: <ConsultationReason />,
        },
        {
            title: 'Resultado de laboratorio y RX',
            component: <LabResults />,
        },
        {
            title: 'Revisión por sistema',
            component: <SystemReview />,
        },
        {
            title: 'Antecedentes personales',
            component: <PersonalHistory />,
        },
        {
            title: 'Antecedentes familiares',
            component: <FamilyHistory />,
        },
        {
            title: 'Signos vitales',
            component: <VitalSigns />,
        },
        {
            title: 'Exámen fisico',
            component: <PhysicalExam />,
        },
        {
            title: 'Diagnóstico',
            component: <Diagnosis />,
        },
        {
            title: 'Tratamiento',
            component: <Treatment />,
        },
        {
            title: 'Descargables',
            component: <Downloadables />,
        },
    ];

    const handleTabClick = (key: string) => {
        setActiveTab(Number(key));
    };

    const isNextEnabled = Number(activeTab) !== renderedComponentsInForm.length - 1;

    const handleNextTabClick = () => {
        const nextTab = (activeTab + 1) % renderedComponentsInForm.length;
        setActiveTab(nextTab);
    };

    return (
        <>
            <h1>
                <Skeleton loading={loadingData} paragraph={false} active={true}>
                    Consulta médica
                </Skeleton>
            </h1>

            <Tabs tabPosition={tabPosition} activeKey={String(activeTab)} onTabClick={handleTabClick}>
                {renderedComponentsInForm.map(({ title, component }, index) => (
                    <TabPane tab={title} key={String(index)} disabled={loadingData}>
                        {component}
                    </TabPane>
                ))}
            </Tabs>
            <Row justify="end">
                <Col>
                    {loadingData ? (
                        <Skeleton.Button active />
                    ) : (
                        isNextEnabled && <Button onClick={handleNextTabClick}>Siguiente</Button>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default FillAppointment;
