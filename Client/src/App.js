import React from 'react';
import './App.css';
import{Dashboard,Product,Orders,AddAdmin, Stores, Profile, Report, Login, LowProducts} from "./component"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
         <Router >
               <div>
                <Routes>
                      <Route path='/' element={<Login/>}/>
                      <Route path='/dashboard' element={<Dashboard/>}/>
                      <Route path='/product' element={<Product/>}/>
                      <Route path='/transfer' element={<Orders/>}/>
                      <Route path='/report' element={<Report/>}/>
                      <Route path='/lowproduct' element={<LowProducts/>}/>
                      <Route path='/addsubadmin' element={<AddAdmin/>}/>
                      <Route path='/stores' element={<Stores/>}/>
                      <Route path='/setting' element={<Profile/>}/>
                  </Routes> 
               </div>
            </Router>
           
  )
}

export default App;
