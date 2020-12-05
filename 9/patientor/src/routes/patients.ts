import express from 'express';
import patientsService from '../services/patientsService';
import {toPatientWithoutId} from "../utils";
import {PatientWithoutId} from "../types";

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

export default router;