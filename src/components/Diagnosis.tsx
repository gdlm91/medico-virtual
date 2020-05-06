import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const Diagnosis: React.FC = () => {
    const { Option } = Select;
    const { Search } = Input;
    const { TextArea } = Input;

    const fields = {
        principal: 'Principal',
        diagnostico2: 'Diagnostico #2',
        diagnostico3: 'Diagnostico #3',
    };

    return (
        <>
            <Form layout="vertical" onFinish={console.log}>
                {Object.entries(fields).map(([name, label]) => (
                    <Row key={name} gutter={16}>
                        <Col span={18}>
                            <Form.Item label={label} name={[name, 'diagnostico']}>
                                <Search
                                    placeholder="input search text"
                                    onSearch={(value) => console.log(value)}
                                    enterButton
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="&nbsp;" name={[name, 'tipo']}>
                                <Select>
                                    <Option value="primera">Primera vez</Option>
                                    <Option value="sucesiva">Sucesiva</Option>
                                    <Option value="impresion">Impresión</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                ))}
                <Form.Item label="Observaciones" name="observaciones">
                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                </Form.Item>
            </Form>
        </>
    );
};

export default Diagnosis;
