import React, { useCallback, useEffect } from 'react';
import { Form, Table } from 'antd';

import SelectList from './SelectList';
import { FamilyHistoryOptions } from '../db/constants';
import { AppointmentForm, AppointmentFormFamilyHistory } from '../types';
import { debounce } from 'debounce';
import { Store } from 'antd/lib/form/interface';

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
        antecedente: 'Veneria',
        observacion: 'La esposa fue diagnostica con VPH',
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
    data?: AppointmentFormFamilyHistory;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const FamilyHistory: React.FC<Props> = ({ data, onValuesChange }) => {
    const [formRef] = Form.useForm();

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, { familyHistory }: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ familyHistory: familyHistory as AppointmentFormFamilyHistory }, 'familyHistory');
        }, 5000),
        [onValuesChange],
    );

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue({ familyHistory: data });
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
                <SelectList name="familyHistory" label="Antecedente" options={FamilyHistoryOptions}></SelectList>
            </Form>

            <Table columns={columns} dataSource={fakeData} size="small" />
        </>
    );
};

export default FamilyHistory;
