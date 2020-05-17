import React from 'react';
import PatientDetails from './PatientDetails';

export default {
    title: 'Datos del Paciente',
    component: PatientDetails,
};

export const Default = () => <PatientDetails onFinish={console.log} />;
