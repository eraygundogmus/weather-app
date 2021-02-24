import React from 'react';
import axios from 'axios';
import './Body.scss'


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)                 
}

class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            initialLat: 'Your location is',
            initialLong: 'unknown',
            data: [],
            searchdata: {},
            name: 'Search your city',
            clouds: '0',
            description: '', 
            temp: '273.1',
            feels: '273.1',
            tempmax: '273.1',
            tempmin: '273.1',
            turkey: ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
            'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
            'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
            'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir',
            'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
            'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
            'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
            'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
            'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce']
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }  

    changeHandler(event) {
        this.setState({ value: event.target.value });   
    }

    submitHandler(event) {
        const API_KEY = "a86544f87f2e8985f9f3beaa312bb7bc"
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.state.value + "&appid=" + API_KEY

        event.preventDefault();

        axios
         .post(url)
         .then((res) => {
             const searchdata = res.data
             this.setState({ searchdata })
             const clouds = searchdata.clouds.all
             this.setState({ clouds })
             const name = searchdata.name
             this.setState({ name })
             const description = searchdata.weather[0].description
             this.setState({ description })
             const temp = searchdata.main.temp
             this.setState({ temp })
             const feels = searchdata.main.feels_like
             this.setState({ feels })
             const tempmax = searchdata.main.temp_max
             this.setState({ tempmax })
             const tempmin = searchdata.main.temp_min
             this.setState({ tempmin })
         })
         .catch((err) => {
             console.log(err)
         })}

    componentDidMount() {       
        const options = {
            enableHighAccuracy: true,
            maximumAge: true 
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const initialLat = JSON.stringify(position.coords.latitude);
            this.setState( {initialLat} );
            const initialLong = JSON.stringify(position.coords.longitude);
            this.setState({initialLong})
            console.log('Coordinats', initialLat,initialLong)
            const API_KEY = "a86544f87f2e8985f9f3beaa312bb7bc"
            const circle_uri = "https://api.openweathermap.org/data/2.5/find?lat=" + this.state.initialLat + "&lon=" + this.state.initialLong + "&cnt=10&appid=" + API_KEY
                            
            axios
            .post(circle_uri)
            .then((res) => {
                const data = res.data.list
            this.setState({ data })
            })
            .catch((err) => {
            console.log(err)
                 /* code */
            })
            },
            function(error) {
            console.error("Error Code = " + error.code + " - " + error.message);
            alert("You need to give us permission to use your location. We use your location only for displaying weather. If you reject to share your location, app will chose a random location for you.")
            },(options))
        }
 
    render() {
        return (
            <div className="search__component">
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="Enter city name" value={this.state.value}  onChange={this.changeHandler}></input>
                        {/* <div> {this.state.initialLat} {this.state.initialLong}</div> */}
                        <button type="submit" value="search">Search </button>
                     </form>
                </div>
                <div className="search_result">
                    <div className="search__cities">
                            <h3>{capitalize(this.state.name)}</h3> 
                            <p>  <br />
                                Cloud : {this.state.clouds}% <br />
                                Status : {capitalize(this.state.description)} <br />
                                Temp : {parseFloat(((this.state.temp) - 273.15).toFixed(1))}&#176; <br /> 
                                Feels Like : {parseFloat(((this.state.feels) - 273.15).toFixed(1))}&#176; <br /> 
                                Max Temp : {parseFloat(((this.state.tempmax) - 273.15).toFixed(1))}&#176; <br />
                                Min Temp : {parseFloat(((this.state.tempmin) - 273.15).toFixed(1))}&#176; <br />
                            </p>
                        </div>
                    </div>
                    <div className="location__block"> <h1> Nearbies</h1>
                        {this.state.data.map((weather) => (
                            <div className="location__cities">
                            <h6 classname="p_title"> {capitalize(weather.name)} </h6>
                            <p> Cloud : {weather.clouds.all}% <br />
                                Status : {capitalize(weather.weather[0].description)} <br />
                                Temp : {parseFloat(((weather.main.temp) - 273.15).toFixed(1))}&#176; <br /> 
                                Feels Like : {parseFloat(((weather.main.feels_like) - 273.15).toFixed(1))}&#176; <br /> 
                                Max Temp : {parseFloat(((weather.main.temp_max) - 273.15).toFixed(1))}&#176; <br />
                                Min Temp : {parseFloat(((weather.main.temp_min) - 273.15).toFixed(1))}&#176; <br />
                            </p>
                            </div>
                            ))}
                    </div>      
            </div>
    )}}

export default SearchInput
