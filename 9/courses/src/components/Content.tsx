import React from 'react';
import {CoursePart} from "../index";
import Part from "./Part";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({courseParts}) => (
    <ul>
        {courseParts.map((coursePart: CoursePart) => <li key={coursePart.name}><Part coursePart={coursePart}/></li>)}
    </ul>
);

export default Content;