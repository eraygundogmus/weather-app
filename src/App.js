import React , { Component } from 'react';
import './components/App.css';
import SearchInput from "./components/SearchInput";
import Header from "./components/Header";

class App extends Component {
 

   
    render() { 
  return (
    <div className="App">
      <Header />
      <SearchInput />
    </div>
  );
}
}

export default App;
