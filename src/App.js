import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  state = {persons: null};
  componentDidMount = () => {
    this.getPersons();
  }

  getPersons = () => {
    axios.get('https://localhost:5001/api/person')
      .then(response => {
        this.setState({persons: response.data});
        console.log(response.data);
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        {this.state.persons && this.state.persons.map(person => {
          return <p>{person.firstName} {person.lastName} {person.gender} {person.age} <button>Usuń</button></p>
        })}
        </header>
      </div>
    );
  }  
}

export default App;
