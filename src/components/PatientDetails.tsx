import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input, Select, Form, DatePicker } from 'antd';
import { differenceInYears } from 'date-fns';
import { Moment } from 'moment';

const PatientDetails: React.FC = () => {
    const [form] = Form.useForm();
    const [age, setAge] = useState(0);
    const { Option, OptGroup } = Select;

    useEffect(() => {
        form.setFieldsValue({ edad: age });
    }, [age]);

    const onFinish = (values: {}) => {
        console.log(values);
    };

    const handleSaveDate = (date: Moment | null, dateString: string) => {
        const ageResult = differenceInYears(new Date(), new Date(dateString));
        setAge(ageResult);
    };

    return (
        <React.Fragment>
            <Form form={form} onFinish={onFinish} layout="vertical" name="basic">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Nombres y Apellidos" name="nombreCompleto" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
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
                    <Col span={6}>
                        <Form.Item label="Documento" name="documento" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="Fecha de nacimiento" name="fechaDeNacimiento" rules={[{ required: true }]}>
                            <DatePicker onChange={handleSaveDate} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Edad" name="edad">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Sexo" name="sexo">
                            <Select>
                                <Option value="femenino">Femenino</Option>
                                <Option value="masculino">Masculino</Option>
                                <Option value="otro">Otro</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Estado civil" name="estadoCivil">
                            <Select>
                                <Option value="soltero">Soltero</Option>
                                <Option value="casado">Casado</Option>
                                <Option value="viudo">Viudo</Option>
                                <Option value="concubinato">Concubinato</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="Tipo de sangre" name="tipoDeSangre">
                            <Select>
                                <Option value="A positivo">A Positiva (A+)</Option>
                                <Option value="A negativo">A Negativo (A-)</Option>
                                <Option value="B positivo">B Positivo (B+)</Option>
                                <Option value="B negativo">B Negativo (B-)</Option>
                                <Option value="O positivo">O Positivo (O+)</Option>
                                <Option value="O negativo">O Negativo (O-)</Option>
                                <Option value="AB positivo">AB Positivo (AB+)</Option>
                                <Option value="AB negativo">AB Negativo (AB-)</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Numero telefónico" name="numeroTelefonico" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Correo electronico" name="correoElectronico" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Dirección" name="direccion">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Ocupación" name="ocupacion">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Button key="Guardar" type="primary" htmlType="submit">
                Guardar
            </Button>
        </React.Fragment>
    );
};

export default PatientDetails;
