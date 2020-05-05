import React from 'react';
import { Input, Form } from 'antd';

const ConsultationReason: React.FC = () => {
    const { TextArea } = Input;
    const [form] = Form.useForm();

    return (
        <React.Fragment>
            <Form form={form} layout="vertical" name="basic">
                <Form.Item label="Motivo de consulta" name="motivoDeConsulta">
                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                </Form.Item>
                <Form.Item label="Enfermedad actual" name="enfermedadActual">
                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default ConsultationReason;
