import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { Link } from 'react-router-dom';

const Viewweightgain = () => {
  const [weightgains, setWeightgains] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeightgain = async () => {
      try {
        const response = await fetch(`/api/viewweightgain`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error fetching Weightgain data. Please check your backend.');
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        if (Array.isArray(data)) {
          setWeightgains(data);
        } else {
          throw new Error('Received data is not an array.');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }
    };

    fetchWeightgain();
  }, []);

  return (
    <div className=' bg-[url(./assets/Images/admin.jpg)]  bg-cover bg-center fixed w-full h-screen flex-col md:flex-row text-white'>   
      <AdminNavbar />
      <div className='grid'>
     <div className="mt-[-500px] ml-[300px]">
      <Link to="/dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
      </div>
      <div className="container ml-[270px] mt-[-500px] px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6">Weight Gain Data</h1>

        {/* Data Table */}
        <div className=" mt- p-4 rounded-lg">
          <table className="w-full  border-2 border border-white">
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
              {weightgains.length > 0 ? (
                weightgains.map((weightgain) => (
                  <tr key={weightgain._id} >
                    <td className="px-4 py-2 border border-white border-1">{weightgain.DAY}</td>
                    <td className="px-4 py-2 border border-white border-1">{weightgain.BREAKFAST}</td>
                    <td className="px-4 py-2 border border-white border-1">{weightgain.LUNCH}</td>
                    <td className="px-4 py-2 border border-white border-1">{weightgain.SNACKS}</td>
                    <td className="px-4 py-2 border border-white border-1">{weightgain.DINNER}</td>
                    <td className="px-4 py-2 border border-white border-1">
                      <Link to={`/updateweightgain/${weightgain._id}`} className="text-green-400 hover:underline ">
                        Update
                      </Link>
                    </td>
    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No Weight gain data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Video Section */}
        {weightgains.some((weightgain) => weightgain.VIDEO) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-center mb-4">Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {weightgains.map((weightgain) =>
                weightgain.VIDEO ? (
                  <div key={weightgain._id} className="text-center">
                    <video className="w-[300px] h-[200px] mx-auto mb-4 rounded-lg border border-gray-600" controls>
                      <source src={`data:video/mp4;base64,${weightgain.VIDEO}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <span className="px-4 py-2 border border-gray-600">{weightgain.DAY}</span>
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

export default Viewweightgain;
