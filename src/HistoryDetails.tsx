import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Row, Col, Form, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import moment, { Moment } from 'moment';
import PatientDetails from './components/PatientDetails';
import useStory from './api/useStory';
import { Patient } from './types';

interface Props extends RouteComponentProps {
    $key?: string;
}

const HistoryDetails: React.FC<Props> = ({ location }) => {
    // using pathname instead of $key because Firestore needs the full path to the object to find it.
    const { response, api } = useStory(location?.pathname || '');
    const [form] = Form.useForm();

    useEffect(() => {
        if (response.data) {
            form.setFieldsValue({
                ...response.data.patient,
                birthday: moment(response.data.patient.birthday, 'DD-MM-YYYY'),
            });
        }
    }, [response]);

    const handlePatientUpdate = (values: Store) => {
        if (response.data) {
            const birthday = (values.birthday as Moment).format('DD-MM-YYYY');
            console.log(birthday);
            api.updatePatientInfo({
                ...(values as Patient),
                birthday,
            });
        }
    };

    const { TabPane } = Tabs;

    return (
        <>
            <Row className="titulo-name">
                <Col span={6}>
                    <h1>Nombre del Paciente</h1>
                </Col>
            </Row>
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane className="fill-appointment-tab-container" tab="Datos personales" key={'1'}>
                    <Form onFinish={handlePatientUpdate} form={form} layout="vertical" name="basic">
                        <PatientDetails />
                        <Button htmlType="submit">Guardar</Button>
                    </Form>
                </TabPane>

                <TabPane className="fill-appointment-tab-container" tab="Historia de consultas" key={'2'}>
                    Por ahora nada!
                </TabPane>
            </Tabs>
        </>
    );
};

export default HistoryDetails;
