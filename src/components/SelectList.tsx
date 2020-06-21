import React from 'react';
import { Button, Row, Col, Input, Select, Form } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './SelectList.css';

interface Props {
    options: { [key: string]: string };
    name: string;
    label: string;
    disabled?: boolean;
}

const SelectList: React.FC<Props> = ({ options, name, label, disabled }) => {
    const { Option } = Select;
    const { TextArea } = Input;

    return (
        <Form.List name={name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field) => (
                        <Row gutter={16} key={field.key}>
                            <Col span={8}>
                                <Form.Item label={label} name={[field.name, 'key']}>
                                    <Select disabled={disabled}>
                                        {Object.entries(options).map(([value, label]) => (
                                            <Option key={value} value={value}>
                                                {label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Observación" name={[field.name, 'observation']}>
                                    <TextArea disabled={disabled} autoSize={{ minRows: 5, maxRows: 5 }} />
                                </Form.Item>
                            </Col>
                            <Col className="dynamic-delete-button">
                                <Button type="dashed" disabled={disabled} danger onClick={() => remove(field.name)}>
                                    <DeleteOutlined />
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    <Button block type="dashed" onClick={() => add()} disabled={disabled}>
                        <PlusOutlined /> Agregar
                    </Button>
                </>
            )}
        </Form.List>
    );
};

export default SelectList;
