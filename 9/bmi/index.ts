import express, {Request, Response} from 'express';
import {calculateBMI} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        return res.status(400)
            .json({
                error: "malformated parameters"
            });
    }

    const value = calculateBMI({height, weight});

    return res.json({
        weight,
        height,
        bmi: value
    });
});

app.post('/exercises', (req: Request, res: Response) => {
    const exerciseInput: Record<string, unknown> = req.body as Record<string, unknown>;

    if (exerciseInput.target === undefined || exerciseInput.target === null || !exerciseInput.daily_exercises) {
        return res.status(400)
            .json({
                error: 'Parameters missing'
            });
    }

    const target = Number(exerciseInput.target);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const daily_exercises = (exerciseInput.daily_exercises as []).map((d: any) => Number(d));

    if (isNaN(target) || target < 0 || !daily_exercises.every((d: number) => !isNaN(d) && d >= 0)) {
        return res.status(400)
            .json({
                error: 'Malformatted parameters'
            });
    }

    return res.json(calculateExercises({
        dailyHours: daily_exercises,
        target
    }));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});