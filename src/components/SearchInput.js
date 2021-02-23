import React from 'react';
import axios from 'axios';
import './SearchInput.css'


    class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            initialLat: 'unknown',
            initialLong: 'unknown',
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
        console.log(this.state.value)
        axios
         .post(url)
         .then((res) => {
             console.log(res)
         })
         .catch((err) => {
             console.log(err)
         })}


    componentDidMount() {
            navigator.geolocation.getCurrentPosition(       
              (position) => {
                  console.log(position)
              const initialLat = JSON.stringify(position.coords.latitude);
              this.setState( {initialLat} );
              const initialLong = JSON.stringify(position.coords.longitude);
              this.setState({initialLong})
              console.log(initialLat,initialLong)
              const API_KEY = "a86544f87f2e8985f9f3beaa312bb7bc"
              const circle_uri = "https://api.openweathermap.org/data/2.5/find?lat=" + this.state.initialLat + "&lon=" + this.state.initialLong + "&cnt=10&appid=" + API_KEY
            
              axios
            .post(circle_uri)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
            console.log(err)
            })
            },  function(error) {
              console.error("Error Code = " + error.code + " - " + error.message);
            })
    }

    render() {
        return (
            <div className="search__component">
                <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="Enter city name" value={this.state.value}  onChange={this.changeHandler}></input>
                        <div> {this.state.initialLat} {this.state.initialLong}</div>
                        <button type="submit" value="search">Search </button>
                </form>
            </div>
        )
    }
}




export default SearchInput
