import React from 'react';
import axios from 'axios';


    class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        };

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
         .post(url).then((res) => {
             console.log(res)
         }).catch((err) => {
             console.log(err)
         })
        }





    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label>
                <input type="text" placeholder="search for weather" value={this.state.value}  onChange={this.changeHandler}></input>
                    </label>
                <input type="submit" value="search" />
                </form>
                
            </div>
        )
    }
}




export default SearchInput
