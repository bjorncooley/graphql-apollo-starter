import React, { Component } from "react";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import logo from "./logo.svg";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  state = {
    helloWorld: "Waiting...",
    userData: null
  };

  componentDidMount() {
    this.fireHelloWorldQuery();
    this.fireGetUserQuery();
  }

  fireHelloWorldQuery = async () => {
    const response = await client.query({
      query: gql`
        {
          hello
        }
      `
    });
    this.setState({ helloWorld: response.data.hello });
  };

  fireGetUserQuery = async () => {
    const response = await client.query({
      query: gql`
        {
          user(id: 2) {
            email
            firstName
            id
            lastName
            password
          }
        }
      `
    });
    this.setState({ userData: response.data.user });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.helloWorld}</p>
        </header>
        <div className="data">{this.renderUserData()}</div>
      </div>
    );
  }

  renderUserData = () => {
    if (!this.state.userData) {
      return null;
    }

    const userData = this.state.userData;
    return (
      <div>
        <p>email: {userData.email}</p>
        <p>firstName: {userData.firstName}</p>
        <p>id: {userData.id}</p>
        <p>lastName: {userData.lastName}</p>
        <p>password: {userData.password}</p>
      </div>
    );
  };
}

export default App;
