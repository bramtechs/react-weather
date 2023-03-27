import { Component } from "react";
import getWeatherFromLocation from "./api/WeatherApi";
import "./App.css";

class WeatherApp extends Component {
    state = {
        weather: null,
    };

    onLocationInput = (event) => {
        this.setState({
            query: event.target.value,
            weather: null,
        });
    };

    render() {
        return (
            <div className="weather">
                <form>
                    <label for="location">Weather location</label>
                    <input onChange={this.onLocationInput} id="location"></input>
                </form>
                <header>
                    <h2>Showing weather for {this.state.query}</h2>
                </header>
                <div class="today">
                    <TodayHourTile />
                </div>
            </div>
        );
    }
}

class TodayHourTile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wtile">
                <p>Put weather info here</p>
            </div>
        );
    }
}

function App() {
    return (
        <div className="App">
            <WeatherApp />
        </div>
    );
}

export default App;
