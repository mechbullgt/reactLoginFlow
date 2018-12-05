import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import UploadPage from './UploadPage';

var apiBaseUrl = "http://localhost:4000/api/";

class Login extends Component {
  // Constructor
  constructor(props) {
    super(props);
    var localLoginComponent = [];
    // Basic Login Componenet
    localLoginComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField
            hintText="Enter your College Rollno"
            floatingLabelText="Candidate Id"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
        </div>
      </MuiThemeProvider>
    )
    this.state = {
      username: '',
      password: '',
      menuValue: 1,
      loginComponent: localLoginComponent,
      loginRole: 'student'
    }
  }

  /* componentWillMount is called only once and can't be paired with promise or timeOut.
      hence must not include anything that requires re-render. 
  */
  componentWillMount() {
    console.log("Mounted Prop Values", this.props);
    // check if prop is not undefined and then render some page according to the role
    if (this.props.role !== undefined) {
      //  if the loginRole is a student
      if (this.props.role === 'student') {
        console.log("In student componentWillMount");
        var localloginComponent = [];
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Enter your College Rollno"
                floatingLabelText="Student Id"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Secret Password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton
                label="Login"
                primary={true}
                style={style}
                onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({
          menuValue: 1,
          loginComponent: localloginComponent,
          loginRole: 'student'
        })
      }
      else if (this.props.role === 'teacher') {
        console.log("In teacher componentWillMount");
        // var localloginComponent = [];
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                floatingLabelText="Instructor Id"
                hintText="Enter your Techer Id"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton
                label="Submit"
                primary={true}
                style={style}
                onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({
          menuValue: 2,
          loginComponent: localloginComponent,
          loginRole: 'teacher'
        })
      }
    }
  }

  // Method to handle click event.
  handleClick(event) {
    var self = this;
    var payload = {
      "userid": this.state.username,
      "password": this.state.password,
      "role": this.state.loginRole
    }
    axios.post(apiBaseUrl + 'login', payload)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successfull");
          var uploadScreen = [];
          uploadScreen.push(
            <UploadPage
              appContext={self.props.appContext}
              role={self.state.loginRole}
            />)
          self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
        }
        else if (response.data.code === 204) {
          console.log("Username password do not match");
          alert(response.data.success)
        }
        else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Method to handle menu change
  handleMenuChange(value) {
    console.log("menuvalue", value);
    var loginRole;
    if (value === 1) {
      var localloginComponent = [];
      loginRole = 'student';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your College Rollno"
              floatingLabelText="Student Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    else if (value === 2) {
      // Emptying the localLoginComponent before filling it again.
      localloginComponent = [];
      loginRole = 'teacher';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your College Rollno"
              floatingLabelText="Teacher Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    this.setState({
      menuValue: value,
      loginComponent: localloginComponent,
      loginRole: loginRole
    })
  }

  // Render the Login page
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Login"
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
            <p>Login as:</p>
            <DropDownMenu value={this.state.menuValue} onChange={(event, index, value) => this.handleMenuChange(value)}>
              <MenuItem value={1} primaryText="Student" />
              <MenuItem value={2} primaryText="Teacher" />
            </DropDownMenu>
          </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
