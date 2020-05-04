import React from 'react';
import { action } from '@storybook/addon-actions';

import RegistrarPaciente from './RegistrarPaciente';

export default {
    title: 'Registrar paciente',
    component: RegistrarPaciente,
};

export const Default = () => <RegistrarPaciente />;
