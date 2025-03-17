import React from 'react'
import AdminNavbar from '../../components/AdminNavbar'

const Dashbord = () => {
  return (
    <>
   
        <div className=' bg-[url(./assets/Images/admin.jpg)]  bg-cover bg-center fixed w-full h-screen flex-col md:flex-row'>   
        <AdminNavbar /> 
        <div className='md:text-7xl text-6xl text-center text-green-700 font-bold md:ml-12 '>
          <h1 className='md:text-center md:mt-[-250px] mt-16   w-screen'>
            < p className=''>          Welcome to Dashboard   </p>        
         </h1>
        </div>
        </div>

    </>
  )    
}

export default Dashbord