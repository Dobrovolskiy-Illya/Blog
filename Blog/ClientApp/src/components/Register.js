import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from './accountActionCreators';




class Register extends Component {
    constructor(props) {
        super(props)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this)
        this.buttonAccessHandler = this.buttonAccessHandler.bind(this)
        this.RegisterUserHandler = this.RegisterUserHandler.bind(this)
        this.CheckConfirmPassword = this.CheckConfirmPassword.bind(this)
        this.CheckPassword = this.CheckPassword.bind(this)
        this.CheckName = this.CheckName.bind(this)
        this.CheckEmail = this.CheckEmail.bind(this)
        this.CheckPhoneNumber = this.CheckPhoneNumber.bind(this)
        this.state = {
            name: '',
            nameError: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
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

    handleChangePhoneNumber(event) {
        const regex = /[0-9]/;
        const chars = event.target.value.split('');
        const char = chars.pop();
        console.log(char)
        if (regex.test(char)) {
            this.setState({
                phoneNumber: event.target.value
            }, () => this.buttonAccessHandler())
        }
        else if (char === undefined) {
            this.setState({
                phoneNumber: ''
            }, () => this.buttonAccessHandler())
        }
    }

    handleChangeEmail(event) {
        const regex = /[A-Za-z0-9@.]/;
        const chars = event.target.value.split('');
        const char = chars.pop();

        if (regex.test(char)) {
            this.setState({
                email: event.target.value
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

    handleChangeConfirmPassword(event) {
        const regex = /[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const chars = event.target.value.split('');
        const char = chars.pop();

        if (regex.test(char)) {
            this.setState({
                confirmPassword: event.target.value
            }, () => this.buttonAccessHandler())
        }
    }

    CheckConfirmPassword() {
        if (this.state.password === this.state.confirmPassword) {
            return true;
        }
        return false;
    }

    CheckPassword() {
        if (this.ContainsSpecialCharacters(this.state.password) && this.state.password.length >= 6) {
            return true;
        }
        return false;
    }

    async ContainsSpecialCharacters(str) {
        var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

        if (regex.test(str)) {
            return true;
        }
        return false;
    }

    CheckName() {
        if (this.state.name.length >= 5) {
            return true;
        }
        return false;
    }

    CheckEmail() {
        if (this.state.email.length >= 5) {
            return true;
        }
        return false;
    }

    CheckPhoneNumber() {
        if (this.state.phoneNumber.length >= 7) {
            return true;
        }
        return false;
    }


    async buttonAccessHandler() {
        if (this.CheckConfirmPassword() && this.CheckPassword() && this.CheckName() && this.CheckEmail() && this.CheckPhoneNumber()) {
            //console.log("YES")
            this.setState({
                buttonDisabled: false
            })
        }
        else {
            //console.log("NO")
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
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            password: this.state.password

        };

        let response = await fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

        

        let result = await response.json();
        //console.log(result.access_token)

        //console.log(result)
        //console.log(response)
        //console.log(result.access_token)

        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            sessionStorage.setItem(tokenKey, result.access_token)

            //this.props.login(result.user_name, result.access_token)

            this.setState({
                loginName: this.state.name,
                token: result.access_token
            })      

            //console.log(this.state.token)


            //let json = await response.json();
        } else {
            //alert("Ошибка HTTP: " + response.status);
            //console.log(response.status, response.errorText)

            this.setState({
                error: "error",
            })   
        }


    }




    render() {
       
        if (this.state.loginName !== '' && this.state.token !== '') {
            this.props.login(this.state.loginName, this.state.token)
            return <Redirect to="/" />
            //return (
            //    <div>
            //        <div> Registration completed successfully </div>

            //        <div>
            //            <button onClick={() => this.props.login(this.state.loginName, this.state.token )} >TEST</button>
            //        </div>

            //        <div>
            //            <button onClick={this.props.login(this.state.loginName, this.state.token)} ><NavLink tag={Link} className="text-dark" to="/">Main menu</NavLink></button>
            //        </div>
            //    </div>
            //)
        }
        else {

            return (
                <div>
                    <div> Registration </div>
                    <div> Name:* </div>
                    <div> <input type="text" placeholder="Name..." maxLength={12} onChange={this.handleChangeName} value={this.state.name} data-toggle="tooltip" data-placement="top" title="Only Latin letters and Arabic numerals are available" /></div>

                    <div> Phone number:* </div>
                    <div> <input type="text" placeholder="Phone number... " maxLength={15} onChange={this.handleChangePhoneNumber} value={this.state.phoneNumber} data-toggle="tooltip" data-placement="top" title="Only Arabic numerals are available" /> </div>


                    <div> Email adress:* </div>
                    <div> <input type="text" placeholder="example@email.com" maxLength={40} onChange={this.handleChangeEmail} value={this.state.email} /> </div>


                    <div> Password:* </div>
                    <div> <input type="password" name="password" maxLength={25} onChange={this.handleChangePassword} value={this.state.password} data-toggle="tooltip" data-placement="top" title="Only Latin letters and Arabic numerals are available" /> </div>


                    <div> Confirm password:* </div>
                    <div> <input type="password" name="password" maxLength={25} onChange={this.handleChangeConfirmPassword} value={this.state.confirmPassword} data-toggle="tooltip" data-placement="top" title="Passwords must match" /> </div>


                    <div> <button disabled={this.state.buttonDisabled} onClick={this.RegisterUserHandler} > Register </button> </div>

                    <div> Already have an account? </div>
                    <div>
                        <button> <NavLink tag={Link} className="text-dark" to="/signin">Sign-In</NavLink> </button>
                    </div>


                    {this.state.error === "error" && 
                        <div> This login is already in use in the system. Please come up with a different username </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Register)

