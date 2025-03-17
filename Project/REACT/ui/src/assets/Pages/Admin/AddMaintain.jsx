import React, { useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar';
import { useNavigate, Link } from 'react-router-dom';

const AddMaintain = () => {
  const [day,setDay] = useState('');
  const [breakfast,setBreakfast] = useState('')
  const [lunch,setLunch] = useState('')
  const [snacks,setSnacks] = useState('')
  const [dinner,setDinner] = useState('')
  const [video,setVideo] = useState(null)
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const formData = new FormData();
    formData.append('day', day);
    formData.append('breakfast', breakfast);
    formData.append('lunch', lunch);
    formData.append('snacks', snacks);
    formData.append('dinner', dinner);
    if(video){
      formData.append('maintainvideo', video);
    }
    const response = await fetch('/api/addmaintain', {
      method: 'POST',
      body: formData,
      credentials:"include",
      });
      if( response.ok){
        alert('Maintain Added Successfully');
        navigate('/viewmaintain');
        // Optionally reset form fields
      setDay("");
      setBreakfast("");
      setLunch("");
      setSnacks("");
      setDinner("");
      setVideo(null);
      

        }else{
          alert('Failed to Add Maintain');
          }
          }catch(err){
            console.log(err);
            alert("Something went wrong: " + err.message);

            }
            }

  
  return (
  <>
   <div className=' bg-[url(./assets/Images/admin.jpg)]  bg-cover md:fixed md:w-full md:h-screen w-full '>   
  <AdminNavbar />
  <div className='text-2xl text-white md:ml-[1370px] border w-[200px] h-12 pl-5 pt-2 md:mt-68 mt-[300px] font-bold rounded bg-green-900'>
    <Link to={'/viewmaintain'} >View Maintain</Link>
  </div>

      <div className="flex md:flex-col flex-row justify-center items-center md:w-full md:h-screen h-screen">
     
        <div className="bg-green-600 md:w-[580px] w-[360px] md:h-[880px] h-[900px] pt-9 md:ml-32 ml-[-20px] md:mt-[-1830px] mt-[-500px] rounded-2xl  text-white">
          
          <span className="font-bold text-2xl md:pl-44 pl-24 ">ADD MAINTAIN</span>
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">

          <div className="mt-4 md:ml-[100px] ml-[50px] mb-2 ">
            <label>Days</label>
          </div>
          <input type="text" 
          placeholder="e.g. Day 1" 
          className="md:w-[390px] h-10  border border-2 pl-4 md:ml-[100px] ml-[50px] mt-1" 
          value={day}
          onChange={(e) => setDay(e.target.value)}/>

          <div className="mt-2 md:ml-[100px] ml-[50px] mb-2 ">
            <label>Breakfast</label>
          </div>
          <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)" 
          className="md:w-[390px] w-[266px] h-20 md:ml-[100px] ml-[50px] border border-2 pl-4 pt-4"
          value={breakfast}
          onChange={(e) => setBreakfast(e.target.value)} ></textarea>

          <div className="mt-2 md:ml-[100px] ml-[50px] mb-2">
            <label>Lunch</label>
          </div>
          <textarea placeholder="e.g. Whole wheat roti with mixed vegetable sabzi, dal, and raita (400 calories)" 
          className="md:w-[390px] w-[266px] h-20 md:ml-[100px] ml-[50px] border border-2 pl-4 pt-4"
          value={lunch}
          onChange={(e) => setLunch(e.target.value)} ></textarea>

          <div className="mt-2  md:ml-[100px] ml-[50px] mb-2">
            <label>Snacks</label>
          </div>
          <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)" 
          className="md:w-[390px] w-[266px] h-20 md:ml-[100px] ml-[50px] border border-2 pl-4 pt-4"
          value={snacks} 
          onChange={(e) => setSnacks(e.target.value)} ></textarea>

          <div className="mt-2 md:ml-[100px] ml-[50px] mb-2">
            <label>Dinner</label>
          </div>
          <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)"
           className="md:w-[390px] w-[266px] h-20 md:ml-[100px] ml-[50px] border border-2 pl-4 pt-4"
           value={dinner}
           onChange={(e) => setDinner(e.target.value)} ></textarea>
             {/* video Upload */}
        <div className='pt-2  ml-[100px] mt-[-10px]'>
          <label className="block text-white font-bold ">
            Maintain video (optional)
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
            <button>Add </button>
          </div>
          </form>

        </div>
        
      </div>
    
      </div>
  </>
  )
}

export default AddMaintain