import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { Link } from 'react-router-dom';

const Viewmaintain = () => {
  const [maintains, setMaintain] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaintain = async () => {
      try {
        const response = await fetch(`/api/viewmaintain`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error fetching Maintain data. Please check your backend.');
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        if (Array.isArray(data)) {
          setMaintain(data);
        } else {
          throw new Error('Received data is not an array.');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }
    };

    fetchMaintain();
  }, []);

  return (
    <div className=' bg-[url(./assets/Images/admin.jpg)]  bg-cover bg-center md:fixed  md:w-full md:h-screen w-full  flex-col md:flex-row'>   
      <AdminNavbar />
      <div className='grid md:grid-col grid-row '>
        <div className="mt-[-500px] ml-[300px]">
          <Link to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
        </svg>
          </Link>
        </div>
        </div>
      <div className="container md:ml-[270px] md:mt-[-500px] px-4 py-8 text-white">
        <h1 className="text-2xl font-bold text-center mb-6">Maintain Data</h1>

        {/* Data Table */}
         <div className="mt-12">
          <div className="overflow-x-auto md:ml-[130px] md:mr-[100px]">
          <table className="text-white text-sm md:text-lg shadow-md w-full">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="px-4 py-2 border border-white border-1">Days</th>
                <th className="px-4 py-2 border border-white border-1">Breakfast</th>
                <th className="px-4 py-2 border border-white border-1">Lunch</th>
                <th className="px-4 py-2 border border-white border-1">Snacks</th>
                <th className="px-4 py-2 border border-white border-1">Dinner</th>
                <th className="px-4 py-2 border border-white border-1">Actions</th>

              </tr>
            </thead>
            <tbody>
              {maintains.length > 0 ? (
                maintains.map((maintain) => (
                  <tr key={maintain._id} >
                    <td className="px-4 py-2 border border-white border-1">{maintain.day}</td>
                    <td className="px-4 py-2 border border-white border-1">{maintain.breakfast}</td>
                    <td className="px-4 py-2 border border-white border-1">{maintain.lunch}</td>
                    <td className="px-4 py-2 border border-white border-1">{maintain.snacks}</td>
                    <td className="px-4 py-2 border border-white border-1">{maintain.dinner}</td>
                    <td className="px-4 py-2 border border-white border-1">
                      <Link to={`/updatemaintain/${maintain._id}`} className="text-green-400 hover:underline ">
                        Update
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No maintain data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>

        {/* Video Section */}
        {maintains.some((maintain) => maintain.video) && (
          <div className="mt-12 ml-12">
            <h2 className="text-xl font-semibold text-center mb-4">Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
              {maintains.map((maintain) =>
                maintain.video ? (
                  <div key={maintain._id} className="text-center ">
                    <video className="w-[300px] h-[200px] mx-auto mb-4 rounded-lg border border-gray-600" controls>
                      <source src={`data:video/mp4;base64,${maintain.video}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <span className="px-4 py-2 border border-gray-600">{maintain.day}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default Viewmaintain;
