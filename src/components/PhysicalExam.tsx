import React, { useCallback, useMemo } from 'react';
import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { PhysicalExamOptions } from '../db/constants';
import { AppointmentFormPhysicalExam, AppointmentForm } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';
import SelectList from './SelectList';

interface Props {
    data?: AppointmentFormPhysicalExam;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm) => void;
}

const PhysicalExam: React.FC<Props> = ({ data, onValuesChange }) => {
    const transformedData = useMemo(() => {
        // We need to put the information inside an object for SelectList to work properly
        return data && ({ physicalExam: data } as AppointmentForm);
    }, [data]);
    const transformedHandleOnValuesChange = useCallback(
        (values: Store) => {
            // We need to take the value out of the nested fields inside physicalExam
            onValuesChange && onValuesChange({ physicalExam: values && values['physicalExam'] });
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(transformedData, transformedHandleOnValuesChange);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <SelectList name="physicalExam" label="Examen fisico" options={PhysicalExamOptions}></SelectList>
        </Form>
    );
};

export default PhysicalExam;
