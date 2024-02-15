import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table'; // Import Table component
import 'bootstrap/dist/css/bootstrap.min.css';

const Crud = () => {
    const empdata = [
        {
            id: 1,
            name: "Dipesh",
            age: 33,
            isActive: 1
        },
        {
            id: 2,
            name: "Vismay",
            age: 33,
            isActive: 1
        },
        {
            id: 3,
            name: "Ankit",
            age: 39,
            isActive: 0
        }
    ];

    const [data, setdata] = useState([]);

    useEffect(() => {
        setdata(empdata);
    }, []); // Empty dependency array for mounting effect only

    return (
        <Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>InActive</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.isActive}</td>
                                <td colSpan={2}>
                                    <button className="btn btn-primary">Edit</button>&nbsp;
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        );
                    }) : 'Loading....'}
                </tbody>
            </Table>
        </Fragment>
    );
}

export default Crud;


// import React, {useState,useEffect, Fragment} from "react";
// import Table from 'react-bootstrap/Table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Table } from 'react-bootstrap';

// const Crud = () =>{

//      const empdata =
//      [{

//        id : 1,
//         name : "Dipesh",
//         age :33,
//         isActive :1

//      },
//      {

//         id : 2,
//          name : "Vismay",
//          age :33,
//           isActive :1
 
 
//       },
//       {

//         id : 2,
//          name : "Ankit",
//          age :39,
//         isActive :0
 
 
//       },]
//     const [data,setdata] = useState([])

//     useEffect (()=> {
//         setdata(empdata)
//     } ),[];
    
//     return(
//         <Fragment>
// <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Id</th>
//           <th>Name</th>
//           <th>Age</th>
//           <th>InActive</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//        data && data.length > 0 ? data.map((item,index) =>{
//             return(
//                 <tr key ={index}>
//                 <td>index+1</td>
//                 <td>item.id</td>
//                 <td>item.name</td>
//                 <td>item.age</td>
//                 <td>item.isActive</td>
//                 <td colSpan={2}> 
//                 <button className="btn btn primary">Edit </button> &nbsp;
//                 <button className="btn btn danger">Delete </button>
//                 </td>
//               </tr>
//             );
//         })
//     :'Loading....'
//     }
    
//       </tbody>
//     </Table>
//     </Fragment>
       
//     );
//     }


// export default Crud;