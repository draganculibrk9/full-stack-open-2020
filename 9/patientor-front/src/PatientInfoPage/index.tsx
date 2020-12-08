import React from "react";
import axios from "axios";
import {addEntry, setPatient, useStateValue} from "../state";
import {Entry, EntryType, Patient} from "../types";
import {apiBaseUrl} from "../constants";
import {Container, Icon, StrictIconProps} from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import {NumberField} from "../AddPatientModal/FormField";
import {Field} from "formik";

type EntryFormValues = Omit<Entry, 'id'>;

export interface Props {
    onSubmit: (values: EntryFormValues) => void;
    type: EntryType;
}

const PatientInfoPage: React.FC<{ id: string }> = ({id}) => {
    const [{patient}, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();

    React.useEffect(() => {
        const fetchPatient = async (id: string) => {
            try {
                const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patient));
            } catch (e) {
                console.error(e);
            }
        };
        if (patient === undefined || patient.id !== id) {
            fetchPatient(id);
        }
    }, [dispatch, patient, id]);

    const icon: StrictIconProps["name"] = patient?.gender === "male" ? "mars" : "venus";

    const submitNewEntry = async (values: EntryFormValues) => {
        if (patient) {
            try {
                const {data: entry} = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${patient.id}/entries`,
                    values
                );
                dispatch(addEntry(patient.id, entry));
            } catch (e) {
                console.error(e.response.data);
                setError(e.response.data.error);
            }
        }
    };

    return (
        <div className="App">
            <Container>
                <h2>{patient?.name} <Icon name={icon}/></h2>
                <p>ssn: {patient?.ssn}</p>
                <p>occupation: {patient?.occupation}</p>

                <h3>entries</h3>
                {patient?.entries.map(entry =>
                    <EntryDetails key={entry.id} entry={entry}/>
                )}
                <Field label="Entry type" name="entryType" component={NumberField} min={0} max={2}/> // try to add select for type and render form accordingly
                <AddEntryForm onSubmit={submitNewEntry} type={}/>
            </Container>
        </div>
    );
};

export default PatientInfoPage;