import chance from 'chance';

import { Story, Appointment, AppointmentStatusEnum, Patient } from '../types';
import generateKeywords from './utils/tokenizePatientData';

export interface SeedStory extends Story {
    appointments: Appointment[];
}

const getRamdomTimestamp = () => {
    const thisYear = new Date().getFullYear();
    const date = chance().date({ year: thisYear }) as Date;
    const [hours, minutes] = [
        String(chance().integer({ min: 9, max: 17 })).padStart(2, '0'),
        chance().pickone(['00', '30']),
    ];

    const dateString = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(
        2,
        '0',
    )}/${date.getFullYear()}`;
    const time = `${hours}:${minutes}`;
    const timestamp = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number.parseInt(hours),
        Number.parseInt(minutes),
    ).getTime();

    return { date: dateString, time, timestamp };
};

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

const generateAppointment = (patient: Patient): Appointment => {
    const diagnosis = chance().bool({ likelihood: 70 }) && chance().sentence();
    const { date, time, timestamp } = getRamdomTimestamp();

    const appointment: Appointment = {
        $key: 'fake',
        $path: 'fake',
        name: patient.name,
        status: diagnosis
            ? AppointmentStatusEnum.closed
            : chance().pickone([
                  AppointmentStatusEnum.cancelled,
                  AppointmentStatusEnum.open,
                  AppointmentStatusEnum.pending,
                  AppointmentStatusEnum.waiting,
              ]),
        date,
        time,
        timestamp,
    };

    if (diagnosis) {
        appointment.diagnosis = diagnosis;
    }

    return appointment;
};

export const generateSeed = (appointmentsCount = 10): SeedStory => {
    const patient = generatePatient();
    const appointments = Array.from({ length: appointmentsCount }).map(() => generateAppointment(patient));

    return {
        $key: 'fake',
        $path: 'fake',
        keywords: generateKeywords(patient),
        patient,
        appointments,
    };
};
