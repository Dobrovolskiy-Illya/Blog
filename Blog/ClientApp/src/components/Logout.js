import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from './accountActionCreators';



class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginName: '',
            token: ''
        }
    }

    render() {
        return (
            <div>
                <div> Logging out completed successfully </div>

                <div>
                    <button onClick={() => this.props.login(this.state.loginName, this.state.token)} ><NavLink tag={Link} className="text-dark" to="/">Main menu</NavLink></button>
                </div>
            </div>
        )

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



export default connect(mapStateToProps, mapDispatchToProps)(Logout)