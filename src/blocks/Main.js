import React, { Component } from 'react';
class Main extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        return(
            <main className=''>
                
                <ul>
                {this.props.cardTemplate}
                </ul> 
                {this.props.weatherCards}
                {<br></br>}


            </main>
        )
    }
}

export {Main}
