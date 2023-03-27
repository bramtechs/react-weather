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

        getWeatherFromLocation(this.state.location)
            .catch((err) => {
                this.setState({
                    error: err,
                });
                console.error("An error occured!", err);
            })
            .then((result) => this.setState({ weather: result }));
    };

    onFormElemChange = (event) => {
        // if input box is empty, clear current weather info
        if (event.target.value.length === 0) {
            this.setState({
                weather: null,
                error: null,
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
                <p style={{ color: "hotpink" }}>{this.state.error}</p>
                <div className="today">
                    <p>Work in progress if you couldn't tell.</p>
                    <p>{JSON.stringify(this.state.weather)}</p>
                    <WeatherTile />
                </div>
            </main>
        );
    };

    render() {
        return (
            <div className="weather">
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor="location">Weather location</label>
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

class WeatherTile extends Component {
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
