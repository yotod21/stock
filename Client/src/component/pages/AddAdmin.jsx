import React,{useState, useEffect} from 'react';
import { FaPlus } from 'react-icons/fa';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import {Modal, Button} from "react-bootstrap"
import SideBar from '../SideBarLayOut';
import Axios from 'axios';




export default function AddAdmin(){


    const [admin,setAdmin]=useState({
        email:"",
        username:"",
        password:"",
        confirm:""
    })

    const [admindata, setAdminData]= useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [editAdmin, setEditAdmin] = useState({ id:"", username:"", password:"", email:"" })

    useEffect(()=>{
        Axios.get('http://localhost:3002/admindata').then((response)=>{
            setAdminData(response.data)
        })
    }, [])

    const addAdmin = ()=> {
        Axios.post('http://localhost:3002/addadmin', {
                email : admin.email,
                username :admin.username,
                password: admin.password,
                confirm :admin.confirm
                }).then(()=>{
                    Axios.get('http://localhost:3002/admindata').then((response)=>{
                        setAdminData(response.data)
                        setShow(false)
                        setAdmin({ email:"", username:"", password:"", confirm:"" })
                    })
                })
        }

        Axios.get('http://localhost:3002/admindata').then((response)=>{
            setAdminData(response.data)
        })

    function handelAdminData(event){
        setAdmin(prev=>{
            return{
                ...prev,
                [event.target.name]: event.target.value
            }
        })

    }
    console.log(admin)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOpenEdit = (row)=>{
        setEditAdmin({ id: row.id, username: row.username || "", password: "", email: row.email || "" })
        setShowEdit(true)
    }

    function handleEditChange(event){
        const { name, value } = event.target
        setEditAdmin(prev=> ({ ...prev, [name]: value }))
    }

    const saveEdit = ()=>{
        Axios.put(`http://localhost:3002/admin/${editAdmin.id}`, {
            username: editAdmin.username,
            password: editAdmin.password,
            email: editAdmin.email
        }).then(()=>{
            Axios.get('http://localhost:3002/admindata').then((response)=>{
                setAdminData(response.data)
                setShowEdit(false)
            })
        })
    }

    const deleteAdmin = (id)=>{
        Axios.delete(`http://localhost:3002/admin/${id}`).then(()=>{
            setAdminData(prev=> prev.filter(a=> a.id !== id))
        })
    }
    


    return(
        <div className="ForAllFlex">
            <SideBar/>
        <div className="addadmin">
                 <div className="addadmin-bar">
                  <h5>System Users</h5>
                </div>
            <div className="addsubadmin">
                     <Button variant="primary" onClick={handleShow} className="addsubbutton">
                        {<FaPlus/>} Add SubAdmin
                    </Button>           

                    <Modal show={show} size="x" onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add SubAdmin</Modal.Title>
                        </Modal.Header>
                        <form>
                        <Modal.Body>
                            
                            <div className="UserName">
                                <label htmlFor="username">UserName</label>
                                <input type="text" name='username' id='UserName' placeholder='Enter UserName' className='form-control' onChange={handelAdminData} />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' placeholder='Enter password' className='form-control' onChange={handelAdminData}/>
                            </div>
                            <div className="confirm">
                                <label htmlFor="confirm">Confirm Password</label>
                                <input type="password" name='confirm' id='confirm' placeholder='Enter confirm password' className='form-control' onChange={handelAdminData}/>
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input type="text" name='email' placeholder='Enter your email' id=' email' className='form-control' onChange={handelAdminData} />
                            </div>

                        </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={addAdmin}>
                                {<BsFillCheckSquareFill/>} Save
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                Close
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
            </div>

                    <table className='product-tabel' style={{border:"grid"}}>
                                <tr>
                                    <th >Id</th>
                                    <th>UserName</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                                {admindata.map((data, key)=>(
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.username}</td>
                                        <td>{data.email}</td>
                                        <td>
                                        <Button variant="outline-success" style={{width:"55px"}} onClick={()=>handleOpenEdit(data)}>Edit</Button>
                                        <button className='btn btn-outline-danger btn-sm m-2' onClick={()=>deleteAdmin(data.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                    </table>
                    <Modal show={showEdit} size="x" onHide={()=>setShowEdit(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Admin</Modal.Title>
                        </Modal.Header>
                        <form>
                        <Modal.Body>
                            <div className="UserName">
                                <label htmlFor="username">UserName</label>
                                <input type="text" name='username' id='editUserName' placeholder='Enter UserName' className='form-control' onChange={handleEditChange} value={editAdmin.username} />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='editPassword' placeholder='Enter password' className='form-control' onChange={handleEditChange} value={editAdmin.password}/>
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input type="text" name='email' placeholder='Enter your email' id='editEmail' className='form-control' onChange={handleEditChange} value={editAdmin.email} />
                            </div>

                        </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={saveEdit}>
                                Save
                                </Button>
                                <Button variant="danger" onClick={()=>setShowEdit(false)}>
                                Close
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
        </div>
        </div>
    )
}