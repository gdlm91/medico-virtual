import React from 'react';
import { Input, Form } from 'antd';

const Treatment: React.FC = () => {
    const { TextArea } = Input;
    const [form] = Form.useForm();

    return (
        <React.Fragment>
            <Form form={form} layout="vertical" name="basic">
                <Form.Item label="Tratamiento" name="tratamiento">
                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                </Form.Item>
                <Form.Item label="Observaciones a Familiares" name="observaciones">
                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default Treatment;
