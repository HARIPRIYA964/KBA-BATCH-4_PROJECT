import React from 'react'
import { Link } from 'react-router-dom'
import UserLogout from './UserLogout'
import profile from '../Images/profile.png'


const HomeNavbar = () => {
  return (
    <>
      <div  className="w-[100%]">
      
      <div id="" className=" text-black  md:pt-6 pt-7 md:pl-20 pl-6 flex  bg-white h-[80px]">
          <h3 className="md:text-4xl md:font-normal font-bold">COREO</h3>
          <Link to='/services' className="md:pl-[520px] pl-4 md:pt-2 md:text-2xl">Home</Link>
          <Link to='/services' className="md:pl-[40px] pl-4 md:pt-2 md:text-2xl">About</Link>
          <Link to='/services' className="md:pl-[40px] pl-4 md:pt-2 md:text-2xl">Services</Link>
          <span className="md:pl-[40px] pl-4 md:pt-2 md:text-2xl"><UserLogout /> </span>
          <Link to='/profile'><img src={profile} alt="" className="rounded-full  md:w-[57px] w-[40px] md:ml-[400px] ml-4 md:mt-[-10px] mt-[-8px]" /></Link>
          

      </div>
      </div>
    </>
  )
}

export default HomeNavbar
