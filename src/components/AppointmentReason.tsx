import React, { useEffect, useCallback } from 'react';
import { debounce } from 'debounce';
import { Input, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { AppointmentForm, AppointmentFormReason } from '../types';

interface Props {
    data?: AppointmentFormReason;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const AppointmentReason: React.FC<Props> = ({ data, onValuesChange }) => {
    const { TextArea } = Input;
    const [formRef] = Form.useForm();

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, allValues: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ reason: allValues as AppointmentFormReason }, 'reason');
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
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <Form.Item label="Motivo de consulta" name="reason">
                <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
            </Form.Item>
            <Form.Item label="Enfermedad actual" name="sickness">
                <TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
            </Form.Item>
        </Form>
    );
};

export default AppointmentReason;
