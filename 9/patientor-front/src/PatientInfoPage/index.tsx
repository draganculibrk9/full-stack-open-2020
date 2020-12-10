import React from "react";
import axios from "axios";
import {addEntry, setPatient, useStateValue} from "../state";
import {Entry, EntryType, Patient} from "../types";
import {apiBaseUrl} from "../constants";
import {Container, Divider, Grid, Header, Icon, Segment, StrictIconProps} from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;

export type EntryFormValues = DistributiveOmit<Entry, 'id'>;

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
                setError(e.response.data.error);
            }
        }
    };

    return (
        <div className="App">
            <Container>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <h2>{patient?.name} <Icon name={icon}/></h2>
                <p>ssn: {patient?.ssn}</p>
                <p>occupation: {patient?.occupation}</p>

                <h3>entries</h3>
                {patient?.entries.map(entry =>
                    <EntryDetails key={entry.id} entry={entry}/>
                )}

                <Divider/>

                <Grid columns={3} divided>
                    <Grid.Column>
                        <Grid.Row>
                            <Header as="h3">Occupational healthcare entry</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <AddEntryForm onSubmit={submitNewEntry} type={EntryType.OccupationalHealthcare}/>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <Header as="h3">Hospital entry</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <AddEntryForm onSubmit={submitNewEntry} type={EntryType.Hospital}/>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <Header as="h3">Health check entry</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <AddEntryForm onSubmit={submitNewEntry} type={EntryType.HealthCheck}/>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
};

export default PatientInfoPage;