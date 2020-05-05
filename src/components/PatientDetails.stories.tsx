import React from 'react';
import { action } from '@storybook/addon-actions';
import PatientDetails from './PatientDetails';

export default {
    title: 'Datos del Paciente',
    component: PatientDetails,
};

export const Default = () => <PatientDetails />;
