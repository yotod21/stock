import React, { useEffect, useState } from 'react';
import SideBar from '../SideBarLayOut';
import Axios from 'axios';

export default function Orders(){

    const [products, setProducts] = useState([])
    const [stores, setStores] = useState([])

    const [sellForm, setSellForm] = useState({ id:"", price:"", quantity:"", date:"" })
    const [transferForm, setTransferForm] = useState({ pid:"", from:"", to:"", tdate:"" })

    const [message, setMessage] = useState("")

    useEffect(()=>{
        Axios.get('http://localhost:3002/productdata').then(({data})=> setProducts(data))
        Axios.get('http://localhost:3002/stores').then(({data})=> setStores(data))
    }, [])

    function onSellChange(e){
        const { name, value } = e.target
        setSellForm(prev=> ({ ...prev, [name]: value }))
    }

    function onTransferChange(e){
        const { name, value } = e.target
        setTransferForm(prev=> ({ ...prev, [name]: value }))
    }

    function submitSell(e){
        e.preventDefault()
        setMessage("")
        Axios.post('http://localhost:3002/sell', {
            id: sellForm.id,
            price: sellForm.price,
            quantity: sellForm.quantity,
            date: sellForm.date
        }).then(()=>{
            setMessage('Sale recorded successfully')
            setSellForm({ id:"", price:"", quantity:"", date:"" })
            // refresh products to reflect stock
            Axios.get('http://localhost:3002/productdata').then(({data})=> setProducts(data))
        }).catch(()=> setMessage('Failed to record sale'))
    }

    function submitTransfer(e){
        e.preventDefault()
        setMessage("")
        Axios.post('http://localhost:3002/transfer', {
            pid: transferForm.pid,
            from: transferForm.from,
            to: transferForm.to,
            tdate: transferForm.tdate
        }).then(()=>{
            setMessage('Transfer completed successfully')
            setTransferForm({ pid:"", from:"", to:"", tdate:"" })
            Axios.get('http://localhost:3002/productdata').then(({data})=> setProducts(data))
        }).catch(()=> setMessage('Failed to transfer'))
    }
    
    return(
        <div className="ForAllFlex">
            <SideBar/>
            <div className="w-full p-6">
                {message && <div className="bg-blue-50 text-blue-700 border border-blue-200 rounded px-4 py-2 mb-4">{message}</div>}

                <div className="mb-4">
                    <h5 className="text-2xl font-semibold text-gray-800">Sell Product</h5>
                </div>
                <form onSubmit={submitSell} className="mb-6">
                    <div className="flex gap-3 flex-wrap">
                        <select className='border rounded px-3 py-2 min-w-[260px] focus:outline-none focus:ring focus:ring-indigo-200' name='id' value={sellForm.id} onChange={onSellChange}>
                            <option value="">-- Select Product --</option>
                            {products.map(p=> (
                                <option key={p.id} value={p.id}>{p.product_name} (Qty: {p.quantity})</option>
                            ))}
                        </select>
                        <input type="number" className='border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200' placeholder='Unit Price' name='price' value={sellForm.price} onChange={onSellChange} />
                        <input type="number" className='border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200' placeholder='Quantity' name='quantity' value={sellForm.quantity} onChange={onSellChange} />
                        <input type="date" className='border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200' placeholder='Date' name='date' value={sellForm.date} onChange={onSellChange} />
                        <button className='bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition-colors' type='submit'>Sell</button>
                        </div>
                </form>

                <div className="mb-4">
                    <h5 className="text-2xl font-semibold text-gray-800">Transfer Product</h5>
                </div>
                <form onSubmit={submitTransfer}>
                    <div className="flex gap-3 flex-wrap">
                        <select className='border rounded px-3 py-2 min-w-[260px] focus:outline-none focus:ring focus:ring-indigo-200' name='pid' value={transferForm.pid} onChange={onTransferChange}>
                            <option value="">-- Select Product --</option>
                            {products.map(p=> (
                                <option key={p.id} value={p.id}>{p.product_name} (Store: {p.store_id})</option>
                            ))}
                        </select>
                        <select className='border rounded px-3 py-2 min-w-[160px] focus:outline-none focus:ring focus:ring-indigo-200' name='from' value={transferForm.from} onChange={onTransferChange}>
                            <option value="">-- From Store --</option>
                            {stores.map(s=> (
                                <option key={s.id} value={s.id}>{s.store_name}</option>
                            ))}
                        </select>
                        <select className='border rounded px-3 py-2 min-w-[160px] focus:outline-none focus:ring focus:ring-indigo-200' name='to' value={transferForm.to} onChange={onTransferChange}>
                            <option value="">-- To Store --</option>
                            {stores.map(s=> (
                                <option key={s.id} value={s.id}>{s.store_name}</option>
                            ))}
                        </select>
                        <input type="date" className='border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200' placeholder='Transfer Date' name='tdate' value={transferForm.tdate} onChange={onTransferChange} />
                        <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded transition-colors' type='submit'>Transfer</button>
            </div>
        </form>
</div>
</div>
    )
}
