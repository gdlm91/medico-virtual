import React, { useState } from 'react';
import { Button, Modal, Row, Col, Input, Select, Form, DatePicker, Alert } from 'antd';
import { Store } from 'antd/lib/form/interface';

import './PatientRegistration.css';
import { Patient } from '../types';
import { Moment } from 'moment';

export interface Api {
    hideModal: () => void;
    showError: (error: string) => void;
}

interface Props {
    onFinish: (value: Patient, api: Api) => void;
}

const PatientRegistration: React.FC<Props> = ({ onFinish }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const { Option, OptGroup } = Select;

    const [form] = Form.useForm();

    const showModal = () => setVisible(true);

    const hideModal = () => {
        setLoading(false);
        setVisible(false);
        setError(undefined);
        form.resetFields();
    };

    const showError = (error: string) => {
        console.error(error);
        setLoading(false);
        setError(error);
    };

    const handleOnFinish = (value: Store) => {
        const patient = {
            ...value,
            birthday: (value['birthday'] as Moment).format('DD-MM-YYYY'),
        } as Patient;

        onFinish(patient as Patient, { hideModal, showError });
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        hideModal();
    };

    const footer = [
        <Button key="Cancelar" onClick={handleCancel} disabled={loading}>
            Cancelar
        </Button>,
        <Button key="Registrar" type="primary" onClick={handleOk} loading={loading}>
            Registrar
        </Button>,
    ];

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: '${label} es requerido',
    };

    return (
        <React.Fragment>
            <Button type="primary" onClick={showModal}>
                Registrar nuevo paciente
            </Button>
            <Modal
                title="Registrar nuevo paciente"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
            >
                <Form
                    form={form}
                    onFinish={handleOnFinish}
                    layout="vertical"
                    name="basic"
                    validateMessages={validateMessages}
                >
                    <Form.Item label="Nombres y Apellidos" name="name" rules={[{ required: true }]}>
                        <Input disabled={loading} />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Pais" name="country" rules={[{ required: true }]}>
                                <Select disabled={loading}>
                                    <OptGroup>
                                        <Option value="Colombia">Colombia</Option>
                                        <Option value="Venezuela">Venezuela</Option>
                                    </OptGroup>
                                    <OptGroup>
                                        <Option value="Otro">Otro</Option>
                                    </OptGroup>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Documento" name="id" rules={[{ required: true }]}>
                                <Input disabled={loading} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Fecha de nacimiento" name="birthday" rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Numero telefónico" name="phone" rules={[{ required: true }]}>
                                <Input disabled={loading} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Correo electronico" name="email" rules={[{ required: true }]}>
                        <Input disabled={loading} />
                    </Form.Item>

                    {error && <Alert message={error} type="error" showIcon closable />}
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default PatientRegistration;
