import React from 'react';
import {useStateValue} from "../state";
import {EntryFormValues, Props} from "./index";
import {Field, Form, Formik} from "formik";
import {DiagnosisSelection, NumberField, TextField} from "../AddPatientModal/FormField";
import {Button, Grid} from "semantic-ui-react";
import {EntryType, HealthCheckRating} from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const AddEntryForm: React.FC<Props> = ({onSubmit, type}) => {
    const [{diagnoses}] = useStateValue();

    const returnInitialValue: () => EntryFormValues = () => {
        switch (type) {
            case EntryType.HealthCheck:
                return {
                    type: "HealthCheck",
                    description: "",
                    date: "",
                    diagnosisCodes: [],
                    specialist: "",
                    healthCheckRating: HealthCheckRating.Healthy
                };
            case EntryType.Hospital:
                return {
                    type: "Hospital",
                    date: "",
                    description: "",
                    diagnosisCodes: [],
                    specialist: "",
                    discharge: {
                        criteria: "",
                        date: ""
                    }
                };
            case EntryType.OccupationalHealthcare:
                return {
                    type: "OccupationalHealthcare",
                    specialist: "",
                    diagnosisCodes: [],
                    description: "",
                    date: "",
                    employerName: "",
                    sickLeave: {
                        endDate: "",
                        startDate: ""
                    }
                };
        }
    };

    return (
        <Formik
            initialValues={returnInitialValue()}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const malformattedError = "Field is malformatted";
                const errors: { [field: string]: string } = {};

                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (values.date && !Date.parse(values.date)) {
                    errors.date = malformattedError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                switch (values.type) {
                    case "OccupationalHealthcare":
                        if (!values.employerName) {
                            errors.employerName = requiredError;
                        }
                        if (!values.sickLeave?.endDate) {
                            errors['sickLeave.endDate'] = requiredError;
                        }
                        if (values.sickLeave && !Date.parse(values.sickLeave.endDate)) {
                            errors['sickLeave.endDate'] = malformattedError;
                        }
                        if (!values.sickLeave?.startDate) {
                            errors['sickLeave.startDate'] = requiredError;
                        }
                        if (values.sickLeave && !Date.parse(values.sickLeave.startDate)) {
                            errors['sickLeave.startDate'] = malformattedError;
                        }
                        if (values.sickLeave && Date.parse(values.sickLeave.endDate) < Date.parse(values.sickLeave.startDate)) {
                            errors['sickLeave'] = "End date cannot be before start date";
                        }
                        break;
                    case "Hospital":
                        if (!values.discharge?.date) {
                            errors['discharge.date'] = requiredError;
                        }
                        if (values.discharge && !Date.parse(values.discharge.date)) {
                            errors['discharge.date'] = malformattedError;
                        }
                        if (!values.discharge?.criteria) {
                            errors['discharge.criteria'] = requiredError;
                        }
                        break;
                    case "HealthCheck":
                        break;
                    default:
                        assertNever(values);
                }
                return errors;
            }}
        >
            {({isValid, dirty, setFieldValue, setFieldTouched}) => {
                switch (type) {
                    case EntryType.HealthCheck:
                        return (
                            <Form className="form ui">
                                <Field
                                    label="Description"
                                    placeholder="Description"
                                    name="description"
                                    component={TextField}
                                />
                                <Field
                                    label="Date"
                                    placeholder="YYYY-MM-DD"
                                    name="date"
                                    component={TextField}
                                />
                                <Field
                                    label="Specialist"
                                    placeholder="Specialist"
                                    name="specialist"
                                    component={TextField}
                                />
                                <DiagnosisSelection
                                    setFieldValue={setFieldValue}
                                    setFieldTouched={setFieldTouched}
                                    diagnoses={Object.values(diagnoses)}
                                />
                                <Field
                                    label="Health check rating"
                                    name="healthCheckRating"
                                    component={NumberField}
                                    min={0}
                                    max={3}
                                />
                                <Grid>
                                    <Grid.Column floated="right" width={5}>
                                        <Button
                                            type="submit"
                                            floated="right"
                                            color="green"
                                            disabled={!dirty || !isValid}
                                        >
                                            Add
                                        </Button>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                        );
                    case EntryType.Hospital:
                        return (
                            <Form className="form ui">
                                <Field
                                    label="Description"
                                    placeholder="Description"
                                    name="description"
                                    component={TextField}
                                />
                                <Field
                                    label="Date"
                                    placeholder="YYYY-MM-DD"
                                    name="date"
                                    component={TextField}
                                />
                                <Field
                                    label="Specialist"
                                    placeholder="Specialist"
                                    name="specialist"
                                    component={TextField}
                                />
                                <DiagnosisSelection
                                    setFieldValue={setFieldValue}
                                    setFieldTouched={setFieldTouched}
                                    diagnoses={Object.values(diagnoses)}
                                />
                                <Field
                                    label="Discharge criteria"
                                    placeholder="Discharge criteria"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                                <Field
                                    label="Discharge date"
                                    placeholder="YYYY-MM-DD"
                                    name="discharge.date"
                                    component={TextField}
                                />
                                <Grid>
                                    <Grid.Column floated="right" width={5}>
                                        <Button
                                            type="submit"
                                            floated="right"
                                            color="green"
                                            disabled={!dirty || !isValid}
                                        >
                                            Add
                                        </Button>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                        );
                    case EntryType.OccupationalHealthcare:
                        return (
                            <Form className="form ui">
                                <Field
                                    label="Description"
                                    placeholder="Description"
                                    name="description"
                                    component={TextField}
                                />
                                <Field
                                    label="Date"
                                    placeholder="YYYY-MM-DD"
                                    name="date"
                                    component={TextField}
                                />
                                <Field
                                    label="Specialist"
                                    placeholder="Specialist"
                                    name="specialist"
                                    component={TextField}
                                />
                                <DiagnosisSelection
                                    setFieldValue={setFieldValue}
                                    setFieldTouched={setFieldTouched}
                                    diagnoses={Object.values(diagnoses)}
                                />
                                <Field
                                    label="Employer"
                                    placeholder="Employer"
                                    name="employerName"
                                    component={TextField}
                                />
                                <Field
                                    label="Sick leave start date"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.startDate"
                                    component={TextField}
                                />
                                <Field
                                    label="Sick leave end date"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.endDate"
                                    component={TextField}
                                />
                                <Grid>
                                    <Grid.Column floated="right" width={5}>
                                        <Button
                                            type="submit"
                                            floated="right"
                                            color="green"
                                            disabled={!dirty || !isValid}
                                        >
                                            Add
                                        </Button>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                        );
                    default:
                        assertNever(type);
                }
            }}
        </Formik>
    );
};

export default AddEntryForm;