import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    const parts = [];

    for (const part of props.parts) {
        parts.push(
            <Part name={part.name} exercises={part.exercises}/>
        )
    }

    return (
        <div>
            {parts}
        </div>
    )
}

const Total = (props) => {
    let total = 0;

    for (const part of props.parts) {
        total += part.exercises;
    }

    return (
        <p>Number of exercises {total}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
