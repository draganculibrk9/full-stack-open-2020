import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({action, text}) =>
    (
        <button onClick={action}>
            {text}
        </button>
    )

const Statistic = ({text, value}) =>
    (
        <tr>
            <td>
                {text}
            </td>
            <td>
                {value}
            </td>
        </tr>
    )

const Statistics = ({good, neutral, bad}) => {
    const all = good + bad + neutral;

    if (all !== 0) {
        const average = (good - bad) / all;
        const positive = good / all * 100;

        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tbody>
                    <Statistic text={'good'} value={good}/>
                    <Statistic text={'neutral'} value={neutral}/>
                    <Statistic text={'bad'} value={bad}/>
                    <Statistic text={'all'} value={all}/>
                    <Statistic text={'average'} value={average}/>
                    <Statistic text={'positive'} value={positive + ' %'}/>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <p>No feedback given</p>
        )
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <span>
                <Button action={() => setGood(good + 1)} text={'good'}/>
                <Button action={() => setNeutral(neutral + 1)} text={'neutral'}/>
                <Button action={() => setBad(bad + 1)} text={'bad'}/>
            </span>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)
