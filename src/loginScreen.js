import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './login';
import Register from './register';

class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            username:'',
            password:'',
            loginScreen:[],
            loginMessage:'',
            buttonLabel:'Register',
            isLogin:true
        }
    }

    componentWillMount(){
        var loginScreen=[];
        loginScreen.push(
            <Login 
            parentContext={this}
            appContext={this.props.parentContext}
            />
        );
        var loginMessage = "Not Registered Yet, Please register ";
        this.state={
            loginScreen:loginScreen,
            loginMessage:loginMessage
        }
    }

    render(){
        return(
            <div className="loginScreen">
            {this.state.loginScreen}
            <div>
            {this.state.loginMessage}
            <MuiThemeProvider>
                <div>
                    <RaisedButton 
                    label={this.state.label}
                    primary={true}
                    style={style}
                    onClick={
                        (event)=>{
                            this.handleClick(event)
                        }
                    }
                    />
                </div>
            </MuiThemeProvider>
            </div>
            </div>

        )
    }
}

const style ={
    margin:15
};

export default LoginScreen;