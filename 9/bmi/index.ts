import express from 'express';
import {calculateBMI} from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        res.status(400)
            .json({
                error: "malformated parameters"
            });
    }

    const value = calculateBMI({height, weight});

    res.json({
        weight,
        height,
        bmi: value
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});