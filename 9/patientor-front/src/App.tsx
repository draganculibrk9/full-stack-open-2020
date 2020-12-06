import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import {setPatientList, useStateValue} from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfoPage from "./PatientInfoPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  const match = useRouteMatch<{id: string}>('/patients/:id');
  const id = match ? match.params.id : null;

  return (
    <div className="App">
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => id && <PatientInfoPage id={id} />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
    </div>
  );
};

export default App;
