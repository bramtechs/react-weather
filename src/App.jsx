import { Component } from "react";
import getWeatherFromLocation from "./api/WeatherApi";
import "./App.css";

class WeatherApp extends Component {
    state = {
        weather: null,
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.setState({
            weather: {},
        });
    };

    onFormElemChange = (event) => {
        // if input box is empty, clear current weather info
        if (event.target.value.length === 0) {
            this.setState({
                weather: null,
            });
            console.log("Cleared weather");
            return;
        }

        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    requestGPS = (event) => {
        console.log("TODO: add request for gps location");
    };

    WeatherInfo = () => {
        return this.state.weather === null ? (
            <p>...</p>
        ) : (
            <main>
                <header>
                    <h2>Showing weather info for {this.state.location}</h2>
                </header>
                <div className="today">
                    <TodayHourTile />
                </div>
            </main>
        );
    };

    render() {
        return (
            <div className="weather">
                <form onSubmit={this.onFormSubmit}>
                    <label for="location">Weather location</label>
                    <input onChange={this.onFormElemChange} id="location"></input>
                    <button disabled onClick={this.requestGPS}>
                        Use device location
                    </button>
                    <input type="submit" value="Submit"></input>
                </form>
                <this.WeatherInfo />
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
