import React from 'react';

import PatientRegistration, { Api as PatientRegistrationApi } from './PatientRegistration';
import { Patient } from '../types';

export default {
    title: 'Registrar paciente',
    component: PatientRegistration,
};

export const Default = () => {
    const handlePatientRegistration = (value: Patient, api: PatientRegistrationApi) => {
        console.log(value);
        api.hideModal();
    };

    return <PatientRegistration onFinish={handlePatientRegistration} />;
};
