type Category = 'Very severely underweight' |
    'Severely underweight' |
    'Underweight' |
    'Normal (healthy weight)' |
    'Overweight' |
    'Obese Class I (Moderately obese)' |
    'Obese Class II (Severely obese)' |
    'Obese Class III (Very severely obese)';

const between = (x: number, bottom: number, top: number): boolean => {
    return x > bottom && x <= top;
}

interface BmiInput {
    height: number;
    weight: number;
}

const parseBmiCalculatorArguments = (args: string[]): BmiInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values were not numbers!');
    } else if (height <= 0 || weight <= 0) {
        throw new Error('Provided values must be greater than zero!');
    }

    return {
        height,
        weight
    }
}

const calculateBMI = (bmiInput: BmiInput): Category => {
    const bmi = bmiInput.weight / Math.pow((bmiInput.height / 100), 2);

    if (between(bmi, 0, 15)) {
        return 'Very severely underweight';
    } else if (between(bmi, 15, 16)) {
        return 'Severely underweight';
    } else if (between(bmi, 16, 18.5)) {
        return 'Underweight';
    } else if (between(bmi, 18.5, 25)) {
        return 'Normal (healthy weight)';
    } else if (between(bmi, 25, 30)) {
        return 'Overweight';
    } else if (between(bmi, 30, 35)) {
        return 'Obese Class I (Moderately obese)';
    } else if (between(bmi, 35, 40)) {
        return 'Obese Class II (Severely obese)';
    } else {
        return 'Obese Class III (Very severely obese)';
    }
}

try {
    console.log(calculateBMI(parseBmiCalculatorArguments(process.argv)));
} catch (e) {
    console.log('Error: ', e.message);
}