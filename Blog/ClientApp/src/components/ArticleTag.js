import React, { Component } from 'react';

export class ArticleTag extends Component {

    constructor(props) {
        super(props)
        this.onCheckboxChanged = this.onCheckboxChanged.bind(this)
        this.state = {
            checked: this.props.info.completed === true ? "checked" : "",
            style: this.props.info.completed === true ? "text-decoration-line-through" : ""
        }
    }

    onCheckboxChanged() {
        this.setState({
            checked: this.state.checked === "checked" ? "" : "checked",
            style: this.props.info.completed === true ? "" : "text-decoration-line-through"
        })
        this.props.state(this.props.info.id)
    }



    render() {

        const checkboxStyle = {
            marginTop: 6,
            marginRight: 7,
            marginLeft: 10
        }

        const lineStyle = {
            color: "#00FF00"

        }

        const textStyle = {
            fontWeight: "bold",
            fontStyle: "oblique",
            color: "#00FF00",
            marginBottom: 5,
            marginRight: 10,
            marginTop: 5
        }

        const styleToToDoList = {
            border: "3px solid blue",
            borderRadius: 10,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 40
        }

        return (
            <div className="item d-flex mb-5" style={styleToToDoList}>
                <div style={checkboxStyle}>
                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        onChange={this.onCheckboxChanged}></input>
                </div>
                <div className={this.state.style} style={lineStyle}>
                    <div style={textStyle} >
                       {/* {this.props.info.text}*/}
                    </div>
                </div>

            </div>
        );
    }
}
