import React, { useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar';
import { Link,useNavigate } from 'react-router-dom';

const AddWeightloss = () => {
  const [Day,setDay] = useState('')
  const [Breakfast,setBreakfast] = useState('')
  const [Lunch,setLunch] = useState('')
  const [Snacks,setSnacks] = useState('')
  const [Dinner,setDinner] = useState('')
  const [Video,setVideo] = useState(null)
  const navigate = useNavigate();

  const handleWeightloss = async (e) =>{
    e.preventDefault();
    try{
    const formData = new FormData();
    formData.append('Day', Day);
    formData.append('Breakfast', Breakfast);
    formData.append('Lunch', Lunch);
    formData.append('Snacks', Snacks);
    formData.append('Dinner', Dinner);
    if(Video){
      formData.append('weightlossvideo', Video);
    }
    const response = await fetch('/api/addweightloss', {
      method: 'POST',
      body: formData,
      credentials:"include",
      });
      if( response.ok){
        alert('Weight loss Added Successfully');
        navigate('/viewweightloss');
        // Optionally reset form fields
      setDay("");
      setBreakfast("");
      setLunch("");
      setSnacks("");
      setDinner("");
      setVideo(null);
      

        }else{
          alert('Failed to Add Weight loss');
          }
          }catch(err){
            console.log(err);
            alert("Something went wrong: " + err.message);

            }
            }


  
  return (
    <div className=' bg-[url(./assets/Images/admin.jpg)]  bg-cover fixed w-full h-screen'>   
  <AdminNavbar />
  <div className='text-2xl text-white ml-[1370px] border w-[240px] h-12 pl-5 pt-2 mt-68 font-bold rounded bg-green-900'>
    <Link to={'/viewweightloss'} >View Weight Loss</Link>
  </div>

      <div className="flex justify-center items-center w-full h-screen">
     
        <div className="bg-green-600 w-[580px] h-[880px] pt-9 ml-32 mt-[-1830px] rounded-2xl  text-white">
        <span className="font-bold text-2xl pl-44 ">ADD WEIGHT LOSS</span>
        <form onSubmit={handleWeightloss} className="space-y-4" encType="multipart/form-data">

        <div className="mt-4 ml-[100px] mb-2 ">
          <label>Days</label>
        </div>
        <input type="text" 
        placeholder="e.g. Day 1" 
        className="w-[390px] h-10  border border-2 pl-4 ml-[100px] mt-1" 
        value={Day}
        onChange={(e) => setDay(e.target.value)}/>
        <div className="mt-2 ml-[100px] mb-2">
          <label>Breakfast</label>
        </div>
        <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)"
         className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4" 
         value={Breakfast}
         onChange={(e) => setBreakfast(e.target.value)}></textarea>
        <div className="mt-2 ml-[100px] mb-2">
          <label>Lunch</label>
        </div>
        <textarea placeholder="e.g. Whole wheat roti with mixed vegetable sabzi, dal, and raita (400 calories)" 
        className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4"
        value={Lunch}
        onChange={(e) => setLunch(e.target.value)} ></textarea>
        <div className="mt-2 ml-[100px] mb-2">
          <label>Snacks</label>
        </div>
        <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)" 
        className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4" 
        value={Snacks}
        onChange={(e) => setSnacks(e.target.value)}></textarea>
        <div className="mt-2 ml-[100px] mb-2">
          <label>Dinner</label>
        </div>
        <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)"
         className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4"
         value={Dinner}
         onChange={(e) => setDinner(e.target.value)} ></textarea>
           {/* Image Upload */}
           <div className='pt-2  ml-[100px] mt-[-10px]'>
          <label className="block text-white font-bold ">
            Weight loss Video (optional)
          </label>
          <input className='pt-2'
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setVideo(e.target.files[0]);
                  }
                }}
              />
        </div>

        <div className="border border-white w-32 h-9 text-center mx-auto mt-5 pt-1.5">
          <button>Add</button>
        </div>
        </form>
      </div>
    </div>
 </div>
  )
}

export default AddWeightloss
