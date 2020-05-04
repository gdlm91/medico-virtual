import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Row, Col, Input, Select, Form, DatePicker } from 'antd';

import './RegistrarPaciente.css';

const RegistrarPaciente: React.FC = () => {
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
                <Form form={form} onFinish={onFinish} layout="vertical" name="basic">
                    <Form.Item label="Nombres y Apellidos" name="nombreCompleto">
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Pais" name="pais">
                                <Select>
                                    <OptGroup>
                                        <Option value="jack">Colombia</Option>
                                        <Option value="lucy">Venezuela</Option>
                                    </OptGroup>
                                    <OptGroup>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </OptGroup>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Documento" name="documento">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Fecha de nacimiento" name="fechaDeNacimiento">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Numero telefónico" name="numeroTelefonico">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Correo electronico" name="correoElectronico">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default RegistrarPaciente;
