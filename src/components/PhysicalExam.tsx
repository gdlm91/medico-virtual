import React from 'react';
import { Button, Form } from 'antd';
import SelectList from './SelectList';

const PhysicalExam: React.FC = () => {
    const options = {
        condicionesGenerales: 'Condiciones generales',
        Piel: 'Piel',
        Cabeza: 'Cabeza',
        Otorrinolaringologia: 'Otorrinolaringologia',
        Ojos: 'Ojos',
        Cuello: 'Cuello',
        Torax: 'Torax',
        Mama: 'Mama',
        Cardiovascular: 'Cardiovascular',
        Abdomen: 'Abdomen',
        Extremidades: 'Extremidades',
        Genitourinario: 'Genitourinario',
        Neurologico: 'Neurologico',
    };
    return (
        <>
            <Form layout="vertical" onFinish={console.log}>
                <SelectList name="examenFisico" label="Examen fisico" options={options}></SelectList>,
            </Form>
        </>
    );
};

export default PhysicalExam;
