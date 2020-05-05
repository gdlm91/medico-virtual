import React, { useState } from 'react';
import { Button, Modal, Row, Col, Input, Select, Form, DatePicker } from 'antd';

import './PatientRegistration.css';

const PatientRegistration: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const { Option, OptGroup } = Select;

    const [form] = Form.useForm();

    const showModal = () => setVisible(true);

    const onFinish = (values: {}) => {
        console.log(values);
    };
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };
    const footer = [
        <Button key="Cancelar" onClick={handleCancel}>
            Cancelar
        </Button>,
        <Button key="Registrar" type="primary" onClick={handleOk}>
            Registrar
        </Button>,
    ];

    const validateMessages = {
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
                    onFinish={onFinish}
                    layout="vertical"
                    name="basic"
                    validateMessages={validateMessages}
                >
                    <Form.Item label="Nombres y Apellidos" name="nombreCompleto" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Pais" name="pais" rules={[{ required: true }]}>
                                <Select>
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
                            <Form.Item label="Documento" name="documento" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Fecha de nacimiento"
                                name="fechaDeNacimiento"
                                rules={[{ required: true }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Numero telefónico" name="numeroTelefonico" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Correo electronico" name="correoElectronico" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default PatientRegistration;
