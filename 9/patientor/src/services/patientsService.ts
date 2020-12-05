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

export default {
    getPatients,
    addPatient
};