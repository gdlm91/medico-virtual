import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Row, Col, Button, Skeleton } from 'antd';

import { Patient, AppointmentForm } from './types';
import useTabsPosition from './hooks/useTabPosition';
import useStory from './hooks/useStory';
import useAppointment from './hooks/useAppointment';
import useAppointmentForm from './hooks/useAppointmentForm';

import PatientDetails from './components/PatientDetails';
import AppointmentReason from './components/AppointmentReason';
import LabResults from './components/LabResults';
import SystemReview from './components/SystemReview';
import PersonalHistory from './components/PersonalHistory';
import FamilyHistory from './components/FamilyHistory';
import PhysicalExam from './components/PhysicalExam';
import Diagnosis from './components/Diagnosis';
import Treatment from './components/Treatment';
import Downloadables from './components/Downloadables';
import VitalSigns from './components/VitalSigns';

interface Props extends RouteComponentProps {
    storyKey?: string;
    appointmentKey?: string;
}

const FillAppointment: React.FC<Props> = ({ storyKey = '', appointmentKey = '' }) => {
    const { response: storyResponse, api: storyApi } = useStory(storyKey);
    const { response: appointmentResponse } = useAppointment(storyKey, appointmentKey);
    const { response: appointmentFormResponse, api: appointmentFormApi } = useAppointmentForm(storyKey, appointmentKey);
    const [activeTab, setActiveTab] = useState(0);
    const tabPosition = useTabsPosition();
    const loadingData = !storyResponse.data && !appointmentResponse.data && !appointmentFormResponse.data;

    const handlePatientUpdate = (patientInfo: Patient) => {
        storyApi.updatePatientInfo(patientInfo);
    };

    const handleOnAppointmentUpdate = (appointmentForm: AppointmentForm, step: keyof AppointmentForm) => {
        appointmentFormApi.updateForm(appointmentForm, step);
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
            component: (
                <AppointmentReason
                    data={appointmentFormResponse.data?.reason}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Resultado de laboratorio y RX',
            component: (
                <LabResults data={appointmentFormResponse.data?.results} onValuesChange={handleOnAppointmentUpdate} />
            ),
        },
        {
            title: 'Revisión por sistema',
            component: (
                <SystemReview
                    data={appointmentFormResponse.data?.systemReview}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Antecedentes personales',
            component: (
                <PersonalHistory
                    data={appointmentFormResponse.data?.personalHistory}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Antecedentes familiares',
            component: (
                <FamilyHistory
                    data={appointmentFormResponse.data?.familyHistory}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Signos vitales',
            component: (
                <VitalSigns
                    data={appointmentFormResponse.data?.vitalSigns}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Exámen fisico',
            component: (
                <PhysicalExam
                    data={appointmentFormResponse.data?.physicalExam}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
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

    const isNextEnabled = Number(activeTab) !== renderedComponentsInForm.length - 1;

    const handleTabClick = (key: string) => {
        setActiveTab(Number(key));
    };

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
                    <Tabs.TabPane tab={title} key={String(index)} disabled={loadingData}>
                        {component}
                    </Tabs.TabPane>
                ))}
            </Tabs>
            <Row justify="end">
                <Col>
                    {loadingData ? (
                        <Skeleton.Button active />
                    ) : (
                        isNextEnabled && (
                            <Button onClick={handleNextTabClick} style={{ marginTop: '15px' }}>
                                Siguiente
                            </Button>
                        )
                    )}
                </Col>
            </Row>
        </>
    );
};

export default FillAppointment;
