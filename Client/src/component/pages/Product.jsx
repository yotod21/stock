import React, { useState } from 'react';
import Products from '../controller/products';
import Axios from 'axios'
import {Modal, Button} from "react-bootstrap";



export default function Product(){
    

   // useState to accept data from Add product Form
   const [addproduct, setAddProduct] = useState({
    name:'',
    catagory:'',
    quantity:'',
    price:'',
    expire:'',
})
const [successMessage, setSuccessMessage]=useState("")

const [productlist, setProductlist]=useState([])
const [stores, setStores] = useState([])
const [filterStore, setFilterStore] = useState("")
// Load products and stores
React.useEffect(()=>{
    Axios.get('http://localhost:3002/stores').then(({data})=> setStores(data))
    Axios.get('http://localhost:3002/productdata').then((response)=>{
        setProductlist(response.data)
    })
}, [])
// Filter by store
React.useEffect(()=>{
    const url = filterStore ? `http://localhost:3002/productdata?store_id=${filterStore}` : 'http://localhost:3002/productdata'
    Axios.get(url).then((response)=> setProductlist(response.data))
}, [filterStore])
 //handler which add product to the database
 const handelAddProduct = ()=>{
    Axios.post('http://localhost:3002/pro',{
        name:addproduct.name, 
        catagory:addproduct.catagory,
        quantity:addproduct.quantity,
        price:addproduct.price,
        expire:addproduct.expire,
        store_id: addproduct.store_id
    }).then(()=>{
        setSuccessMessage("Product added successfully")
        setAddProduct({ name:'', catagory:'', quantity:'', price:'', expire:'', store_id:'' })
        // Refresh the list
        const url = filterStore ? `http://localhost:3002/productdata?store_id=${filterStore}` : 'http://localhost:3002/productdata'
        Axios.get(url).then((response)=> setProductlist(response.data))
    }).catch(()=> setSuccessMessage("Failed to add product"))
}

//handel change and save to addproduct variabel which is constant
function handelChange(event){
    setAddProduct(prev=>{
        return {
            ...prev, 
            [event.target.name]: event.target.value
        }
    })
}

//handel Delete of the product
function handelDelete(productid){
   Axios.post('http://localhost:3002/delete',{
    pid: productid
   }).then(()=>{
       // Refresh the list
       const url = filterStore ? `http://localhost:3002/productdata?store_id=${filterStore}` : 'http://localhost:3002/productdata'
       Axios.get(url).then((response)=> setProductlist(response.data))
   })
}

//handelSubmit
function handelSubmit(event){
    event.preventDefault()
}

//MODAL CONTROLLE FOR EDIT PRODUCT
const [showEdit, setShowEdit] = useState(false);
const handleCloseEdit = () => setShowEdit(false);
const handelShowEdit = (productid) => {
    setShowEdit(true);
    setAddProduct(prev=> ({ ...prev, id: productid }))
    }
   
    
    return(
        <div>
            <Products
            
            productlist={productlist}
            handelAddProduct={handelAddProduct}
            handelChange = {handelChange}
            handelSubmit= {handelSubmit}
            handelDelete = {handelDelete}
            successMessage = {successMessage}
            handelShowEdit = {handelShowEdit}
            handleCloseEdit = {handleCloseEdit}
            showEdit = {showEdit}
            stores={stores}
            filterStore={filterStore}
            setFilterStore={setFilterStore}
        />


                 <Modal show={showEdit} size="x" onHide={handleCloseEdit}>
                 <Modal.Header closeButton>
                     <Modal.Title>Edit Product Information</Modal.Title>
                 </Modal.Header>
         <form>
             <Modal.Body>
                <h5>Product Id: {addproduct.id}</h5>
                 <div className="name">
                     <label htmlFor="name">Product Name</label>
                    <input type={"text"} placeholder="" name="name" className='form-control' onChange={handelChange} />
                 </div>
               <div className="catagory">
                 <label htmlFor="catagory">Catagory</label>
                <input type={"text"} placeholder="" name="catagory" className='form-control' onChange={handelChange} />
               </div>
               <div className="quantity">
                 <label htmlFor="quantity">Quantity</label>
                <input type={"number"} placeholder="" name="quantity" className='form-control' onChange={handelChange} />
               </div> 
              <div className="rate">
                <label htmlFor="price">Price</label>
                <input type={"number"} placeholder="" name="price" className='form-control' onChange={handelChange} />
              </div>
              <div className="expire">
                <label htmlFor="expire">Expire</label>
                <input type={"date"} placeholder="" name="expire" className='form-control' onChange={handelChange} />
              </div>
              <div className="store">
                <label htmlFor="store_id">Store</label>
                <select name="store_id" className='form-control' onChange={handelChange}>
                    <option value="">-- Select Store --</option>
                    {stores.map(s=> (
                        <option key={s.id} value={s.id}>{s.store_name}</option>
                    ))}
                </select>
              </div>
             </Modal.Body>

             <Modal.Footer>
                 <Button variant="danger" onClick={handleCloseEdit}>
                     Close
                 </Button>
                <Button variant="success" onClick={()=>{
                    Axios.put(`http://localhost:3002/product/${addproduct.id}`, addproduct).then(()=>{
                        handleCloseEdit();
                        const url = filterStore ? `http://localhost:3002/productdata?store_id=${filterStore}` : 'http://localhost:3002/productdata'
                        Axios.get(url).then((response)=> setProductlist(response.data))
                    })
                }}>
                    Save Changes
                 </Button>
             </Modal.Footer>
         </form>
             </Modal>
               

        </div>
        
    )
}