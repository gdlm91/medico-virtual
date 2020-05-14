import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Form, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { Store } from 'antd/lib/form/interface';
import { Patient } from '../types';

interface Props {
    data?: Patient;
    disabled?: boolean;
    onFinish: (value: Store) => void;
}

const getAge = (birthday: Moment | null) => {
    if (!birthday) {
        return 0;
    }
    return moment().diff(birthday, 'year');
};

const PatientDetails: React.FC<Props> = ({ data, onFinish, children, disabled }) => {
    const [formRef] = Form.useForm();
    const [age, setAge] = useState(0);
    const { Option, OptGroup } = Select;

    useEffect(() => {
        if (data) {
            const birthday = moment(data.birthday, 'DD-MM-YYYY');
            const age = getAge(birthday);

            formRef.setFieldsValue({
                ...data,
                birthday,
                age,
            });

            setAge(age);
        }
    }, [formRef, data]);

    useEffect(() => {
        formRef.setFieldsValue({ age });
    }, [age]);

    const handleOnFinish = (values: Store) => {
        // format back to a string
        const birthday = (values.birthday as Moment).format('DD-MM-YYYY');

        onFinish({
            ...(values as Patient),
            age: null, // no need to store the age
            birthday,
        });
    };

    const handleBirthdayChange = (date: Moment | null) => {
        const age = getAge(date);
        setAge(age);
    };

    return (
        <Form form={formRef} layout="vertical" name="patientDetails" onFinish={handleOnFinish}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Nombres y Apellidos" name="name" rules={[{ required: true }]}>
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Pais" name="country" rules={[{ required: true }]}>
                        <Select disabled={disabled}>
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
                    <Form.Item label="Documento" name="id" rules={[{ required: true }]}>
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item label="Fecha de nacimiento" name="birthday" rules={[{ required: true }]}>
                        <DatePicker
                            disabled={disabled}
                            onChange={handleBirthdayChange}
                            style={{ width: '100%' }}
                            format="DD-MM-YYYY"
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Edad" name="age">
                        <Input value={age} disabled />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Sexo" name="gender">
                        <Select disabled={disabled}>
                            <Option value="femenino">Femenino</Option>
                            <Option value="masculino">Masculino</Option>
                            <Option value="otro">Otro</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Estado civil" name="maritalStatus">
                        <Select disabled={disabled}>
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
                    <Form.Item label="Tipo de sangre" name="bloodType">
                        <Select disabled={disabled}>
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
                    <Form.Item label="Numero telefónico" name="phone" rules={[{ required: true }]}>
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Correo electronico" name="email" rules={[{ required: true }]}>
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item label="Dirección" name="address">
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="Ocupación" name="job">
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
            </Row>

            {children}
        </Form>
    );
};

PatientDetails.defaultProps = {
    disabled: false,
};

export default PatientDetails;
