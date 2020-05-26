import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Form, Select, Row, Button, DatePicker } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Moment } from 'moment';

import { FieldList, Error, FieldForm, ApiContext } from './components/ApiHelpsers';
import { Patient, AppointmentStatusEnum } from './types';

import useStoryList from './hooks/useStoryList';
import useStory from './hooks/useStory';
import useAppointmentList from './hooks/useAppointmentList';
import useAppointment from './hooks/useAppointment';

const StoryListApi = () => {
    const { response } = useStoryList();
    const { setStoryKey } = useContext(ApiContext);

    return (
        <>
            <h3>Listar historias</h3>
            {!response.data ? (
                'loading'
            ) : (
                <Form.Item label="Seleccionar una historia">
                    <Select onSelect={(key) => setStoryKey(key as string)}>
                        {response.data.map((story) => (
                            <Select.Option value={story.$key} key={story.$key}>
                                {story.patient.id}: {story.patient.name}
                            </Select.Option>
                        ))}
                    </Select>
                    {response.error && <Error description={response.error.message} />}
                </Form.Item>
            )}
        </>
    );
};

const StoryApi = ({ $key }: { $key: string }) => {
    const { response, api } = useStory($key);
    const [form] = Form.useForm();
    const keys = [
        'birthday',
        'phone',
        'gender',
        'maritalStatus',
        'address',
        'job',
        'bloodType',
        'name',
        'country',
        'email',
        'id',
    ];

    useEffect(() => {
        if (response.data?.patient) {
            form.setFieldsValue({ ...response.data.patient });
        }
    }, [response, form]);

    const handleUpdatePatientInfo = (values: Store) => {
        if (response.data?.patient) {
            const updateData = { ...response.data.patient, ...values } as Patient;
            api.updatePatientInfo(updateData);
        }
    };

    return (
        <>
            <h3>Ver historia</h3>
            {!response.data ? (
                'loading'
            ) : (
                <>
                    <pre>{JSON.stringify(response.data, null, 4)}</pre>
                    {response.error && <Error description={response.error.message} />}
                </>
            )}

            <h3>Actualizar datos del paciente</h3>
            {!response.data ? (
                'loading...'
            ) : (
                <FieldForm onFinish={handleUpdatePatientInfo} layout="vertical" form={form}>
                    <FieldList keys={keys} loading={response.loading} />
                </FieldForm>
            )}
        </>
    );
};

const AppointmentListApi = () => {
    const { response } = useAppointmentList();
    const { setAppointmentKey } = useContext(ApiContext);

    return (
        <>
            {!response.data ? (
                'loading'
            ) : (
                <Form.Item label="Seleccionar una consulta">
                    <Select onSelect={(key) => setAppointmentKey(key as string)}>
                        {response.data.map((appointment) => (
                            <Select.Option value={appointment.$key} key={appointment.$key}>
                                {appointment.date} - {appointment.time}
                            </Select.Option>
                        ))}
                    </Select>
                    {response.error && <Error description={response.error.message} />}
                </Form.Item>
            )}
        </>
    );
};

const AppointmentApi = ({ $storyKey, $key }: { $storyKey: string; $key: string }) => {
    const { response, api } = useAppointment($storyKey, $key);

    const handleChangeStatus = (values: Store) => {
        api.changeStatus(values.status as AppointmentStatusEnum);
    };

    const handleRescheduled = (values: Store) => {
        const dateAndTime = values.dateAndTime as Moment;
        const [date, time] = [dateAndTime.format('DD-MM-YYYY'), dateAndTime.format('HH:mm')];
        api.rescheduled(date, time);
    };

    return (
        <>
            <h3>Ver consulta</h3>
            {!response.data ? (
                'loading'
            ) : (
                <>
                    <pre>{JSON.stringify(response.data, null, 4)}</pre>
                    {response.error && <Error description={response.error.message} />}
                </>
            )}

            <h3>Cambiar estado de consulta</h3>
            {!response.data ? (
                'loading...'
            ) : (
                <Form name="changeStatus" onFinish={handleChangeStatus}>
                    <Form.Item name="status" label="Nuevo estado">
                        <Select disabled={response.loading}>
                            {Object.keys(AppointmentStatusEnum).map((status) => (
                                <Select.Option value={status} key={status}>
                                    {status}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Row justify="center">
                        <Button htmlType="submit" type="primary" disabled={response.loading}>
                            Guardar
                        </Button>
                    </Row>
                </Form>
            )}

            <h3>Reagendar consulta</h3>
            <Form name="rescheduled" onFinish={handleRescheduled}>
                <Form.Item name="dateAndTime" label="Nueva fecha y hora">
                    <DatePicker showTime={{ format: 'HH:mm', minuteStep: 30 }} format="DD-MM-YYYY HH:mm" />
                </Form.Item>
                <Row justify="center">
                    <Button htmlType="submit" type="primary" disabled={response.loading}>
                        Guardar
                    </Button>
                </Row>
            </Form>
        </>
    );
};

const Api: React.FC<RouteComponentProps> = () => {
    const [storyKey, setStoryKey] = useState<string>();
    const [appointmentKey, setAppointmentKey] = useState<string>();

    return (
        <ApiContext.Provider value={{ storyKey, setStoryKey, appointmentKey, setAppointmentKey }}>
            <h1>Historias</h1>
            <StoryListApi />
            {storyKey && <StoryApi $key={storyKey} />}

            <h1>Consultas</h1>
            <AppointmentListApi />
            {storyKey && appointmentKey && <AppointmentApi $storyKey={storyKey} $key={appointmentKey} />}
        </ApiContext.Provider>
    );
};

export default Api;
