import React, { useState, useCallback } from 'react';
import { Form, Input, Select, Row, Col, AutoComplete } from 'antd';
import { debounce } from 'debounce';
import { Store } from 'antd/lib/form/interface';

import useCie10 from '../hooks/useCie10';
import { AppointmentForm, AppointmentDiagnosis, Cie10Record } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';

interface Props {
    data?: AppointmentDiagnosis;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm) => void;
}

const SelectDiagnosis: React.FC<{ label: string; name: string }> = ({ label, name }) => {
    const [query, setQuery] = useState('');
    const [response] = useCie10(query);

    const handleOnChange = debounce((q: string) => {
        setQuery(q);
    }, 700);

    const getOptions = (records: Cie10Record[]) => {
        return records.map((record) => ({
            value: record.code,
            label: <div key={record.id}>{record.code}</div>,
        }));
    };

    return (
        <Row key={name} gutter={16}>
            <Col span={18}>
                <Form.Item label={label} name={[name, 'diagnosis']}>
                    <AutoComplete value={query} onChange={handleOnChange} options={getOptions(response.data || [])}>
                        <Input.Search placeholder="Buscar por síntoma o código" loading={response.loading} />
                    </AutoComplete>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="&nbsp;" name={[name, 'type']}>
                    <Select>
                        <Select.Option value="primera">Primera vez</Select.Option>
                        <Select.Option value="sucesiva">Sucesiva</Select.Option>
                        <Select.Option value="impresion">Impresión</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    );
};

const Diagnosis: React.FC<Props> = ({ data, onValuesChange }) => {
    const wrappedCallback = useCallback(
        (values: Store) => {
            onValuesChange && onValuesChange({ diagnosis: values as AppointmentDiagnosis });
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(data, wrappedCallback);
    const { TextArea } = Input;

    const fields = {
        principal: 'Principal',
        diagnosis2: 'Diagnostico #2',
        diagnosis3: 'Diagnostico #3',
    };

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            {Object.entries(fields).map(([name, label]) => (
                <SelectDiagnosis key={name} label={label} name={name} />
            ))}

            <Form.Item label="Observaciones" name="observaciones">
                <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
            </Form.Item>
        </Form>
    );
};

export default Diagnosis;
