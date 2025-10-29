import React, { useState } from 'react';
import Axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import SideBar from '../SideBarLayOut';


export default function Report(){

    const [reportdata, setReportData]= useState({
        startdate:"",
        enddate:"",
    })

    const [products, setProducts] = useState([])
    const [sales, setSales] = useState([])
    const [transfers, setTransfers] = useState([])
    const [low, setLow] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Load all data on component mount
    React.useEffect(() => {
        loadAllData()
    }, [])

    function loadAllData() {
        setIsLoading(true)
        Promise.all([
            Axios.get('http://localhost:3002/report/products'),
            Axios.get('http://localhost:3002/report/sales'),
            Axios.get('http://localhost:3002/report/transfers'),
            Axios.get('http://localhost:3002/lowproduct')
        ]).then(([productsRes, salesRes, transfersRes, lowRes]) => {
            setProducts(productsRes.data)
            setSales(salesRes.data)
            setTransfers(transfersRes.data)
            setLow(lowRes.data)
            setIsLoading(false)
        }).catch(error => {
            console.error('Error fetching initial data:', error)
            setIsLoading(false)
        })
    }


    function handelChange(event){
        setReportData(prev=>{
            return{
                ...prev, 
                [event.target.name]:event.target.value
            }
        })
    }
    function handelSubmit(event){
        event.preventDefault()
        setIsLoading(true)
        const params = { start: reportdata.startdate, end: reportdata.enddate }
        
        Promise.all([
            Axios.get('http://localhost:3002/report/products', { params }),
            Axios.get('http://localhost:3002/report/sales', { params }),
            Axios.get('http://localhost:3002/report/transfers', { params }),
            Axios.get('http://localhost:3002/lowproduct')
        ]).then(([productsRes, salesRes, transfersRes, lowRes]) => {
            setProducts(productsRes.data || [])
            setSales(salesRes.data || [])
            setTransfers(transfersRes.data || [])
            setLow(lowRes.data || [])
            setIsLoading(false)
            console.log('Report data loaded:', {
                products: productsRes.data?.length || 0,
                sales: salesRes.data?.length || 0,
                transfers: transfersRes.data?.length || 0,
                low: lowRes.data?.length || 0
            })
        }).catch(error => {
            console.error('Error fetching report data:', error)
            setIsLoading(false)
            alert('Error loading report data. Please try again.')
        })
    }

    function downloadPdf(){
        console.log('Download button clicked!')
        console.log('Current state:', {
                products: products.length,
                sales: sales.length,
                transfers: transfers.length,
                low: low.length,
                isLoading: isLoading
            })
        
        try {
            console.log('Creating PDF document...')
            const doc = new jsPDF('p', 'mm', 'a4')
            console.log('PDF document created successfully')
            
            // Header
            doc.setFontSize(18)
            doc.text('Stock Management Report', 14, 15)
            
            doc.setFontSize(10)
            doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 14, 22)
            doc.text(`Date Range: ${reportdata.startdate || 'All Time'} to ${reportdata.enddate || 'Present'}`, 14, 28)
            
            let y = 35

            // Products Section
            doc.setFontSize(12)
            doc.text('Products Added', 14, y)
            y += 6
            
            if (products.length > 0){
                autoTable(doc, {
                    startY: y,
                    head: [['ID','Name','Category','Qty','Price','Expire','Store']],
                    body: products.map(p=> [
                        p.id || 'N/A', 
                        (p.product_name || 'N/A').substring(0, 20), 
                        (p.catagory || 'N/A').substring(0, 15), 
                        p.quantity || '0', 
                        p.price || '0', 
                        p.expiered_date || 'N/A', 
                        p.store_id || 'N/A'
                    ]),
                    styles: { 
                        fontSize: 7,
                        cellPadding: 2
                    },
                    headStyles: { 
                        fillColor: [102, 126, 234],
                        textColor: [255, 255, 255],
                        fontSize: 8
                    },
                    columnStyles: {
                        1: { cellWidth: 30 },
                        2: { cellWidth: 25 },
                        3: { cellWidth: 15 },
                        4: { cellWidth: 15 },
                        5: { cellWidth: 20 },
                        6: { cellWidth: 20 },
                        7: { cellWidth: 15 }
                    },
                    margin: { left: 14, right: 14 }
                })
                y = doc.lastAutoTable.finalY + 10
            } else {
                doc.setFontSize(10)
                doc.text('No products found for the selected date range', 14, y)
                y += 10
            }

            // Sales Section
            doc.setFontSize(12)
            doc.text('Sales Records', 14, y)
            y += 6
            
            if (sales.length > 0){
                autoTable(doc, {
                    startY: y,
                    head: [['ID','Date','Product','Unit Price','Qty','Total']],
                    body: sales.map(s=> [
                        s.id || 'N/A', 
                        s.date || 'N/A', 
                        (s.product_name || 'N/A').substring(0, 25), 
                        s.selling_price || '0', 
                        s.selled_quantity || '0', 
                        s.total || '0'
                    ]),
                    styles: { 
                        fontSize: 7,
                        cellPadding: 2
                    },
                    headStyles: { 
                        fillColor: [40, 167, 69],
                        textColor: [255, 255, 255],
                        fontSize: 8
                    },
                    columnStyles: {
                        1: { cellWidth: 15 },
                        2: { cellWidth: 25 },
                        3: { cellWidth: 35 },
                        4: { cellWidth: 20 },
                        5: { cellWidth: 15 },
                        6: { cellWidth: 20 }
                    },
                    margin: { left: 14, right: 14 }
                })
                y = doc.lastAutoTable.finalY + 10
            } else {
                doc.setFontSize(10)
                doc.text('No sales found for the selected date range', 14, y)
                y += 10
            }

            // Transfers Section
            doc.setFontSize(12)
            doc.text('Transfer Records', 14, y)
            y += 6
            
            if (transfers.length > 0){
                autoTable(doc, {
                    startY: y,
                    head: [['ID','Date','From','To','Product ID']],
                    body: transfers.map(t=> [
                        t.id || 'N/A', 
                        t.tdate || 'N/A', 
                        (t.from_store || 'N/A').substring(0, 20), 
                        (t.to_store || 'N/A').substring(0, 20), 
                        t.product_id || 'N/A'
                    ]),
                    styles: { 
                        fontSize: 7,
                        cellPadding: 2
                    },
                    headStyles: { 
                        fillColor: [255, 193, 7],
                        textColor: [0, 0, 0],
                        fontSize: 8
                    },
                    columnStyles: {
                        1: { cellWidth: 15 },
                        2: { cellWidth: 25 },
                        3: { cellWidth: 30 },
                        4: { cellWidth: 30 },
                        5: { cellWidth: 20 }
                    },
                    margin: { left: 14, right: 14 }
                })
                y = doc.lastAutoTable.finalY + 10
            } else {
                doc.setFontSize(10)
                doc.text('No transfers found for the selected date range', 14, y)
                y += 10
            }

            // Low Stock Section
            doc.setFontSize(12)
            doc.text('Low Stock Items (Quantity < 5)', 14, y)
            y += 6
            
            if (low.length > 0){
                autoTable(doc, {
                    startY: y,
                    head: [['ID','Name','Category','Qty','Price','Store']],
                    body: low.map(p=> [
                        p.id || 'N/A', 
                        (p.product_name || 'N/A').substring(0, 20), 
                        (p.catagory || 'N/A').substring(0, 15), 
                        p.quantity || '0', 
                        p.price || '0', 
                        p.store_id || 'N/A'
                    ]),
                    styles: { 
                        fontSize: 7,
                        cellPadding: 2
                    },
                    headStyles: { 
                        fillColor: [220, 53, 69],
                        textColor: [255, 255, 255],
                        fontSize: 8
                    },
                    columnStyles: {
                        1: { cellWidth: 15 },
                        2: { cellWidth: 30 },
                        3: { cellWidth: 25 },
                        4: { cellWidth: 15 },
                        5: { cellWidth: 20 },
                        6: { cellWidth: 15 }
                    },
                    margin: { left: 14, right: 14 }
                })
            } else {
                doc.setFontSize(10)
                doc.text('No low stock items found', 14, y)
            }

            // Footer
            const pageCount = doc.internal.getNumberOfPages()
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i)
                doc.setFontSize(8)
                doc.text(`Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10)
                doc.text('Generated by Stock Management System', doc.internal.pageSize.width - 60, doc.internal.pageSize.height - 10)
            }

            // Save the PDF
            const fileName = `stock-report-${new Date().toISOString().split('T')[0]}.pdf`
            console.log('Saving PDF with filename:', fileName)
            doc.save(fileName)
            
            // Show success message
            console.log('PDF saved successfully!')
            alert('PDF downloaded successfully!')
            
        } catch (error) {
            console.error('Error generating PDF:', error)
            alert('Error generating PDF. Please try again.')
        }
    }





    return(
        <div className="ForAllFlex">
            <SideBar/>
        <div className="w-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="text-2xl font-semibold text-gray-800">Stock Report</h5>
                </div>

                <form onSubmit={handelSubmit} className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4 items-end"> 
                    <div className="flex flex-col">
                        <label htmlFor='orderdate' className="text-sm font-medium text-gray-600">Start Date</label>
                        <input type="date" className='border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200' placeholder="Start Date" onChange={handelChange} name="startdate" value={reportdata.startdate} id="startdate"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor='enddate' className="text-sm font-medium text-gray-600">End Date</label>
                        <input type="date" className='border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200' placeholder="End Date" onChange={handelChange} name="enddate" value={reportdata.enddate} id="enddate"/>
                    </div>
                    <button className='inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded disabled:opacity-50' disabled={isLoading}>
                        {isLoading ? 'Loading...' : <><BsFillPatchCheckFill/> Generate Report</>}
                    </button>
                    <button type="button" onClick={downloadPdf} className='inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded'>
                        Download PDF
                    </button>
                </form>

              <div className="mt-6">
                <h6 className="text-lg font-semibold text-gray-700 mb-2">📦 Products Added ({products.length})</h6>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2">Id</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Expire</th>
                                <th className="px-4 py-2">Store</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.length > 0 ? products.map(p=> (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{p.id}</td>
                                    <td className="px-4 py-2">{p.product_name}</td>
                                    <td className="px-4 py-2">{p.catagory}</td>
                                    <td className="px-4 py-2">{p.quantity}</td>
                                    <td className="px-4 py-2">${p.price}</td>
                                    <td className="px-4 py-2">{p.expiered_date}</td>
                                    <td className="px-4 py-2">{p.store_id}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 px-4 py-6">
                                        No products found for the selected date range
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
              </div>

              <div className="mt-6">
                <h6 className="text-lg font-semibold text-gray-700 mb-2">💰 Sales Records ({sales.length})</h6>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2">Id</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Product</th>
                                <th className="px-4 py-2">Unit Price</th>
                                <th className="px-4 py-2">Qty</th>
                                <th className="px-4 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {sales.length > 0 ? sales.map(s=> (
                                <tr key={s.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{s.id}</td>
                                    <td className="px-4 py-2">{s.date}</td>
                                    <td className="px-4 py-2">{s.product_name}</td>
                                    <td className="px-4 py-2">${s.selling_price}</td>
                                    <td className="px-4 py-2">{s.selled_quantity}</td>
                                    <td className="px-4 py-2">${s.total}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-gray-500 px-4 py-6">
                                        No sales found for the selected date range
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
              </div>

              <div className="mt-6">
                <h6 className="text-lg font-semibold text-gray-700 mb-2">🔄 Transfer Records ({transfers.length})</h6>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2">Id</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">From</th>
                                <th className="px-4 py-2">To</th>
                                <th className="px-4 py-2">Product Id</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {transfers.length > 0 ? transfers.map(t=> (
                                <tr key={t.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{t.id}</td>
                                    <td className="px-4 py-2">{t.tdate}</td>
                                    <td className="px-4 py-2">{t.from_store}</td>
                                    <td className="px-4 py-2">{t.to_store}</td>
                                    <td className="px-4 py-2">{t.product_id}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500 px-4 py-6">
                                        No transfers found for the selected date range
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