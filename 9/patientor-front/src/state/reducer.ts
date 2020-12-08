import {State} from "./state";
import {Diagnosis, Entry, Patient} from "../types";

export type Action =
    | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
}
    | {
    type: "ADD_PATIENT";
    payload: Patient;
}
    | {
    type: "SET_PATIENT";
    payload: Patient;
}
    | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
}
    | {
    type: "ADD_ENTRY";
    payload: Entry;
    id: string;
};

export const setPatientList = (patientList: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: patientList
    };
};

export const addPatient = (patient: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patient
    };
};

export const addEntry = (id: string, entry: Entry): Action => {
    return {
        type: "ADD_ENTRY",
        payload: entry,
        id
    };
};

export const setPatient = (patient: Patient): Action => {
    return {
        type: "SET_PATIENT",
        payload: patient
    };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
    return {
        type: "SET_DIAGNOSES",
        payload: diagnoses
    };
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({...memo, [patient.id]: patient}),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "SET_PATIENT":
            return {
                ...state,
                patient: action.payload
            };
        case "SET_DIAGNOSES":
            return {
                ...state,
                diagnoses: action.payload
            };
        case "ADD_ENTRY":
            const newPatient: Patient = {
                ...state.patient as Patient,
                entries: [...state.patient?.entries, action.payload]
            };

            const newPatients: { [id: string]: Patient } = {
                ...state.patients,
                [action.id]: newPatient
            };

            return {
                ...state,
                patient: newPatient,
                patients: newPatients
            };
        default:
            return state;
    }
};
