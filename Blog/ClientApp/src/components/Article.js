import React, { Component } from 'react';

export class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    

    render() {

        return (
            <div className="d-flex justify-content-between">
                <div>
                    <div className="d-flex justify-content-between">
                        <div> AUTHOR ING </div>
                        <div> AUTHOR NAME </div>
                        <div> CREATE DATE </div>
                    </div>
                    <div> Article Name </div>
                    <div className="d-flex justify-content-between">
                        <div> Time to read </div>
                        <div> TAGs </div>
                    </div>
                </div>
                <div> ARTICLE IMAGE </div>
            </div>
        );
    }
}
