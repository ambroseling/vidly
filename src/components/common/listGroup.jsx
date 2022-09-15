import React, { Component } from 'react';
const ListGroup = (props) => { 
    const {items,valueProperty,textProperty,onItemSelect,selectedItem} = props;
 //   const classes = list-group-item;
        return (
        <ul className="list-group">
            
            {items.map(item => <li onClick={()=> onItemSelect(item)} key={item[valueProperty]} className={item === selectedItem? 'list-group-item active':'list-group-item' }>{item[textProperty]}</li>)}

        </ul>);
}
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
export default ListGroup;