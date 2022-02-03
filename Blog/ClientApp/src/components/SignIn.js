import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from './accountActionCreators';
import { Redirect } from 'react-router-dom';



class SignIn extends Component {
    constructor(props) {
        super(props)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.buttonAccessHandler = this.buttonAccessHandler.bind(this)
        this.RegisterUserHandler = this.RegisterUserHandler.bind(this)
        this.state = {
            name: '',
            password: '',
            buttonDisabled: 'true',
            loginName: '',
            token: '',
            error: ''
        }
    }


    handleChangeName(event) {
        const regex = /[A-Za-z0-9]/;
        const chars = event.target.value.split('');
        const char = chars.pop();
        if (regex.test(char)) {
            this.setState({
                name: event.target.value,
            }, () => this.buttonAccessHandler())
        }
    }

    handleChangePassword(event) {
        const regex = /[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const chars = event.target.value.split('');
        const char = chars.pop();

        if (regex.test(char)) {
            this.setState({
                password: event.target.value
            }, () => this.buttonAccessHandler())
        }
    }


    buttonAccessHandler() {
        if ((this.state.name != '') && (this.state.password != '')) {
            this.setState({
                buttonDisabled: false
            })
        }
        else {
            this.setState({
                buttonDisabled: true
            })
        }
    }

    async RegisterUserHandler() {
        //alert("sdfdf")
        const tokenKey = "access_token";

        let user = {
            name: this.state.name,
            password: this.state.password

        };

        let response = await fetch('/api/account/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });



        let result = await response.json();
        console.log(result.access_token)

        console.log(result)
        console.log(response)
        console.log(result.access_token)

        if (result.access_token === "error getting token jwt") {
            this.setState({
                error: "error"
            })
        }
        else if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            sessionStorage.setItem(tokenKey, result.access_token)


            

            this.setState({
                loginName: this.state.name,
                token: result.access_token
            })


            //let json = await response.json();
        } else {
            //alert("Ошибка HTTP: " + response.status);
            console.log(response.status, response.errorText)
        }
    }


    render() {
        
        if (this.state.loginName !== '' && this.state.token !== '') {
            this.props.login(this.state.loginName, this.state.token)
            return <Redirect to="/" />
            //return (
            //    <div>
            //        <div> Sign in completed successfully </div>

            //        <div>
            //            <button onClick={() => this.props.login(this.state.loginName, this.state.token)} ><NavLink tag={Link} className="text-dark" to="/">Main menu</NavLink></button>
            //        </div>
            //    </div>
            //)
        }
        else {

            return (
                <div>
                    <div> Sign In </div>

                    <div> Login:* </div>
                    <div> <input type="text" placeholder="name...." maxLength={40} onChange={this.handleChangeName} value={this.state.name} /> </div>


                    <div> Password:* </div>
                    <div> <input type="password" name="password" maxLength={25} onChange={this.handleChangePassword} value={this.state.password} data-toggle="tooltip" data-placement="top" title="Only Latin letters and Arabic numerals are available " /> </div>

                    <div> <button disabled={this.state.buttonDisabled} onClick={this.RegisterUserHandler} > Log In </button> </div>

                    <div>
                        <button>
                            <NavLink tag={Link} className="text-dark" to="/register">
                                Create your BLOG account
                            </NavLink>
                        </button>

                    </div>


                    {this.state.error === "error" &&
                        <div> Login or password are not correct. Please try again in a few minutes. </div>
                    }

                </div>
            );

        }

    }
}



function mapStateToProps(state) {
    return {
        userName: state.loginName,
        JWTtoken: state.token
    }
}


function mapDispatchToProps(dispatch) {
    return {
        login: (name, token) => dispatch(login(name, token)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignIn)