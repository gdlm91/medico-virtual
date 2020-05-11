import React from 'react';
import { Form, Table } from 'antd';
import SelectList from './SelectList';
import './PersonalHistory.css';

const PersonalHistory: React.FC = () => {
    const options = {
        perinatales: 'perinatales',
        desarrolloPsicomotor: 'Desarrollo psicomotor',
        Patalogicos: 'Patalogicos',
        Alergico: 'Alergico',
        Traumaticos: 'Traumaticos',
        Venereas: 'Venereas',
        GinecoObstetricos: 'Gineco-Obstetricos',
        FechaDeUltimaRegla: 'Fecha de ultima regla',
        FechaDeUltimoParto: 'Fecha de ultimo parto',
        FechaDeUltimaCitologia: 'Fecha de ultima citologia',
        FechaDeUltimaMamografia: 'Fecha de Ultima mamografia',
        Hospitalizaciones: 'Hospitalizaciones',
        Farmacologicos: 'Farmacologicos',
        CocinoConLena: 'Cocino con leña',
        Tabaco: 'Tabaco',
        cancer: 'Cancer',
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

    return (
        <>
            <Form layout="vertical">
                <SelectList name="antecedentesPersonales" label="Antecedente" options={options}></SelectList>
            </Form>
            <div className="personal-history-table">
                <Table columns={columns} dataSource={data} size="small" />
            </div>
        </>
    );
};

export default PersonalHistory;
