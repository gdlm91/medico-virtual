import React from 'react';
import { Form, Input, Button, Row, Select, Col, Alert } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { FormProps } from 'antd/lib/form/Form';

type Fields = { field: string; value: string }[];

type FieldsMap = { [key: string]: string };

interface FieldsListProps {
    keys: string[];
    loading?: boolean;
}

interface FieldListComponent extends React.FC<FieldsListProps> {
    toFieldsMap: (store: Store) => FieldsMap;
}

export const FieldList: FieldListComponent = ({ keys, loading }) => {
    const { Option } = Select;

    return (
        <Form.List name="fields">
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field) => (
                        <Row gutter={16} key={field.key} align="middle">
                            <Col span={8}>
                                <Form.Item label="campo" name={[field.name, 'field']}>
                                    <Select disabled={loading}>
                                        {keys.map((key) => (
                                            <Option key={key} value={key}>
                                                {key}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={14}>
                                <Form.Item label="valor" name={[field.name, 'value']}>
                                    <Input disabled={loading} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button type="dashed" danger onClick={() => remove(field.name)}>
                                    <DeleteOutlined />
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    <Row gutter={16} justify="center">
                        <Col>
                            <Button block type="dashed" onClick={() => add()}>
                                <PlusOutlined /> Agregar
                            </Button>
                        </Col>
                        <Col>
                            <Button htmlType="submit" disabled={loading} type="primary">
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Form.List>
    );
};

FieldList.defaultProps = {
    loading: false,
};

FieldList.toFieldsMap = (store: Store) => {
    const fields = store.fields as Fields;

    return fields.reduce((acc, cur) => {
        acc[cur.field] = cur.value;
        return acc;
    }, {} as { [key: string]: string });
};

export const FieldForm: React.FC<FormProps> = ({ onFinish, ...props }) => {
    const onFinishWrapper = (value: Store) => {
        if (onFinish) {
            onFinish(FieldList.toFieldsMap(value));
        }
    };

    return <Form {...props} onFinish={onFinishWrapper} />;
};

export const Error: React.FC<{ description: string }> = ({ description }) => (
    <Alert style={{ marginBottom: '20px' }} message="Error" type="error" description={description} showIcon closable />
);

interface ApiState {
    setStoryKey: (key: string) => void;
    storyKey?: string;
    setAppointmentKey: (key: string) => void;
    appointmentKey?: string;
}

const noop = () => console.error('ApiStateProvider not ready');

export const ApiContext = React.createContext<ApiState>({
    setStoryKey: noop,
    setAppointmentKey: noop,
});
