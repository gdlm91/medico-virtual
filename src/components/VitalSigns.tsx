import React, { useCallback, useEffect } from 'react';
import { Table, Input, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { debounce } from 'debounce';

import { VitalSignOptions } from '../db/constants';
import { AppointmentFormVitalSigns, AppointmentForm } from '../types';

interface Props {
    data?: AppointmentFormVitalSigns;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const VitalSigns: React.FC<Props> = ({ data, onValuesChange }) => {
    const [formRef] = Form.useForm();

    const columns = [
        {
            title: 'Descripción',
            dataIndex: 'name',
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            // eslint-disable-next-line react/display-name
            render: (value: string, record: typeof VitalSignOptions[number]) => {
                return (
                    <Form.Item name={record.key}>
                        <Input />
                    </Form.Item>
                );
            },
        },
        {
            title: 'Unidad',
            dataIndex: 'unit',
        },
    ];

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, allValues: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ vitalSigns: allValues as AppointmentFormVitalSigns }, 'vitalSigns');
        }, 5000),
        [onValuesChange],
    );

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue(data);
        }
    }, [formRef, data]);

    return (
        <Form name="form" form={formRef} onValuesChange={handleOnValuesChange}>
            <Table
                pagination={false}
                bordered
                dataSource={VitalSignOptions}
                columns={columns}
                style={{ maxWidth: '800px' }}
            />
        </Form>
    );
};

export default VitalSigns;
