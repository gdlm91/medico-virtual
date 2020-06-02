import React, { useCallback, useEffect } from 'react';
import { Input, Form } from 'antd';

import { AppointmentFormTreatment, AppointmentForm } from '../types';
import { debounce } from 'debounce';
import { Store } from 'antd/lib/form/interface';

interface Props {
    data?: AppointmentFormTreatment;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const Treatment: React.FC<Props> = ({ data, onValuesChange }) => {
    const { TextArea } = Input;
    const [formRef] = Form.useForm();

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, allValues: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ treatment: allValues as AppointmentFormTreatment }, 'treatment');
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
            <Form.Item label="Tratamiento" name="treatment">
                <TextArea autoSize={{ minRows: 5 }} />
            </Form.Item>
            <Form.Item label="Observaciones a Familiares" name="observations">
                <TextArea autoSize={{ minRows: 5 }} />
            </Form.Item>
        </Form>
    );
};

export default Treatment;
