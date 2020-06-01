import React from 'react';
import { Form, Table } from 'antd';
import SelectList from './SelectList';

const FamilyHistory: React.FC = () => {
    const options = {
        Patalogicos: 'Patalogicos',
        Alergico: 'Alergico',
        Traumaticos: 'Traumaticos',
        Venereas: 'Venereas',
        cancer: 'Cancer',
        Quirurjico: 'Quirurjico',
        niegaAntecedentePersonales: 'Niega antecedentes personales',
    };

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
    const data = [
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

    return (
        <>
            <Form layout="vertical" onFinish={console.log} style={{ marginBottom: '30px' }}>
                <SelectList name="antecedentesFamiliares" label="Antecedente" options={options}></SelectList>
            </Form>

            <Table columns={columns} dataSource={data} size="small" />
        </>
    );
};

export default FamilyHistory;
