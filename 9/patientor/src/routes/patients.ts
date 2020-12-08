import express from 'express';
import patientsService from '../services/patientsService';
import {toEntryWithoutId, toPatientWithoutId} from "../utils";
import {Entry, EntryWithoutId, Patient, PatientWithoutId} from "../types";

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
        if (e instanceof Error) {
            res.status(400)
                .json({
                    error: e.message
                });
        }
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

router.post('/:id/entries', (req, res) => {
    try {
        const id: string = req.params.id;
        const entryWithoutId: EntryWithoutId = toEntryWithoutId(req.body);
        const newEntry: Entry = patientsService.addEntry(id, entryWithoutId);

        res.json(newEntry);
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.includes('find')) {
                res.status(404)
                    .json({
                            error: e.message
                        }
                    );
            } else {
                res.status(400)
                    .json({
                        error: e.message
                    });
            }
        }
    }
});

export default router;