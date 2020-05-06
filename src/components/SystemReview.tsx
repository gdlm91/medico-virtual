import React from 'react';
import { Form } from 'antd';
import SelectList from './SelectList';

const SystemReview: React.FC = () => {
    const options = {
        piel: 'Piel',
        cabeza: 'Cabeza',
        Otorrinolaringologia: 'Otorrinolaringologia',
        Ojos: 'Ojos',
        Cuello: 'Cuello',
        Torax: 'Torax',
        Mamas: 'Mamas',
        Cardiovascular: 'Cardiovascular',
        Abdomen: 'Abdomen',
        Genital: 'Genital',
        Extremidades: 'Extremidades',
        Neurologico: 'Neurologico',
        NiegaRevisionPorSistema: 'NiegaRevisionPorSistema',
    };

    return (
        <Form layout="vertical">
            <SelectList name="revisionPorSistema" label="Sistema" options={options}></SelectList>
        </Form>
    );
};

export default SystemReview;
