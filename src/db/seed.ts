import chance from 'chance';

import { Story, Appointment, AppointmentStatusEnum, Patient } from '../types';
import generateKeywords from './utils/tokenizePatientData';

export interface SeedStory extends Story {
    appointments: Appointment[];
}

const generatePatient = (): Patient => ({
    name: chance().name({ middle: true }),
    country: chance().country({ full: true }),
    id: chance().fbid(),
    birthday: chance().birthday({ string: true, american: false }) as string,
    phone: chance().phone(),
    email: chance().email(),
    gender: chance().pickone(['Masculino', 'Femenino', 'Otro']),
    address: chance().address(),
    maritalStatus: chance().pickone(['Soltero', 'Casado', 'Divorciado', 'Viudo']),
    job: chance().profession(),
});

const generateAppointment = (): Appointment => {
    const diagnosis = chance().bool({ likelihood: 70 }) && chance().sentence();
    const thisYear = new Date().getFullYear();

    const appointment: Appointment = {
        $key: 'fake',
        $path: 'fake',
        status: diagnosis
            ? AppointmentStatusEnum.closed
            : chance().pickone([
                  AppointmentStatusEnum.cancelled,
                  AppointmentStatusEnum.open,
                  AppointmentStatusEnum.pending,
                  AppointmentStatusEnum.waiting,
              ]),
        date: chance().date({ string: true, american: false, year: thisYear }) as string,
        time: `${String(chance().integer({ min: 9, max: 17 })).padStart(2, '0')}:${chance().pickone(['00', '30'])}`,
    };

    if (diagnosis) {
        appointment.diagnosis = diagnosis;
    }

    return appointment;
};

export const generateSeed = (appointmentsCount = 10): SeedStory => {
    const patient = generatePatient();
    const appointments = Array.from({ length: appointmentsCount }).map(() => generateAppointment());

    return {
        $key: 'fake',
        $path: 'fake',
        keywords: generateKeywords(patient),
        patient,
        appointments,
    };
};
