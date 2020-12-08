export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

type SickLeave = {
    startDate: string;
    endDate: string;
};

interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

type Discharge = {
    date: string;
    criteria: string;
};

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type PatientWithoutSSN = Omit<Patient, 'ssn' | 'entries'>;
export type PatientWithoutId = Omit<Patient, 'id'>;