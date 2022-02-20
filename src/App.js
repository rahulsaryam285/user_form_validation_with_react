import React, { Component } from "react";
import "./App.css";

const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordValidator =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      gender: "male",
      usernameError: "",
      emailError: "",
      passwordError: "",
      isFormSubmited: false,
      passwordShown: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validatorUserName = this.validatorUserName.bind(this);
    this.validatorEmail = this.validatorEmail.bind(this);
    this.validatorPassword = this.validatorPassword.bind(this);
    this.validtorField = this.validtorField.bind(this);
    this.togglePass = this.togglePass.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    return;
  }

  handleBlur(event) {
    const { name } = event.target;
    this.validtorField(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formFields = ["username", "email", "password"];

    let isValid = true;
    formFields.forEach((field) => {
      isValid = this.validtorField(field) && isValid;
    });

    if (isValid) this.setState({ isFormSubmited: true });
    else this.setState({ isFormSubmited: false });

    //  this.state.isFormSubmited;
    if (isValid) {
      alert("Your form is Submited");
      this.setState(
        {
          username: "",
          email: "",
          password: "",
          gender: "male",
          usernameError: "",
          emailError: "",
          passwordError: "",
          isFormSubmited: false,
          passwordShown: false,
        }
      )
      console.log(this.state.username, this.state.email, this.state.password, this.state.gender);
    }
  }

  validtorField(name) {
    let isValid = false;
    if (name === "username") isValid = this.validatorUserName();
    else if (name === "email") isValid = this.validatorEmail();
    else if (name === "password") isValid = this.validatorPassword();

    return isValid;
  }

  validatorUserName() {
    let usernameError = "";
    const value = this.state.username;
    // console.log(value.length);
    if (value.trim() === "") usernameError = "This field is Mandatory!";
    else if (value.length < 4)
      usernameError =
        "Password must be more than 4 characters and less than 10 characters";
    else if (value.length > 10)
      usernameError =
        "Password must be more than 4 characters and less than 10 characters";
    this.setState({
      usernameError,
    });
    return usernameError === "";
  }

  validatorEmail() {
    let emailError = "";
    const value = this.state.email;
    if (value.trim() === "") emailError = "This filed is Mandatory!";
    else if (!emailValidator.test(value))
      emailError = "This is not a valid email format";

    this.setState({
      emailError,
    });
    return emailError === "";
  }

  validatorPassword() {
    let passwordError = "";
    const value = this.state.password;
    if (value.trim() === "") passwordError = "This filed is Mandatory!";
    else if (!passwordValidator.test(value))
      passwordError =
        "4 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    this.setState({
      passwordError,
    });

    return passwordError === "";
  }

  togglePass() {
    this.setState({
      passwordShown: !this.state.passwordShown,
    });
  }

  render() {
    return (
      <div className="mainForm">
        <div className="card">
          <h1 className="card-header text-center h2">User Form</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="row m-3 ">
              <label
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label w-25"
              >
                Username
              </label>
              <div className="col-sm-10 w-75">
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername3"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.usernameError && (
                  <p className="error">{this.state.usernameError}</p>
                )}
              </div>
            </div>
            <div className="row m-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label w-25"
              >
                Email
              </label>
              <div className="col-sm-10 w-75">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.emailError && (
                  <p className="error">{this.state.emailError}</p>
                )}
              </div>
            </div>
            <div className="row m-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label w-25"
              >
                Password
              </label>
              <div className="col-sm-10 w-75 eye-custom">
                <input
                  type={this.state.passwordShown ? "text" : "password"}
                  className="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <i
                  className={`far fa-eye ${
                    this.state.passwordShown ? "" : "fa-eye-slash"
                  }`}
                  id="togglePassword"
                  onClick={this.togglePass}
                ></i>
                {this.state.passwordError && (
                  <p className="error">{this.state.passwordError}</p>
                )}
              </div>
            </div>
            <div className="row m-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label w-25"
              >
                Gender
              </label>
              <div className="w-75">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn btn-outline-secondary w-25 btn-btn">
                SignUP
              </button> 
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
