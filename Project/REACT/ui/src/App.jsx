import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider, Route,} from "react-router-dom";
import LoginPage from './assets/Pages/LoginPage';
import Signup from './assets/Pages/Signup';
import AddWeightgain from './assets/Pages/Admin/AddWeightgain';
import Viewmaintain from './assets/Pages/Admin/Viewmaintain';
import AddMaintain from './assets/Pages/Admin/AddMaintain';
import Dashbord from './assets/Pages/Admin/Dashboard';
import AddWeightloss from './assets/Pages/Admin/AddWeightloss';
import Viewweightloss from './assets/Pages/Admin/Viewweightloss';
import Viewweightgain from './assets/Pages/Admin/Viewweightgain';
import Updatemaintain from './assets/Pages/Admin/Updatemaintain';
import Services from './assets/Pages/User/Services';
import Profile from './assets/Pages/User/Profile';
import Weightgain from './assets/Pages/User/Weightgain';
import Weightloss from './assets/Pages/User/Weightloss';
import Maintain from './assets/Pages/User/Maintain';
import Updateweightloss from './assets/Pages/Admin/Updateweightloss';
import Updateweightgain from './assets/Pages/Admin/Updateweightgain';
import User from './assets/Pages/Admin/User';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       
        <Route path='/' element={<LoginPage />} />
        <Route path="/sign-up" element={<Signup />} />
       <Route path="/dashboard" element={<Dashbord />} />
        <Route path='/services' element={<Services />} />
        <Route path='/addmaintain' element={<AddMaintain />} />
        <Route path='/addweightloss' element={<AddWeightloss />} />
        <Route path='/addweightgain' element={<AddWeightgain />} />
        <Route path="/viewmaintain" element={<Viewmaintain />} />   
        <Route path='/viewweightloss' element={<Viewweightloss />} />
        <Route path='/viewweightgain' element={<Viewweightgain />} />
        <Route path='/updatemaintain/:id' element={<Updatemaintain />} />
        <Route path='/updateweightloss/:id' element={<Updateweightloss />} />
        <Route path='/updateweightgain/:id' element={<Updateweightgain />} />
        <Route path='/user' element={<User />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/weightgain' element={<Weightgain />} />
         <Route path='/weightloss' element={<Weightloss />} />
        <Route path='/maintain' element={<Maintain />} /> 
        

      </>
    )
  );
  return <RouterProvider router={router} />;
      }

export default App
