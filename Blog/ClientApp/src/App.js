import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { /*C*/ounter } from './components/Counter';
import  Register  from './components/Register';
import  SignIn  from './components/SignIn';
import { CurrentArticle } from './components/CurrentArticle';
import  CreateArticle  from './components/CreateArticle';
import Logout from './components/Logout';
import { Future } from './components/Future'
import { StartPage } from './components/StartPage';
import { connect } from 'react-redux'
import { login } from './components/accountActionCreators';

import './custom.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.CheckToken = this.CheckToken.bind(this)
        this.state = {
            userName: '',
            token: ''
        }
    }
    static displayName = App.name;



    componentDidMount() {
        if (sessionStorage.getItem("access_token") !== null) {
            console.log("dkfkrgrlktjglkeltrjglktg")
            this.CheckToken()
        }
    }


    async CheckToken()
    {

        let token = {
            jwt: sessionStorage.getItem("access_token")
        };

        let response = await fetch('/api/account/checkToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(token)
        });



        let result = await response.json();

        if (result.access_token === "The token isn't correct") {

        }
        else if (response.ok)
        {
            //this.setState(
            //    {
            //        loginName: result.user_name,
            //        token: result.access_token
            //    })

            this.props.login(result.user_name, result.access_token)
        }
        else
        {
            console.log(response.status, response.errorText)
        }

        //console.log(result)
        //console.log(response)
        //console.log(this.state.loginName)
        //console.log(this.state.token)
        //console.log(this.props.login)
        console.log("TRUE")
        console.log(this.props.login)
        console.log(this.state.userName)
        console.log(this.state.token)
        console.log("QQQQ")

    }

    render() {

        //console.log("test");
        //let result = sessionStorage.getItem("access_token")
        //console.log(result)
        //console.log("end test")

        





       


    return (
      <Layout>
            <Route exact path='/' component={StartPage} />
            {/*<Route path='/counter' component={Counter} />*/}
            {/*<Route path='/fetch-data' component={FetchData} />*/}
            <Route path='/register' component={Register} />
            <Route path='/signin' component={SignIn} />
            <Route path='/currentArticle' component={CurrentArticle} />
            <Route path='/createArticle' component={CreateArticle} />
            <Route path='/logout' component={Logout} />
            <Route path='/future' component={Future} />
      </Layout>
    );
  }
}


function mapStateToProps(state) {
    return {
        userName: state.userName,
        JWTtoken: state.token
    }
}


function mapDispatchToProps(dispatch) {
    return {
        login: (name, token) => dispatch(login(name, token)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)