import React from 'react';

interface CoursePart {
    name: string;
    exerciseCount: number;
}

const Content: React.FC<{ courseParts: CoursePart[] }> = ({courseParts}) => (
    <ul>
        {courseParts.map((coursePart: CoursePart) => <li
            key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</li>)}
    </ul>
);

export default Content;