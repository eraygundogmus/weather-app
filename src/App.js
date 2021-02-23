import React , { Component } from 'react'
import './App.css';
import SearchInput from "./SearchInput"


class App extends Component {

/*     const getData = () => {
      Axios.get("http://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=a86544f87f2e8985f9f3beaa312bb7bc").then((response) => {
        console.log(response);
      });

    }; */
    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
          function(position) {
          console.log(position.coords)
      },  function(error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      )}
      
    render() { 
  return (
    <div className="App">
      <h1> I am creating a weather app</h1>
      <SearchInput />
    </div>
  );
}
}

export default App;
