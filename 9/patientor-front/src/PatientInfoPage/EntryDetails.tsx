import React from 'react';
import {Entry, HealthCheckRating} from "../types";
import {Container, Header, Icon, Segment, StrictIconProps} from "semantic-ui-react";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const mapHealthCheckRatingToColor = (healthCheckRating: HealthCheckRating): StrictIconProps['color'] => {
    switch (healthCheckRating) {
        case HealthCheckRating.Healthy:
            return "green";
        case HealthCheckRating.LowRisk:
            return "yellow";
        case HealthCheckRating.HighRisk:
            return "orange";
        default:
            return "red";
    }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
    const margin = {
        marginBottom: '1%'
    };

    switch (entry.type) {
        case "Hospital":
            return (
                <Container style={margin}>
                    <Segment padded>
                        <Header as='h3'>
                            {entry.date}
                            <Icon name='hospital' size='big'/>
                        </Header>
                        <i>{entry.description}</i>
                        <Header as='h3'>
                            {entry.discharge.date}
                            <Header.Subheader><i>{entry.discharge.criteria}</i></Header.Subheader>
                        </Header>
                    </Segment>
                </Container>
            );
        case "OccupationalHealthcare":
            return (
                <Container style={margin}>
                    <Segment padded>
                        <Header as='h3'>
                            {entry.date}
                            <Icon name='stethoscope' size='big'/>
                            {entry.employerName}
                        </Header>
                        <i>{entry.description}</i>
                    </Segment>
                </Container>
            );
        case "HealthCheck":
            return (
                <Container style={margin}>
                    <Segment padded>
                        <Header as='h3'>
                            {entry.date}
                            <Icon name='doctor' size='big'/>
                        </Header>
                        <i>{entry.description}</i>
                        <br/>
                        <Icon name='heart' color={mapHealthCheckRatingToColor(entry.healthCheckRating)}/>
                    </Segment>
                </Container>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;