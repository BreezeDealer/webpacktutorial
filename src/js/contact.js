import React from 'react'; 
import ReactDOM from 'react-dom'; 

function BoilingVerdict(props) {
    if(props.celsius >= 100){
        return <p className="alert alert-success">水会烧开</p>
    }
    return <p className="alert alert-danger">水不会烧开</p>
}
function toCelsius(f) {
    return (f - 32) * 5 / 9;
}
function toFahrenheit(c){
    return (c * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
const scalesName = {
    c: "摄氏度",
    f: "华氏度"
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = e => {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <div className="container col-md-4">
                <fieldset>
                    <legend>输入一个{scalesName[scale]}</legend>
                    <input 
                        className="form-control"
                        value={temperature}
                        onChange={this.handleChange} />
                </fieldset>
            </div>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange = (temperature) => {
        this.setState({
            scale: 'f',
            temperature
        })
    }

    handleFahrenheitChange = (temperature) => {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.state.scale;
        const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div className="container">
                <div className="row">
                    <TemperatureInput 
                        temperature={celsius}
                        onTemperatureChange={this.handleFahrenheitChange}
                        scale="c" />
                    <TemperatureInput 
                        temperature={fahrenheit}
                        onTemperatureChange={this.handleCelsiusChange}
                        scale="f" />   
                </div> 
                {
                    temperature && <BoilingVerdict celsius={parseFloat(celsius)} />
                }            
            </div>
        )
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById("root")
)