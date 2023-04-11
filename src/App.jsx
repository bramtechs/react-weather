import { Component } from "react";
import getWeatherFromLocation from "./api/WeatherApi";
import "./App.css";

class WeatherLoadingIcon extends Component {
    constructor(props) {
        super(props);
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
    };

    setState(state) {
        super.setState(state);
        console.warn("Changed state to", state);
    }

    async searchWeather(location) {
        const data = await getWeatherFromLocation(location);
        this.setState({
            data: data,
        });
    };

    onFormElemChange(event) {
        // if input box is empty, clear current weather info
        if (event.target.value.length === 0) {
            this.clear();
            return;
        }

        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    requestGPS(event) {
        console.log("TODO: add request for gps location");
    };

    onFormSubmit(event) {
        event.preventDefault();
        this.searchWeather(this.state.location);
    };

    render() {
        const weather = this.state.data ? this.state.data.weather : null;
        const error = this.state.data ? this.state.data.error : null;
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
