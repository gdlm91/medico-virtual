import React from 'react';
import { action } from '@storybook/addon-actions';

import PatientRegistration from './PatientRegistration';

export default {
    title: 'Registrar paciente',
    component: PatientRegistration,
};

export const Default = () => <PatientRegistration />;
