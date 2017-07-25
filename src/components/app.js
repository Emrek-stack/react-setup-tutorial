import React from 'react';
import axios from 'axios';
import '../styles/app.css';

export default function app() {
    return (
        <div>
            <h1>JSX</h1>
            <span>My first JSX span!</span>
            <FirstName/>  
        </div>
    );
}


export class FirstName extends React.Component {  


    constructor()
    {
        super();
        this.state = { posts: null}
    }

    componentDidMount()
    {
            axios.get(
                'http://date.jsontest.com/', 
               ).then(res => {
                   console.log(res.data);
        const posts = res.data;
        this.setState({ posts });        
      });
    }

    render() {  
        if (this.state.posts) { 
        return (  
            <div> 
                
                <p>{this.state.posts.time}</p>  
                
            </div>  
        );  
        }
 return <div>Loading...</div>;
    }  
}