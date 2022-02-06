import React, { Component } from 'react';
import { connect } from 'react-redux'

class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.CreateArticleHandler = this.CreateArticleHandler.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeBody = this.handleChangeBody.bind(this)
        this.CheckTitle = this.CheckTitle.bind(this)
        this.CheckBody = this.CheckBody.bind(this)
        this.buttonAccessHandler = this.buttonAccessHandler.bind(this)
        this.state = {
            title: '',
            body: '',
            buttonDisabled: 'true',
        };
    }

    handleChangeTitle(event) {
        console.log("T1 - " + event.target.value)
        this.setState({
            title: event.target.value
        }, () => this.buttonAccessHandler())
    }

    handleChangeBody(event) {
        console.log("T2 - " + event.target.value)
        this.setState({
            body: event.target.value
        }, () => this.buttonAccessHandler())
    }

    CheckTitle() {
        console.log("TT1 - " + this.state.title.length)
        if (this.state.title.length >= 5) {
            return true;
        }
        return false;
    }

    CheckBody() {
        console.log("TT2 - " + this.state.body.length)
        if (this.state.body.length >= 5) {
            return true;
        }
        return false;
    }

    buttonAccessHandler() {

        if (this.CheckTitle() && this.CheckBody()) {
            console.log("YES")
            this.setState({
                buttonDisabled: false
            })
        }
        else {
            console.log("NO")
            this.setState({
                buttonDisabled: true
            })
        }
    }

    async CreateArticleHandler() {
        //alert("sdfdf")


        let article = {
            JWT: sessionStorage.getItem("access_token"),
            title: this.state.title,
            someText: this.state.body,


        };

        let response = await fetch('/api/article/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(article)
        });



        let result = await response.json();
        console.log(result.access_token)



        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            let json = await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
        }


    }



    render() {

        return (
            <div>
                <div> TITLE:* </div>
                <div> <input type="text" placeholder="Title..."  onChange={this.handleChangeTitle} value={this.state.title} data-toggle="tooltip" data-placement="top" title="Only Latin letters and Arabic numerals are available" /></div>

                <div> BODY:* </div>
                <div> <input type="text" placeholder="Body..."  onChange={this.handleChangeBody} value={this.state.body} data-toggle="tooltip" data-placement="top" title="Only Latin letters and Arabic numerals are available" /></div>


                <div> <button disabled={this.state.buttonDisabled} onClick={this.CreateArticleHandler} > Create </button> </div>

                <div>
                    Список тегов с чекбоксами
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userName: state.loginName,
        JWTtoken: state.token
    }
}



export default connect(mapStateToProps)(CreateArticle)