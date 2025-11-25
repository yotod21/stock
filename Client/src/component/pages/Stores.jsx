import React, {useEffect, useState} from 'react';
import SideBar from '../SideBarLayOut';
import Axios from 'axios';
import { demoStores, USE_DEMO_DATA } from '../../data/demoData';

export default function Stores(){

    const [stores, setStores] = useState([])
    const [form, setForm] = useState({ store_name:"", address:"" })
    const [editing, setEditing] = useState(null)

    useEffect(()=>{
        if (USE_DEMO_DATA) {
            setStores(demoStores);
        } else {
            Axios.get('http://localhost:3002/stores').then(({data})=> setStores(data)).catch(()=> setStores(demoStores))
        }
    }, [])

    function onChange(e){
        const { name, value } = e.target
        setForm(prev=> ({ ...prev, [name]: value }))
    }

    function saveStore(){
        if (editing){
            Axios.put(`http://localhost:3002/stores/${editing}`, form).then(()=>{
                return Axios.get('http://localhost:3002/stores').then(({data})=>{
                    setStores(data)
                    setForm({ store_name:"", address:"" })
                    setEditing(null)
                })
            })
        } else {
            Axios.post('http://localhost:3002/stores', form).then(()=>{
                return Axios.get('http://localhost:3002/stores').then(({data})=>{
                    setStores(data)
                    setForm({ store_name:"", address:"" })
                })
            })
        }
    }

    function startEdit(s){
        setEditing(s.id)
        setForm({ store_name: s.store_name || "", address: s.address || "" })
    }

    function remove(id){
        Axios.delete(`http://localhost:3002/stores/${id}`).then(()=>{
            setStores(prev=> prev.filter(s=> s.id !== id))
        })
    }

    return(
        <div className="ForAllFlex">
            <SideBar/>
            <div className="stores">
                <div style={{display:"flex", gap:"10px", marginBottom:"16px"}}>
                    <input className='form-control' style={{maxWidth:"240px"}} placeholder='Store name' name='store_name' value={form.store_name} onChange={onChange}/>
                    <input className='form-control' style={{maxWidth:"320px"}} placeholder='Address' name='address' value={form.address} onChange={onChange}/>
                    <button className='btn btn-success' onClick={saveStore}>{editing ? 'Update' : 'Add'}</button>
                    {editing && <button className='btn btn-secondary' onClick={()=>{setEditing(null); setForm({store_name:"", address:""})}}>Cancel</button>}
                </div>

                <table className='product-tabel'>
                    <tr>
                        <th>Id</th>
                        <th>Store Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {stores.map(s=> (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.store_name}</td>
                            <td>{s.address}</td>
                            <td>
                                <button className='btn btn-outline-primary btn-sm' onClick={()=>startEdit(s)}>Edit</button>
                                <button className='btn btn-outline-danger btn-sm m-2' onClick={()=>remove(s.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}