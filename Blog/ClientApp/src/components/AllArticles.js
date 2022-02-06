import React, { Component } from 'react';
import { Article } from './Article';

export class AllArticles extends Component {

    constructor(props) {
        super(props);
        this.Test = this.Test.bind(this)
        this.state = {
            articles: '',
        }
    }


    async Test() {

        //console.log("dsdgttht")





        let response = await fetch('/api/article/getArticles')


        let result = await response.json();

        //console.log(response)
        //console.log(result.articles)

        //console.log("dsff")

        if (result.access_token === "The token isn't correct")
        {

        }
        else if (response.ok)
        {
            this.state.articles = result.articles;
            //console.log(this.state.articles)
        }
        else
        {
            console.log(response.status, response.errorText)
        }
    }



    render() {

        this.Test()

        if (this.state.articles === '') {
            return ( <div> </div>);
        }
        else {
            return (


                <div>
                    <div>
                        {this.state.articles.map(x => <Article key={x.id} info={x} />)}
                    </div>
                </div>
            );
        }



        
    }
}
