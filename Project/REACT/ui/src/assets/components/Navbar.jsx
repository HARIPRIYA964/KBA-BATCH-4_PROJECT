import React from 'react'
import profile from '../Images/profile.png'
import { Link } from 'react-router-dom'

import UserLogout from './UserLogout'

const Navbar = () => {
  return (
    <>
        <div  className="bg-contain bg-cover fixed md:w-[100%] w-[412px]">
      
        <div id="" className="font1 text-black  pt-6 md:pl-20 pl-5 flex  bg-white h-[80px]">
            <h3 className="md:text-4xl  font-normal ">COREO</h3>
            <a href="#home" className="md:pl-[520px] pl-8 md:pt-2 md:text-2xl">Home</a>
            <a href="#about" className="md:pl-[40px] pl-3 md:pt-2 md:text-2xl">About</a>
            <a href="#services" className="md:pl-[40px] pl-3 md:pt-2  md:text-2xl">Services</a>
            <span className="md:pl-[40px] pl-3 md:pt-1 md:text-2xl"><UserLogout /> </span>
            <Link to='/profile'><img src={profile} alt="" className="rounded-full  md:w-[57px] w-10 md:ml-[400px] ml-3 mt-[-10px]" /></Link>
            

        </div>
        </div>
    </>
  )
}

export default Navbar
