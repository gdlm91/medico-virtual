import React, { useState } from 'react';
import { Button, Row, Col, Input, Select, Form, DatePicker } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './Downloadables.css';

type showDatesCallback = (value: string) => boolean;

interface Props {
    options: { [key: string]: string };
    name: string;
    label: string;
    showDates?: boolean | showDatesCallback;
}

interface PropsWithField extends Props {
    field: {
        name: number;
        key: number;
        fieldKey: number;
    };
}

const SelectWithDate: React.FC<PropsWithField> = ({ options, label, showDates, field }) => {
    const [selectValue, setSelectValue] = useState('');
    const { RangePicker } = DatePicker;
    const { Option } = Select;

    const shouldShowDates = () => {
        if (typeof showDates == 'function') {
            return showDates(selectValue);
        }

        return showDates;
    };

    return (
        <>
            <Form.Item label={label} name={[field.name, label.toLowerCase()]}>
                <Select onChange={(val) => setSelectValue(val as string)}>
                    {Object.entries(options).map(([value, label]) => (
                        <Option key={value} value={value}>
                            {label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            {shouldShowDates() ? (
                <Form.Item label="Desde - Hasta" name={[field.name, 'fechas']}>
                    <RangePicker format="DD/MM/YYYY" style={{ display: 'flex', width: '100%' }} />
                </Form.Item>
            ) : null}
        </>
    );
};

const SelectList: React.FC<Props> = (props) => {
    const { TextArea } = Input;

    return (
        <Form.List name={props.name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field) => (
                        <Row gutter={16} key={field.key}>
                            <Col span={8}>
                                <SelectWithDate {...props} field={field} />
                            </Col>
                            <Col span={14}>
                                <Form.Item label="Observación" name={[field.name, 'observacion']}>
                                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                                </Form.Item>
                            </Col>
                            <Col className="dynamic-delete-button">
                                <Button type="dashed" danger onClick={() => remove(field.name)}>
                                    <DeleteOutlined />
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    <Button block type="dashed" onClick={() => add()}>
                        <PlusOutlined /> Agregar
                    </Button>
                </>
            )}
        </Form.List>
    );
};

SelectList.defaultProps = {
    showDates: false,
};

const Downloadables: React.FC = () => {
    const options = {
        reposo: 'Reposo',
        recetaMedica: 'Receta medica',
    };

    return (
        <Form layout="vertical" onFinish={console.log}>
            <SelectList
                name="descargables"
                label="Descargable"
                options={options}
                showDates={(value) => value == 'reposo'}
            ></SelectList>
            <Button block htmlType="submit" type="primary" className="button-pdf">
                Exportar a PDF
            </Button>
        </Form>
    );
};

export default Downloadables;
