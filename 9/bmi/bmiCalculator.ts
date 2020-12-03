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

const calculateBMI = (height: number, weight: number): Category => {
    const bmi = weight / Math.pow((height / 100), 2);

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

console.log(calculateBMI(180, 74))