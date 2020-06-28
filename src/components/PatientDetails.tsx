import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'debounce';
import { Row, Col, Input, Select, Form, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { Store } from 'antd/lib/form/interface';

import { Patient } from '../types';

interface Props {
    data?: Patient;
    disabled?: boolean;
    onFinish?: (value: Patient) => void;
    onValuesChange?: (value: Patient) => void;
}

const getAge = (birthday: Moment | null) => {
    if (!birthday) {
        return 0;
    }
    return moment().diff(birthday, 'year');
};

const storeToPatient = (values: Store): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { birthday, age, ...patient } = values;

    // format back to a string
    const birthdayStr = (birthday as Moment).format('DD-MM-YYYY');

    return {
        ...(patient as Patient),
        birthday: birthdayStr,
    };
};

const patientToStore = (values: Patient): Store => {
    const birthday = values.birthday && moment(values.birthday, 'DD-MM-YYYY');
    const age = birthday && getAge(birthday);

    return {
        ...values,
        birthday,
        age,
    };
};

const PatientDetails: React.FC<Props> = ({ data, onFinish, onValuesChange, children, disabled }) => {
    const [formRef] = Form.useForm();
    const [age, setAge] = useState(0);
    const { Option, OptGroup } = Select;

    const handleOnFinish = (values: Store) => {
        if (!onFinish) {
            return;
        }

        onFinish(storeToPatient(values));
    };

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, allValues: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange(storeToPatient(allValues));
        }, 5000),
        [onValuesChange],
    );

    const handleBirthdayChange = (date: Moment | null) => {
        const age = getAge(date);
        setAge(age);
    };

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            const store = patientToStore(data);

            formRef.setFieldsValue(store);
            setAge(store.age);
        }
    }, [formRef, data]);

    useEffect(() => {
        formRef.setFieldsValue({ age });
    }, [age, formRef]);

    return (
        <Form
            form={formRef}
            layout="vertical"
            name="patientDetails"
            onFinish={handleOnFinish}
            onValuesChange={handleOnValuesChange}
        >
            <fieldset disabled={disabled}>
                <Row gutter={16}>
                    <Col span={24} lg={16} xl={12}>
                        <Form.Item label="Nombres y Apellidos" name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={8} xl={6}>
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
                    <Col span={24} lg={8} xl={6}>
                        <Form.Item label="Documento" name="id" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={8} xl={6}>
                        <Form.Item label="Fecha de nacimiento" name="birthday" rules={[{ required: true }]}>
                            <DatePicker
                                disabled={disabled}
                                onChange={handleBirthdayChange}
                                style={{ width: '100%' }}
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={8} xl={6}>
                        <Form.Item label="Edad" name="age">
                            <Input value={age} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={8} xl={6}>
                        <Form.Item label="Sexo" name="gender">
                            <Select disabled={disabled}>
                                <Option value="femenino">Femenino</Option>
                                <Option value="masculino">Masculino</Option>
                                <Option value="otro">Otro</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={8} xl={6}>
                        <Form.Item label="Estado civil" name="maritalStatus">
                            <Select disabled={disabled}>
                                <Option value="soltero">Soltero</Option>
                                <Option value="casado">Casado</Option>
                                <Option value="viudo">Viudo</Option>
                                <Option value="concubinato">Concubinato</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={8} xl={6}>
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
                    <Col span={24} lg={8} xl={6}>
                        <Form.Item label="Numero telefónico" name="phone" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={16} xl={12}>
                        <Form.Item label="Correo electronico" name="email" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Dirección" name="address">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} lg={16} xl={12}>
                        <Form.Item label="Ocupación" name="job">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {children}
            </fieldset>
        </Form>
    );
};

PatientDetails.defaultProps = {
    disabled: false,
};

export default PatientDetails;
