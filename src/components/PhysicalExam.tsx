import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';

import { PhysicalExamOptions } from '../db/constants';
import SelectList from './SelectList';
import { AppointmentFormPhysicalExam, AppointmentForm } from '../types';
import { debounce } from 'debounce';
import { Store } from 'antd/lib/form/interface';

interface Props {
    data?: AppointmentFormPhysicalExam;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const PhysicalExam: React.FC<Props> = ({ data, onValuesChange }) => {
    const [formRef] = Form.useForm();

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, { physicalExam }: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ physicalExam: physicalExam as AppointmentFormPhysicalExam }, 'physicalExam');
        }, 5000),
        [onValuesChange],
    );

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue({ physicalExam: data });
        }
    }, [formRef, data]);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <SelectList name="physicalExam" label="Examen fisico" options={PhysicalExamOptions}></SelectList>,
        </Form>
    );
};

export default PhysicalExam;
