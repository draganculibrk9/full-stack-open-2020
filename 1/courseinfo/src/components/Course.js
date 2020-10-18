import React from 'react';

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

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
        <p>
            <b>
                total of {total} exercises
            </b>
        </p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course