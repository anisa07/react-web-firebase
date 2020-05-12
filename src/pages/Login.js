import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import analytics from '../analytics';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signin(this.state.email, this.state.password);
      analytics.setEvent({
        category: 'sign',
        action: 'sign in with pwd and login',
        label: 'sign in page'
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  googleSignIn = async () => {
    try {
      await signInWithGoogle();
      analytics.setEvent({
        category: 'sign',
        action: 'sign in with google',
        label: 'sign in page'
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  githubSignIn = async () => {
    try {
      await signInWithGitHub();
      analytics.setEvent({
        category: 'sign',
        action: 'sign in with github',
        label: 'sign in page'
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const {email, password, error} = this.state;

    return (
      <div className="container">
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Login to
            <Link className="title ml-2" to="/">
              Chat
            </Link>
          </h1>
          <p className="lead">
            Fill in the form below to login to your account.
          </p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={password}
              type="password"
            />
          </div>
          <div className="form-group">
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-primary px-5" type="submit">Login</button>
          </div>
          <p>You can also log in with any of these services</p>
          <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
            Sign in with Google
          </button>
          <button className="btn btn-secondary" type="button" onClick={this.githubSignIn}>
            Sign in with GitHub
          </button>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
