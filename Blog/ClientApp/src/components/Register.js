import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';



export class Register extends Component {
    constructor(props) {
        super(props)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.state = {
            name: '',
            nameError: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChangeName(event) {
        if (this.state.name.match('/w')) {
            alert("YES")
        }
        else {
            alert("NO")
        }
        //this.setState({
        //    name: event.target.value
        //});
    }



    handleChange(event) {

        this.setState({
            name: event.target.value
        });
    }


    render() {
        return (
            <div>
                <div> Registration </div>
                <div> Name:* </div>
                <div> <input type="text" placeholder="Name..." onChange={this.handleChangeName} /> </div>

                <div> Phone number:* </div>
                <div> <input type="text" pattern="[0-9]*" placeholder="Phone number... " /> </div>


                <div> Email adress:* </div>
                <div> <input type="email" placeholder="example@email.com" /> </div>


                <div> Password:* </div>
                <div> <input type="password" name="password"/> </div>


                <div> Confirm password:* </div>
                <div> <input type="password" name="password" /> </div>




                <div> <button> Register </button> </div>

                <div> Already have an account? </div>
                <div>
                    <NavLink tag={Link} className="text-dark" to="/signin">Sign-In</NavLink>
                </div>

            </div>
            );
    }
}



let user = {
    name: 'John',
    surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
});



let result = await response.json();
alert(result.message);



if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
} else {
    alert("Ошибка HTTP: " + response.status);
}