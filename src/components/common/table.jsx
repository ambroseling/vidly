import React, { Component } from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';
const Table = (props) => {
    const {columns,sortColumn,onSort,data} = props;
    return (  
        <table className='table m-5 p-5'>
        <TableHeader columns = {columns} sortColumn={sortColumn} onSort={onSort}/>
        <TableBody data={data} columns={columns}/>
    </table>
    );
}
 
export default Table;