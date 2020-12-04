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

export const calculateExercises = (exerciseCalculatorInput: ExerciseCalculatorInput): Result => {
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