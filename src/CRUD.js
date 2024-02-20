import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table'; // Import Table component
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";


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



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [data, setdata] = useState([]);
   
    const[name,setName]= useState("");

    const[age,setAge] = useState("");

    const[isActive,setIsActive] =useState("0");

      const[editID,setEditID]= useState("");

    const[editName,setEditName]= useState("");

    const[editAge,setEditAge] = useState("");

    const[editIsActive,setEditIsActive] =useState("0");

    useEffect(() => {
        getData();
    }, []); // Empty dependency array for mounting effect only

    const getData = ()=>{
        axios.get('https://localhost:7143/api/Employee')
        .then((result)=>{
            setdata(result.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const handleEdit=(id)=>{
        // alert(id)
        handleShow(id);
        axios.get(`https://localhost:7143/api/Employee/${id}`)
        
        .then((result)=>{
            setEditName(result.data.name);
            setEditAge(result.data.age);
            setEditIsActive(result.data.isActive);
            setEditID(id);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete the employee?")) 
        {
            axios.delete(`https://localhost:7143/api/Employee/${id}`)
                .then((result) => {
                    // Handle successful deletion, e.g., show a success message
                    console.log("Employee deleted successfully");
                    getData(); // Refresh data after deletion
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                    // Handle error (e.g., show error message to the user)
                });
        }
    }
    
    const handleupdate =(id)=>{

        const url = `https://localhost:7143/api/Employee/${editID}`
        const data={
              "id":editID,
            "name": editName,
            "age": editAge,
            "isActive": editIsActive
        }
        axios.put(url,data)
        .then((result)=>{getData();
            handleClose();
            clear();
        })
        .catch(error => {
            console.error('Error saving data:', error);
            // Handle error (e.g., show error message to the user)
        });

    }

    const handelSave =()=>{
        const url = 'https://localhost:7143/api/Employee'
        const data={
        
        "name": name,
        "age": age,
        "isActive": isActive
        }
       
        axios.post(url,data)
        .then((result)=>{getData();
            clear();
        })
        .catch(error => {
            console.error('Error saving data:', error);
            // Handle error (e.g., show error message to the user)
        });
    }

    const clear = ()  => {
        setName('');
        setAge('');
        setIsActive(0);
        setEditAge('');
        setEditName('');
        setEditIsActive(0);
        setEditID('');

    }

    const handleActiveChange = (e) => {
        const isChecked = e.target.checked;
        setIsActive(isChecked ? "1" : "0");
    };
    
    const handleEditActiveChange = (e) => {
        const isChecked = e.target.checked;
        setEditIsActive(isChecked ? "1" : "0");
    };
    
    // const handleActiveChange=(e)=>{
    //     if(e.target.checked){
    //         setIsActive(1)
    //     }
    //     else{
    //         setIsActive(0)
    //     }
    // }
 
   
    // const handleEditActiveChange=(e)=>{
    //     if(e.target.checked){
    //         setEditIsActive(1)
    //     }
    //     else{
    //         setEditIsActive(0)
    //     }
    // }



    

    return (
        <Fragment>

<Container>
     
      <Row>
        <Col>
              <input type="text" className="form-control"placeholder="Enter Name" value={name}
              onChange={(e)=>setName(e.target.value)}/>
       </Col>
       
        <Col>
             <input type="text" className="form-control"placeholder="Enter Age" value={age} 
             onChange={(e)=>setAge(e.target.value)}/>
        </Col>
        
        <Col>
               <input type="checkbox"
               checked={isActive === 1 ? true : false}
               onChange={(e)=>handleActiveChange (e.target.checked)}
                value="isActive"
               />
               
               <label>InActive</label>
               {/* onChange={(e) => setEditAge(e.target.value)} */}
               
        </Col>

        <button className="btn btn-primary" onClick={()=> handelSave()}>Submit</button>
      </Row>
      <br></br>
    </Container>
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
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button>&nbsp;
                                    <button className="btn btn-danger"onClick={()=> handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    }) : 'Loading....'}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
        <Col>
              <input type="text" className="form-control"placeholder="Enter Name"value={editName}
              onChange={(e)=>setEditName(e.target.value)}/>
       </Col>
       
        <Col>
             <input type="text" className="form-control"placeholder="Enter Age" value={editAge}
              onChange={(e)=>setEditAge(e.target.value)}/>
        </Col>

        <Col>
               <input type="checkbox"
               checked={editIsActive=== 1 ? true : false}
               />
               <label>InActive</label>
               onChange={(e) => handleEditActiveChange(e)}
               {/* onChange={editIsActive(e.target.checked)} value="isEditActive" */}
        </Col>

       
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleupdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
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