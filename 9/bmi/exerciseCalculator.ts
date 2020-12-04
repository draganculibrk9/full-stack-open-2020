interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

type RatingDescription = 'bad' | 'could be better' | 'excellent';

interface ExerciseCalculatorInput {
    target: number;
    dailyHours: number[];
}

const parseExerciseCalculatorArguments = (args: string[]): ExerciseCalculatorInput => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map(h => Number(h));

    if (isNaN(target) || !dailyHours.every(h => !isNaN(h))) {
        throw new Error('Provided values were not numbers!');
    } else if (target < 0 || !dailyHours.every(h => h >= 0)) {
        throw new Error('Provided values must be greater than zero or zero!');
    }

    return {
        target,
        dailyHours
    };
};

const calculateRating = (dailyHours: number[], target: number): number => {
    const ratio = dailyHours.filter(h => h >= target).length / dailyHours.length;

    if (ratio <= 0.33) {
        return 1;
    } else if (ratio > 0.33 && ratio <= 0.66) {
        return 2;
    } else {
        return 3;
    }
};

const getRatingDescription = (rating: number): RatingDescription => {
    switch (rating) {
        case 1:
            return 'bad';
        case 2:
            return 'could be better';
        default:
            return 'excellent';
    }
};

const calculateExercises = (exerciseCalculatorInput: ExerciseCalculatorInput): Result => {
    const dailyHours = exerciseCalculatorInput.dailyHours;
    const target = exerciseCalculatorInput.target;

    const rating = calculateRating(dailyHours, target);
    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(h => h > 0).length,
        success: dailyHours.every(h => h >= target),
        rating,
        ratingDescription: getRatingDescription(rating),
        target,
        average: dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length
    };
};

try {
    console.log(calculateExercises(parseExerciseCalculatorArguments(process.argv)));
} catch (e) {
    if (e instanceof Error) {
        console.log('Error: ', e.message);
    }
}