import React, { Component } from 'react';

//Input: liked (boolean)
//Output: onClick
class Like extends Component {
    render() { 
        let classes = 'fa fa-heart';
        if(this.props.liked !== true){
            classes+='-o';
        }
        return (
        
        <i onClick={this.props.onClick} className={classes} aria-hidden="true" ></i>
        );
        
        
    }

}
 
export default Like;