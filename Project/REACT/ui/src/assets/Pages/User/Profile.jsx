import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [profileData, setProfileData] = useState([]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch('/api/getuser', { 
            method: 'GET',
            credentials: 'include',
          });
    
          const data = await response.json();
          console.log("Fetched User Data:", data);
    
          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch user.");
          }
    
          setUser(data);
        } catch (error) {
          console.error("User Fetch Error:", error);
        }
      };
    
      fetchUser();
    }, []);
    
  


    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setImage(file);
          setPreview(URL.createObjectURL(file)); // Generate preview
        }
      };
    
      const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!image) {
          alert("Please select an image first.");
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append("ProfileImage", image);
    
          const response = await fetch("/api/addImage", {
            method: "PUT",
            body: formData,
            credentials: "include",
          });
    
          if (response.ok) {
            alert("Image Added Successfully");
            setImage(null);
            setPreview(null);
          } else {
            throw new Error("Failed to add image");
          }
        } catch (err) {
          console.log(err);
          alert("Something went wrong: " + err.message);
          setError(err.message);
        }
      };
    
    //profile get
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/getprofile', {  
            method: 'GET',
            credentials: 'include',
          });
    
          const data = await response.json();
          console.log("Fetched Profile Data:", data); // Debugging
    
          if (!response.ok || !Array.isArray(data)) {
            throw new Error(data.message || "Invalid profile data received.");
          }
     // Sort profile data by date to display in order
        const sortedData = data[0]?.updates.sort((a, b) => new Date(a.date) - new Date(b.date)) || [];
        setProfileData(sortedData);
        setLoading(false);
        } catch (error) {
          console.log("Internal Server Error:", error);
          setError(error.message);
          setLoading(false);  //  Fix: Stop loading even if there's an error
        }
      };
      
      fetchProfile();
    }, []);
    
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
    
      try {
        const profileData = { date, age, weight, height, gender };
    
        const response = await fetch('/api/addprofile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
          credentials: 'include',
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
          throw new Error(responseData.message || "Failed to add profile.");
        }
    
        alert('Profile Added Successfully');
        localStorage.setItem('profileFilled', 'true');

        // Set the starting day to 1 upon profile update
        localStorage.setItem('currentDay', '1');
        
        // Navigate to the appropriate page
        if (responseData.suggestion === 'maintain') {
            navigate('/maintain');
        } else if (responseData.suggestion === 'gain') {
            navigate('/weightgain');
        } else {
            navigate('/weightloss');
        }

        // Reset form fields
        setDate('');
        setAge('');
        setGender('');
        setWeight('');
        setHeight('');

      } catch (error) {
        setError(error.message);
        alert(error.message);
      }
    };
    
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

         
  return (
   <>
   <div className='md:bg-black bg-black h-screen  flex flex-col '>
   <div className='w-full max-w-6xl'>
       <Link to='/services'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-10 md:ml-16 ml-5 mt-6 ">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
          </svg>
          
       </Link>
    </div>

    <div className="flex flex-col md:flex-row  md:w-full max-w-7xl mt-8 ml-[-50px] md:ml-[-10px] md:bg-black bg-black">
 
 

        <div className="border border-green-500 bg-green-500 w-[350px] h-[800px]  ml-20">
        <form onSubmit={handleImageUpload} className="">
            <div className='ml-[117px] mt-6'>
            <label htmlFor="imageUpload" className="relative cursor-pointer">
             {preview ? (
            <img
              src={preview}
              alt="Selected"
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-600"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 border-2 border-gray-300">
              <span className="text-gray-500 text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg></span>
            </div>
          )}
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="ProfileImage/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {preview && (
          <button
            type="button"
            className="mt-2 text-red-500 text-sm"
            onClick={() => {
              setImage(null);
              setPreview(null);
            }}
          >
         
          </button>
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-2   rounded"
        >
         
        </button>
                   
            </div>
            </form>
            <span className="text-white font-bold text-2xl  ml-[90px] "> {user?.firstname} {user?.lastname}</span>
            <div>
                <span className="text-gray-500 text-sm ml-[110px] ">{user?.email} </span>
            </div>
        </div>

        <div className="border border-white bg-white md:w-[750px] w-[350px] md:h-[800px] h-[760px]  md:ml-16 ml-20  pt-32 md:mt-[-2px] mt-10 md:mb-[10px] mb-[300px]">
            <div className="md:mt-16 mt-[-30px]">
                <span className=" text-green-600 font-bold md:text-3xl text-2xl md:pl-[280px] pl-24  ">Your Details</span>
                <form onSubmit={handleSubmit} className='space-y-4' encType='multipart/form-date'>
                <div className="flex flex-col md:flex-row  ml-[70px]">
                    <input type="date"
                     placeholder="Date" className="border border-1 md:ml-10 ml-[-10px] w-[250px] h-[40px] mt-16 border-black pl-2" 
                     value={date}
                     onChange={(e) => setDate(e.target.value)}/>
                    <input type="number"
                     placeholder="Age" className="border border-1 md:ml-10 ml-[-10px] w-[250px] h-[40px] mt-16 placeholder:text-black border-black pl-2" 
                     value={age}
                     onChange={(e) => setAge(e.target.value)}/>

                </div>

                <div className=" ml-[210px] mt-[-30px] ">
                   <select name="gender" id="gender"
                    className="border border-1 md:ml-10 ml-[-150px]  w-[250px] h-[40px] mt-16 placeholder:text-black border-black pl-2"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)} >
                    <option value="Gender">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                   </select>
                </div>
                
                <div className="flex flex-col md:flex-row  ml-[70px] mt-[-30px]">
                    <input type="number"
                     placeholder="Weight"
                      className="border border-1 md:ml-10 ml-[-10px] w-[250px] h-[40px] mt-16 placeholder:text-black border-black pl-2" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}/>
                    <input type="number"
                     placeholder="height" 
                     className="border border-1 md:ml-10 ml-[-10px] w-[250px] h-[40px] mt-16 placeholder:text-black border-black pl-2" 
                     value={height}
                      onChange={(e) => setHeight(e.target.value)}/>

                </div>
               
             
                <div>
                    <button type='submit' className="bg-green-600 text-white md:w-[350px] w-[200px] h-[40px] md:mt-16 mt-4 md:ml-[200px] ml-20">Save</button>
                </div>
                </form>
            </div>  

<div>

<table className="md:w-[560px] w-[100px] rounded-lg shadow-md md:ml-[800px]  md:mt-[-635px] mt-[100px] md:border-white text-white border border-1">
    <thead>
        <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Age</th>
            <th className="px-6 py-3 text-left">Height</th>
            <th className="px-6 py-3 text-left">Weight</th>
        </tr>
    </thead>
    <tbody>
          {profileData.length > 0 ? (
            profileData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-3">
                  {item.date ? new Date(item.date).toLocaleDateString() : "No Date"}
                </td>
                <td className="px-6 py-3">{item.age}</td>
                <td className="px-6 py-3">{item.height} cm</td>
                <td className="px-6 py-3">{item.weight} kg</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">
                No Profile Data Available.
              </td>
            </tr>
          )}
        </tbody>


</table>

</div>
    </div>
    </div>
   </div>
   </>
  )
}

export default Profile
