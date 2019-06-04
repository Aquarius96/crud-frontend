import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    model: {
      firstName: "",
      lastName: "",
      gender: "",
      age: ""
    },
    persons: null
  };
  componentDidMount = () => {
    this.getPersons();
  };

  getPersons = () => {
    console.log('tak');
    axios.get("https://localhost:5001/api/person").then(response => {
      this.setState({ persons: response.data });
    });
  };

  addPerson = e => {
    e.preventDefault();
    axios
      .post("https://localhost:5001/api/person", this.state.model)
      .then(() => {
        var persons = [...this.state.persons, this.state.model];
        this.setState({
          model: {
            firstName: "",
            lastName: "",
            gender: "",
            age: ""
          },
          persons: persons
        });
      })
      .catch(error => {
        window.alert("Wystąpił błąd podczas dodawania.\n" + error);
      });
  };

  deletePerson = id => {
    axios.delete("https://localhost:5001/api/person/" + id)
      .then(() => {
        var persons = this.state.persons.filter(person => {
          return person.id !== id;
        });
        this.setState({persons: persons})
      })
  }

  handleModelChange = e => {
    var model = this.state.model;
    const { name, value } = e.target;
    model[name] = value;
    this.setState({
      model: Object.assign(this.state.model, model)
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onChange={this.handleModelChange} onSubmit={this.addPerson}>
            <input name="firstName" placeholder="Wpisz imię..." value={this.state.model.firstName}/>
            <input name="lastName" placeholder="Wpisz nazwisko..." value={this.state.model.lastName}/>
            <input name="gender" placeholder="Wpisz płeć..." value={this.state.model.gender}/>
            <input name="age" placeholder="Wpisz wiek..." value={this.state.model.age}/>
            <button type="submit">Dodaj osobę</button>
          </form>
          <div>
            {this.state.persons &&
              this.state.persons.map(person => {
                return (
                  <p>
                    {person.firstName} {person.lastName} {person.gender}{" "}
                    {person.age} <button onClick={() => this.deletePerson(person.id)}>Usuń</button>
                  </p>
                );
              })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
