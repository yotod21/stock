import React, { useEffect, useState } from 'react';
import SideBar from '../SideBarLayOut';
import Axios from 'axios';

export default function LowProducts(){

    const [low, setLow] = useState([])
    const [allProducts, setAllProducts] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3002/lowproduct').then(({data})=> setLow(data))
        Axios.get('http://localhost:3002/productdata').then(({data})=> setAllProducts(data))
    }, [])

    // Filter expired products
    const expiredProducts = allProducts.filter(item => {
        if (!item.expiered_date) return false;
        const today = new Date();
        today.setHours(0,0,0,0);
        const expireDate = new Date(item.expiered_date);
        if (isNaN(expireDate.getTime())) return false;
        expireDate.setHours(0,0,0,0);
        return expireDate < today;
    });

    return(
        <div className="ForAllFlex">
            <SideBar/>
            <div className="w-full p-6">
                <div className="mb-6">
                    <h5 className="text-2xl font-semibold text-gray-800">Low Stock & Expired Products</h5>
                </div>

                {/* Low Stock Section */}
                <div className="mb-6">
                    <h6 className="text-lg font-semibold text-gray-700 mb-2">Low Stock (quantity &lt; 5) - {low.length} items</h6>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full text-left">
                            <thead className="bg-yellow-50">
                                <tr>
                                    <th className="px-4 py-2">Id</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Store</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {low.map(p=> (
                                    <tr key={p.id} className="hover:bg-yellow-50">
                                        <td className="px-4 py-2">{p.id}</td>
                                        <td className="px-4 py-2">{p.product_name}</td>
                                        <td className="px-4 py-2">{p.catagory}</td>
                                        <td className="px-4 py-2">
                                            <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                                {p.quantity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">${p.price}</td>
                                        <td className="px-4 py-2">{p.store_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Expired Products Section */}
                <div className="mb-6">
                    <h6 className="text-lg font-semibold text-gray-700 mb-2">Expired Products - {expiredProducts.length} items</h6>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full text-left">
                            <thead className="bg-red-50">
                                <tr>
                                    <th className="px-4 py-2">Id</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Expire Date</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Store</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {expiredProducts.length > 0 ? expiredProducts.map(item => (
                                    <tr key={`exp-${item.id}`} className="hover:bg-red-50">
                                        <td className="px-4 py-2">{item.id}</td>
                                        <td className="px-4 py-2">{item.product_name}</td>
                                        <td className="px-4 py-2">{item.catagory}</td>
                                        <td className="px-4 py-2">
                                            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                                {item.expiered_date}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{item.quantity}</td>
                                        <td className="px-4 py-2">{item.store_id}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                            No expired products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}





