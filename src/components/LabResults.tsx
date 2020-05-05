import React, { useState } from 'react';
import { Checkbox, DatePicker, Form, Row, Col, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const LabResults: React.FC = () => {
    const [form] = Form.useForm();
    const [LabDisabled, LabSetDisabled] = useState(true);
    const [ImgDisabled, ImgSetDisabled] = useState(true);

    function onChangeLab(e: CheckboxChangeEvent) {
        LabSetDisabled(!e.target.checked);
    }
    function onChangeImg(e: CheckboxChangeEvent) {
        ImgSetDisabled(!e.target.checked);
    }
    const { TextArea } = Input;

    return (
        <React.Fragment>
            <Form form={form} name="form" layout="vertical">
                <Row>
                    <Col span={8}>
                        <Form.Item name="trajoResultados" valuePropName="checked">
                            <Checkbox onChange={onChangeLab}>Trajos resultados de laboratorio</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="Fecha">
                            <DatePicker style={{ width: '100%' }} disabled={LabDisabled} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Observación" name="observacion">
                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} disabled={LabDisabled} />
                </Form.Item>
                <Row>
                    <Col span={8}>
                        <Form.Item name="trajoResultadosDeImagenes" valuePropName="checked">
                            <Checkbox onChange={onChangeImg}>Trajos resultados de imágenes</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="Fecha">
                            <DatePicker style={{ width: '100%' }} disabled={ImgDisabled} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Observación" name="observacion">
                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} disabled={ImgDisabled} />
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default LabResults;
