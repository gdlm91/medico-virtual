import React, { useCallback, useMemo } from 'react';
import { Form, Table } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { FamilyHistoryOptions } from '../db/constants';
import { AppointmentForm, AppointmentFormFamilyHistory } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';
import SelectList from './SelectList';

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
    onValuesChange?: (value: AppointmentForm) => void;
}

const FamilyHistory: React.FC<Props> = ({ data, onValuesChange, disabled }) => {
    const transformedData = useMemo(() => {
        // We need to put the information inside an object for SelectList to work properly
        return data && ({ familyHistory: data } as AppointmentForm);
    }, [data]);
    const transformedHandleOnValuesChange = useCallback(
        (values: Store) => {
            // We need to take the value out of the nested fields inside familyHistory
            onValuesChange && onValuesChange({ familyHistory: values && values['familyHistory'] });
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(transformedData, transformedHandleOnValuesChange);

    return (
        <>
            <Form
                form={formRef}
                layout="vertical"
                onValuesChange={handleOnValuesChange}
                style={{ marginBottom: '30px' }}
            >
                <SelectList
                    name="familyHistory"
                    label="Antecedente"
                    options={FamilyHistoryOptions}
                    disabled={disabled}
                ></SelectList>
            </Form>

            <Table columns={columns} dataSource={fakeData} size="small" />
        </>
    );
};

export default FamilyHistory;
