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
    this.getUserDataByID();
    this.getUserList();
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

  getUserDataByID = async () => {
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

  getUserList = async () => {
    const response = await client.query({
      query: gql`
        {
          userList {
            email
            firstName
            lastName
          }
        }
      `
    });
    this.setState({ userList: response.data.userList });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.helloWorld}</p>
        </header>
        <div className="data">
          <h3>Data for single user</h3>
          {this.renderSingleUserData()}
          <h3>User list</h3>
          {this.renderUserList()}
        </div>
      </div>
    );
  }

  renderSingleUserData = () => {
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

  renderUserList = () => {
    if (!this.state.userList) {
      return null;
    }

    return this.state.userList.map(user => (
      <div>
        <p>email: {user.email}</p>
        <p>firstName: {user.firstName}</p>
        <p>lastName: {user.lastName}</p>
      </div>
    ));
  };
}

export default App;
