import React from 'react'
import logo from '../Images/logo.png'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'

const AdminNavbar = () => {
  
  return (
    <>
      
       <ul>
            
              <div className=" p-6 text-white mt-7 ">
                <div className=" items-center gap-3 "> 
                  <img  src={logo}   alt="logo"  className="w-18 h-27 ml-10 pt-7 "  /> 
                 
           
                <p className='text-green-400 pl-[50px]'>Admin</p> </div>
              
                <div className="mt-[-155px]  font-bold text-white text-5xl font-serif ml-[890px]">COREO</div>
                </div>
           <div className=''>
           <li className="py-5 text-fuchsia-800 ml-20 pt-18 mt-18"><Link to="/dashboard" className="text-xl font-medium text-gray-300">Dashboard</Link></li>
            <li className="py-5 text-fuchsia-800 ml-20"><Link to="/user" className="text-xl font-medium text-gray-300">Users</Link></li>
            <li className="py-5 text-fuchsia-800 ml-20"><Link to="/addmaintain" className="text-xl font-medium text-gray-300">Maintain</Link></li>
            <li className="py-5 text-fuchsia-800 ml-20"><Link to="/addweightloss" className="text-xl font-medium text-gray-300">Weight Loss</Link></li>
            <li className="py-5 text-fuchsia-800 ml-20"><Link to="/addweightgain" className="text-xl font-medium text-gray-300">Weight Gain</Link></li>
            <li className="text-xl font-medium text-gray-300 ml-20 py-5"><Logout /> </li>
           </div>
        </ul>
      
    </>
  )
}

export default AdminNavbar
