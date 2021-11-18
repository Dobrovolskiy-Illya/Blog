import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';



export class SignIn extends Component {

    render() {
        return (
            <div>
                <div> Sign In </div>

                <div> Email adress </div>
                <div> <input type="email" /> </div>


                <div> Password: </div>
                <div> <input type="password" name="password" /> </div>

                <div> <button> Sign In </button> </div>

                <div>
                        <NavLink tag={Link} className="text-dark" to="/register">
                            <button> Create your BLOG account </button>
                        </NavLink>
                </div>

            </div>
        );
    }
}