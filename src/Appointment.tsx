import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Row, Col, Button, Skeleton, Form, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { Patient, AppointmentForm, AppointmentStatusEnum } from './types';
import useTabsPosition from './hooks/useTabPosition';
import useStory from './hooks/useStory';
import useAppointment from './hooks/useAppointment';
import useAppointmentForm from './hooks/useAppointmentForm';
import useRealtimeForm from './hooks/useRealtimeForm';

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

const Appointment: React.FC<Props> = ({ storyKey = '', appointmentKey = '' }) => {
    const { response: storyResponse, api: storyApi } = useStory(storyKey);
    const { response: appointmentResponse, api: appointmentApi } = useAppointment(storyKey, appointmentKey);
    const { response: appointmentFormResponse, api: appointmentFormApi } = useAppointmentForm(storyKey, appointmentKey);
    const handleUpdateNote = useCallback(
        (noteForm: Store) => {
            if (appointmentResponse.data?.status === AppointmentStatusEnum.closed) {
                const note: string = noteForm['note'];
                appointmentApi.updateNote(note);
            }
        },
        [appointmentResponse],
    );
    const { formRef: noteFormRef, handleOnValuesChange: handleNoteValuesChange } = useRealtimeForm(
        appointmentResponse.data?.note,
        handleUpdateNote,
    );
    const [activeTab, setActiveTab] = useState(0);
    const tabPosition = useTabsPosition();
    const loadingData = !storyResponse.data && !appointmentResponse.data && !appointmentFormResponse.data;
    const readOnly = appointmentResponse.data?.status !== AppointmentStatusEnum.open;

    const handlePatientUpdate = (patientInfo: Patient) => {
        storyApi.updatePatientInfo(patientInfo);
    };

    const handleOnAppointmentUpdate = (appointmentForm: AppointmentForm) => {
        appointmentFormApi.updateForm(appointmentForm);
    };

    const handleCloseAppointment = () => {
        if (appointmentResponse.data?.status !== AppointmentStatusEnum.closed) {
            const diagnosis = appointmentFormResponse.data?.diagnosis?.principal.diagnosis || '';
            appointmentApi.closeAppointment(diagnosis);
        }
    };

    const renderedComponentsInForm = [
        {
            title: 'Datos personales',
            component: (
                <Skeleton loading={loadingData} active={true}>
                    {storyResponse.data && (
                        <PatientDetails
                            disabled={readOnly}
                            data={storyResponse.data.patient}
                            onValuesChange={handlePatientUpdate}
                        />
                    )}
                </Skeleton>
            ),
        },
        {
            title: 'Motivo de consulta',
            component: (
                <AppointmentReason
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.reason}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Resultado de laboratorio y RX',
            component: (
                <LabResults
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.results}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Revisión por sistema',
            component: (
                <SystemReview
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.systemReview}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Antecedentes personales',
            component: (
                <PersonalHistory
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.personalHistory}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Antecedentes familiares',
            component: (
                <FamilyHistory
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.familyHistory}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Signos vitales',
            component: (
                <VitalSigns
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.vitalSigns}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Exámen fisico',
            component: (
                <PhysicalExam
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.physicalExam}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Diagnóstico',
            component: (
                <Diagnosis
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.diagnosis}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
        },
        {
            title: 'Tratamiento',
            component: (
                <Treatment
                    disabled={readOnly}
                    data={appointmentFormResponse.data?.treatment}
                    onValuesChange={handleOnAppointmentUpdate}
                />
            ),
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

    useEffect(() => {
        if (appointmentResponse.data?.status === AppointmentStatusEnum.waiting) {
            appointmentApi.changeStatus(AppointmentStatusEnum.open);
        }

        if (appointmentResponse.data?.status === AppointmentStatusEnum.closed) {
            noteFormRef.setFieldsValue({
                note: appointmentResponse.data.note,
            });
        }
    }, [appointmentResponse]);

    return (
        <>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>
                        <Skeleton loading={loadingData} paragraph={false} active={true}>
                            Consulta médica
                        </Skeleton>
                    </h1>
                </Col>
                <Col>
                    {loadingData ? (
                        <Skeleton.Button active />
                    ) : (
                        !readOnly && (
                            <Button type="primary" onClick={handleCloseAppointment}>
                                Cerrar consulta
                            </Button>
                        )
                    )}
                </Col>
            </Row>

            {!loadingData && readOnly && (
                <Row>
                    <Col flex="auto">
                        <Form form={noteFormRef} layout="vertical" onValuesChange={handleNoteValuesChange}>
                            <Form.Item label="Nota aclaratoria" name="note">
                                <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            )}

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

export default Appointment;
