import express from 'express';
import patientsService from '../services/patientsService';
import {toPatientWithoutId} from "../utils";
import {Patient, PatientWithoutId} from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const data: PatientWithoutId = toPatientWithoutId(req.body);
        const newPatient = patientsService.addPatient(data);

        res.json(newPatient);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/:id', (req, res) => {
    try {
        const id: string = req.params.id;
        const patient: Patient = patientsService.getPatient(id);
        res.json(patient);
    } catch (e) {
        if (e instanceof Error) {
            res.send(404)
                .json({
                    error: e.message
                });
        }
    }
});

export default router;