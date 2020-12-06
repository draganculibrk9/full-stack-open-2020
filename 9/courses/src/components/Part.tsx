import React from 'react';
import {CoursePart} from "../index";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<{ coursePart: CoursePart }> = ({coursePart}) => {
    switch (coursePart.name) {
        case "Fundamentals":
            return (
                <div>
                    {coursePart.name} {coursePart.description} {coursePart.exerciseCount}
                </div>
            );
        case "Using props to pass data":
            return (
                <div>
                    {coursePart.name} {coursePart.groupProjectCount} {coursePart.exerciseCount}
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    {coursePart.name} {coursePart.description} {coursePart.exerciseSubmissionLink} {coursePart.exerciseCount}
                </div>
            );
        case "New course":
            return (
                <div>
                    {coursePart.name} {coursePart.description} {coursePart.exerciseCount}
                </div>
            );
        default:
            return assertNever(coursePart);
    }
}

export default Part;