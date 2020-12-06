import React from "react";
import axios from "axios";
import {setPatient, useStateValue} from "../state";
import {Patient} from "../types";
import {apiBaseUrl} from "../constants";
import {Container, Icon, StrictIconProps} from "semantic-ui-react";

const PatientInfoPage: React.FC<{ id: string }> = ({id}) => {
    const [{patient}, dispatch] = useStateValue();

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

    return (
        <div className="App">
            <Container>
                <h2>{patient?.name} <Icon name={icon}/></h2>
                <p>ssn: {patient?.ssn}</p>
                <p>occupation: {patient?.occupation}</p>
            </Container>
        </div>
    );
};

export default PatientInfoPage;