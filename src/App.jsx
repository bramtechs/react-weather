import { Component } from "react";
import getWeatherFromLocation from "./api/WeatherApi";
import "./App.css";

class WeatherForm extends Component {
    constructor(props) {
        super(props);
    }

    onElemChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    render() {
        return (
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    this.props.onFormSubmit(this.state);
                }}
            >
                <label htmlFor="location">Weather location</label>
                <input onChange={this.onElemChange} id="location"></input>
                <button disabled onClick={this.requestGPS}>
                    Use device location
                </button>
                <input type="submit" value="Submit"></input>
            </form>
        );
    }
}

class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        this.clear();
        this.searchWeather("Bruges");
    };

    clear() {
        this.setState({
            data: null,
        });
        console.debug("Cleared weather");
    }

    async searchWeather(location) {
        const data = await getWeatherFromLocation(location);
        this.setState({
            data: data,
        });
    }

    requestGPS(event) {
        console.log("TODO: add request for gps location");
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.searchWeather(this.state.location);
    }

    render() {
        const weather = this.state.data ? this.state.data.weather: null;
        const error = this.state.data ? this.state.data.error : null;
        console.log(weather);
        return (
            <div className="weather">
                <WeatherForm onFormSubmit={(form) => this.searchWeather(form.location)}></WeatherForm>
                {error ? (
                    <div>
                        <p style={{ color: "hotpink" }}>{error}</p>
                    </div>
                ) : (
                    <div></div>
                )}
                {weather ? (
                    <main>
                        <header>
                            <h2>Showing weather info for {weather.name}</h2>
                        </header>
                        <div className="today">
                            <p>Work in progress if you couldn't tell.</p>
                            <p>{weather.main.temp}</p>
                        </div>
                    </main>
                ) : (
                    <p>...</p>
                )}
            </div>
        );
    }
}

class LiveWeatherInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("w", this.props.info);
        const info = this.props.info;
        console.log(info);
        return info === null ? (
            <div></div>
        ) : (
            <div className="wlive">
                <h2>Live weather info</h2>
                <p>{info.main.temp}</p>
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
