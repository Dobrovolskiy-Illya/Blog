import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';

class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        console.log(this.props)
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Blog</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>


                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/future">Info</NavLink>
                                </NavItem>


                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/future">Donate</NavLink>
                                </NavItem>



                                {this.props.userName != '' &&
                                    <div>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/createArticle">Create Article</NavLink>
                                        </NavItem>
                                    </div>
                                }





                                {console.log("props")}
                                {console.log(this.props.userName)}
                                <div className="ml-5 pl-5 d-flex">
                                    {this.props.userName === '' &&
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/signin">Login</NavLink>
                                        </NavItem>
                                    }

                                    {this.props.userName != '' &&
                                        <div>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to="/future"> <div> {this.props.userName} </div></NavLink>
                                            </NavItem>
                                        </div>
                                    }


                                    {this.props.userName != '' &&
                                        <div>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                                            </NavItem>
                                        </div>
                                    }
                                </div>

                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}


function mapStateToProps(state) {
    return {
        userName: state.userName
    }
}

//function mapDispatchToProps(dispatch) {

//}


export default connect(mapStateToProps)(NavMenu)