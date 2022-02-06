import React, { Component } from 'react';
import { AllArticles } from './AllArticles';

export class StartPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }


    




    render() {

       





        return (
            <div>
                <div>
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                            <div className="font-weight-bold"> Recommended topics </div>
                            <div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div><button>Blockchain</button></div>
                                    <div className="ml-5 pl-5"><button>Cryptocurrency</button></div>
                                </div>

                                <div className="d-flex justify-content-between mt-2">
                                    <div><button> Elon Musk</button></div>
                                    <div><button>Art</button></div>
                                </div>

                                <div className="d-flex justify-content-between mt-2">
                                    <div><button>Business</button></div>
                                    <div><button>Psychology</button></div>
                                </div>


                                <div className="d-flex justify-content-between mt-2">
                                    <div><button>Technology</button></div>
                                    <div><button>C#</button></div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <AllArticles />

                </div>
            </div>
        );
    }
}
