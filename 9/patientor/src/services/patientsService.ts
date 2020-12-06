import patients from '../../data/patients';
import {Patient, PatientWithoutId, PatientWithoutSSN} from '../types';
import {v4} from 'uuid';

const getPatients = (): PatientWithoutSSN[] => patients.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    };
});

const addPatient = (patient: PatientWithoutId): Patient => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: v4(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient => {
    const patient: Patient | undefined = patients.find(p => p.id === id);

    if (patient === undefined) {
        throw new Error(`Cannot find patient with it ${id}`);
    }
    return patient;
};

export default {
    getPatients,
    addPatient,
    getPatient
};