import React, { Component, useState } from 'react';
import SideBar from '../SideBarLayOut';
import { FaPlus } from 'react-icons/fa';
import {Modal, Button} from "react-bootstrap";
import { BsFillCheckCircleFill } from 'react-icons/bs';



export default function Products(props){
  
      //MODAL CONTROLLER FOR ADD PRODUCT 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchTerm, setSearchTerm] = useState("");
    

    return(
        <div className="ForAllFlex">
        <SideBar/>
    <div className='w-full p-6'>
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-2xl font-semibold text-gray-800">Manage Product</h5>
                {show}
        </div>
        <div className="mb-4">
                 <Button variant="primary" onClick={handleShow} className="!bg-indigo-600 !border-none hover:!bg-indigo-700">
                    {<FaPlus/>} Add Product
                </Button>           

                <Modal show={show} size="x" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={props.handelSubmit}>
                    <Modal.Body>
                        {props.successMessage === true ?
                                        <div className="alert alert-success">
                                            <h5>Stock Upload Successfully</h5>
                                        </div>:""}

                        
                        <div className="productname">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" name='name' id='name' placeholder='Enter Product Name' className='form-control' onChange={props.handelChange}  />
                        </div>
                        <div className="catagory">
                            <label htmlFor="catagory">Product Catagory</label>
                            <input type="text" name='catagory' placeholder='Enter Catagory Of the Product' id=' catagory' className='form-control' onChange={props.handelChange} />
                        </div>
                        <div className="quantity">
                            <label htmlFor="quantity">Product Quantity</label>
                            <input type="number" name='quantity' id='quantity' placeholder='Enter quantity' className='form-control' onChange={props.handelChange} />
                        </div>
                        
                       
                        <div className="rate">
                            <label htmlFor="rate">Price</label>
                            <input type="number" name='price' id='price' placeholder='Enter Price ' className='form-control' onChange={props.handelChange} />
                        </div>
                        <div className="expire">
                            <label htmlFor="expire">Expiered Date</label>
                            <input type="date" name='expire' id='expire' placeholder='Enter Expire Date' className='form-control' onChange={props.handelChange}/>
                        </div>
                        <div className="store">
                            <label htmlFor="storeid">Store</label>
                            <select name='store_id' id='store_id' className='form-control' onChange={props.handelChange}>
                                <option value="">-- Select Store --</option>
                                {props.stores && props.stores.map(s=> (
                                    <option key={s.id} value={s.id}>{s.store_name}</option>
                                ))}
                            </select>
                        </div>

                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={props.handelAddProduct}>
                            {<BsFillCheckCircleFill/>} Save Changes
                            </Button>
                            <Button variant="danger" onClick={handleClose}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
        </div>
        <div className="flex flex-wrap items-end gap-4 mb-4">
            <div className="flex items-center gap-2">
                <label htmlFor='search' className="text-sm text-gray-600">Search:</label>
                <input type={"text"} className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200" placeholder="Search Product" name="search" id='search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor='storeFilter' className="text-sm text-gray-600">Filter by Store:</label>
                <select id='storeFilter' className='border rounded px-3 py-2' style={{maxWidth:"220px"}} value={props.filterStore} onChange={(e)=>props.setFilterStore(e.target.value)}>
                    <option value="">All Stores</option>
                    {props.stores && props.stores.map(s=> (
                        <option key={s.id} value={s.id}>{s.store_name}</option>
                    ))}
                </select>
            </div>
        </div>
        {(() => {
            const normalized = (v)=> (v||"").toString().toLowerCase();
            const filteredProducts = (props.productlist||[]).filter(item => {
                if (!searchTerm) return true;
                const q = normalized(searchTerm);
                return normalized(item.product_name).includes(q) || normalized(item.catagory).includes(q) || normalized(item.id).includes(q);
            });
            return (
        <div className='overflow-x-auto bg-white rounded-lg shadow'>
            <table className='min-w-full text-left'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-4 py-2'>Product Id</th>
                        <th className='px-4 py-2'>Product Name</th>
                        <th className='px-4 py-2'>Catagory</th>
                        <th className='px-4 py-2'>Quantity</th>
                        <th className='px-4 py-2'>Status</th>
                        <th className='px-4 py-2'>Option</th>
                    </tr>
                </thead>
                <tbody className='divide-y'>
                    {filteredProducts.map((item, key)=>(
                    <tr key={item.id} className='hover:bg-gray-50'>
                        <td className='px-4 py-2'>{item.id}</td>
                        <td className='px-4 py-2'>{item.product_name}</td>
                        <td className='px-4 py-2'>{item.catagory}</td>
                        <td className='px-4 py-2'>{item.quantity}</td>
                        <td>
                           <span className={`inline-block px-2 py-1 text-white text-xs rounded ${item.quantity > 0 ? 'bg-green-600':'bg-red-600'}`}>{item.quantity > 0 ? 'Available':'Not Available'}</span>
                        </td>
                        <td className='px-4 py-2'>
                           <Button variant="outline-success" style={{width:"55px"}} onClick={()=>props.handelShowEdit(item.id)}>Edit</Button>
                           <button className='btn btn-outline-danger btn-sm m-2' onClick={()=>props.handelDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
            );
        })()}
                    
                    

    </div>
</div>
            
    )
}