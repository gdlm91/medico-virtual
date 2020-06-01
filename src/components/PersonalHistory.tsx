import React, { useCallback, useEffect } from 'react';
import { Form, Table } from 'antd';
import SelectList from './SelectList';
import { debounce } from 'debounce';
import { Store } from 'antd/lib/form/interface';

import { PersonalHistoryOptions } from '../db/constants';
import { AppointmentForm, AppointmentFormPersonalHistory } from '../types';

const columns = [
    {
        title: 'Fecha',
        dataIndex: 'fecha',
    },
    {
        title: 'Antecedente',
        dataIndex: 'antecedente',
    },
    {
        title: 'Observación',
        dataIndex: 'observacion',
    },
];

const fakeData = [
    {
        key: 1,
        fecha: '20 Mayo 2020',
        antecedente: 'Alergico',
        observacion: 'Presenta alergia al acetaminofen',
    },
    {
        key: 2,
        fecha: '19 Mayo 2020',
        antecedente: 'Quirurjico',
        observacion: 'Operación de hernia',
    },
    {
        key: 3,
        fecha: '18 Mayo 2020',
        antecedente: 'Cancer',
        observacion: 'Cancer detectado, le quedan 3 meses de vida',
    },
];

interface Props {
    data?: AppointmentFormPersonalHistory;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const PersonalHistory: React.FC<Props> = ({ data, onValuesChange }) => {
    const [formRef] = Form.useForm();

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, { personalHistory }: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ personalHistory: personalHistory as AppointmentFormPersonalHistory }, 'personalHistory');
        }, 5000),
        [onValuesChange],
    );

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue({ personalHistory: data });
        }
    }, [formRef, data]);

    return (
        <>
            <Form
                form={formRef}
                layout="vertical"
                onValuesChange={handleOnValuesChange}
                style={{ marginBottom: '30px' }}
            >
                <SelectList name="personalHistory" label="Antecedente" options={PersonalHistoryOptions}></SelectList>
            </Form>

            <Table columns={columns} dataSource={fakeData} size="small" />
        </>
    );
};

export default PersonalHistory;
