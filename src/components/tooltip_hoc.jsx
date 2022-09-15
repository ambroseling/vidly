import React from 'react';

//the component you want wrapped inside or the component you want to have this general higher order feature you pass into here
function withToolTip(Component){
    return class ToolTip extends React.Component{
        state = {showToolTip:false};
        onMouseOver = () =>{
            this.setState({showToolTip:true});
        }
        onMouseOut=()=>{
            this.setState({showToolTip:false});
        }
        render(){
            
            return (
            <div onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver}>
                <Component showToolTip={this.state.showToolTip}/>
            </div>
            )
            
        }
    }
}
export default withToolTip;