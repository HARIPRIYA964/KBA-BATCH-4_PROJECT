import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

const Updatemaintain = () => {
  const [maintain, setMaintain] = useState({
    day: "",
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
    video: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaintain = async () => {
      try {
        const response = await fetch("/api/viewmaintain", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setMaintain(data[0]); // Select the first item
        } else {
          throw new Error("No data available");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintain();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating: ${name}, Value: ${value}`);
    setMaintain((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setMaintain((prevState) => ({
      ...prevState,
      maintainvideo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("day", maintain.day);
    formDataObj.append("breakfast", maintain.breakfast);
    formDataObj.append("lunch", maintain.lunch);
    formDataObj.append("snacks", maintain.snacks);
    formDataObj.append("dinner", maintain.dinner);

    if (maintain.maintainvideo) {
      formDataObj.append("maintainvideo",maintain.maintainvideo);
    }

    try {
      const response = await fetch(`/api/updatemaintain?day=${maintain.day}`, {
        method: "PUT",
        credentials: "include",
        body: formDataObj,
      });

      if (!response.ok) {
        alert('Updating Failed');
        throw new Error("Failed to update data");
      }
      alert( "Maintain updated successfully" );
      navigate("/viewmaintain");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

 
  return (
    <>
    <div className=' bg-[url(./assets/Images/admin.jpg)]  bg-cover fixed w-full '>   
    <AdminNavbar />
  
        <div className="flex justify-center items-center w-full h-screen">
       
          <div className="bg-green-600 w-[580px] h-[840px] pt-9 ml-32 mt-[-1200px] rounded-2xl  text-white">
          <form onSubmit={handleSubmit}  encType="multipart/form-data">
           <span className="font-bold text-2xl pl-46 ">UPDATE MAINTAIN</span>
  
            <div className="mt-4 ml-[100px] mb-2 ">
              <label>Days</label>
            </div>
            <input type="text" 
            placeholder="e.g. Day 1" 
            className="w-[390px] h-10  border border-2 pl-4 ml-[100px] mt-1"
            value={maintain.day}
            readOnly />
  
            <div className="mt-2 ml-[100px] mb-2">
              <label>Breakfast</label>
            </div>
            <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)" 
            className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4"
            name="breakfast"
            value={maintain.breakfast}
            onChange={handleChange}></textarea>
  
            <div className="mt-2 ml-[100px] mb-2">
              <label>Lunch</label>
            </div>
            <textarea placeholder="e.g. Whole wheat roti with mixed vegetable sabzi, dal, and raita (400 calories)" 
            className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4"
              name="lunch"
            value={maintain.lunch}
            onChange={handleChange}></textarea>
  
            <div className="mt-2  ml-[100px] mb-2">
              <label>Snacks</label>
            </div>
            <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)" 
            className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4"
            name="snacks"
            value={maintain.snacks}
            onChange={handleChange}></textarea>
  
            <div className="mt-2 ml-[100px] mb-2">
              <label>Dinner</label>
            </div>
            <textarea placeholder="e.g. dli with sambar and coconut chutney (300 calories)"
             className="w-[390px] h-20 ml-[100px] border border-2 pl-4 pt-4"
              name="dinner"
             value={maintain.dinner}
             onChange={handleChange}></textarea>
 
               {/* video Upload */}
          <div className='pt-2  ml-[100px] mt-[-10px]'>
            <label className="block text-white font-bold ">
              Maintain video (optional)
            </label>
            <input className='pt-2' type="file"
                  accept="video/*"
                  onChange={handleFileChange} />
          </div>
  
            <div className="border border-white w-32 h-9 text-center mx-auto mt-5 pt-1.5">
              <button>Update</button>
            </div>
            </form>
 
          </div>
          
        </div>
      
        </div>
    </>
  );
};

export default Updatemaintain

