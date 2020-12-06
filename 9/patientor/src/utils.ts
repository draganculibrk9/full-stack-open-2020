import {Gender, PatientWithoutId} from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const toPatientWithoutId = (object: any): PatientWithoutId => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };
};

const parseString = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing string: ${text as string}`);
    }
    return text;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date as string}`);
    }

    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender as string}`);
    }
    return gender;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};