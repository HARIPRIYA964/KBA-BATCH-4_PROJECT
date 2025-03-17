import React,{useState,useEffect} from 'react'
import HomeNavbar from '../../components/HomeNavbar';
import services1 from '../../Images/services1.png'

const Maintain = () => {
    const [maintains, setMaintain] = useState([]);
    const [error, setError] = useState('');
    const [clickedDays, setClickedDays] = useState({});
    const [currentDay, setCurrentDay] = useState(1);
    const [lastClickedDate, setLastClickedDate] = useState('');
  
  
    useEffect(() => {
      const storedCurrentDay = localStorage.getItem('currentDay') || '1';
      const storedClickedDays = JSON.parse(localStorage.getItem('clickedDays')) || {};
      const storedLastClickedDate = localStorage.getItem('lastClickedDate') || '';
  
      console.log('Initial currentDay from localStorage:', storedCurrentDay);
      console.log('Initial clickedDays from localStorage:', storedClickedDays);
      console.log('Last clicked date from localStorage:', storedLastClickedDate);
  
      setCurrentDay(parseInt(storedCurrentDay, 10));
      setClickedDays(storedClickedDays);
      setLastClickedDate(storedLastClickedDate);
  
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
            throw new Error('Error fetching Weightgain data. Please check your backend.');
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
  
    useEffect(() => {
      localStorage.setItem('currentDay', currentDay);
  }, [currentDay]);
  
  // Sync clickedDays and lastClickedDate to localStorage whenever they change
  useEffect(() => {
      localStorage.setItem('clickedDays', JSON.stringify(clickedDays));
      localStorage.setItem('lastClickedDate', lastClickedDate);
  }, [clickedDays, lastClickedDate]);
  
  const handleButtonClick = (day) => {
      const dayNumber = parseInt(day.replace(/\D/g, ''), 10); // Ensure day is properly parsed to an integer
  
      console.log(`Button clicked for day: ${dayNumber}`);
      
      if (dayNumber > currentDay) {
          alert(`You can watch Day ${dayNumber} after the day changes.`);
          return;
      }
  
      const currentTime = Date.now();
      const updatedClickedDays = {
          ...clickedDays,
          [day]: currentTime,
      };
  
      console.log('Updated clickedDays:', updatedClickedDays);
  
      setClickedDays(updatedClickedDays); // Update the clickedDays state
      setLastClickedDate(currentTime); // Update the last clicked date
  };
  
  // Determine if the button should show as "Completed"
  const isCompleted = (day) => {
      return clickedDays[day] !== undefined;
  };
  
  // Determine if the video is unlocked
  const checkVideoUnlockStatus = (DAY) => {
      // Only unlock the video if the current day has passed
      return currentDay >= parseInt(DAY.replace(/\D/g, ''), 10);
  };
  return (
    <div className="bg-black md:h-full-screen h-full-screen">
    <HomeNavbar />
    <div className="flex flex-col md:flex-row md:ml-36 ml-7">
        <img src={services1} alt="" className="size-16 md:mt-26 mt-10" />
        <h1 className="text-5xl text-center md:pt-28 md:mt-1 mt-[-50px] md:pl-5 md:ml-1 ml-[-30px] text-green-400">Maintain</h1>
    </div>
    <div className="text-white text-l pt-5 md:ml-32 ml-13">
        <p className="md:pr-[1380px] pr-[60px] md:pl-[25px] pl-[-10px] text-justify">
        Maintaining fitness involves regular exercise, balanced nutrition, hydration, adequate sleep, and consistency. Stay active, prioritize health, and embrace a healthy lifestyle.
        </p>
    </div>

    <div className="mt-12">
    <h1 className="text-5xl text-center pb-10 text-green-400">Diet Plans</h1>
    <div className="overflow-x-auto md:ml-[130px] md:mr-[100px]">
        <table className="text-white text-sm md:text-lg shadow-md w-full">
            <thead>
                <tr className="bg-green-700 text-white">
                    <th className="md:px-[110px] px-4 py-3 md:py-5 border border-white">Days</th>
                    <th className="md:px-[126px] px-4 py-3 md:py-5 border border-white">Breakfast</th>
                    <th className="md:px-[125px] px-4 py-3 md:py-5 border border-white">Lunch</th>
                    <th className="md:px-[125px] px-4 py-3 md:py-5 border border-white">Snacks</th>
                    <th className="md:px-[125px] px-4 py-3 md:py-5 border border-white">Dinner</th>
                </tr>
            </thead>
            <tbody>
                {maintains.length > 0 ? (
                    maintains.map((maintain) => (
                        <tr key={maintain._id} className="">
                            <td className="md:px-44 px-4 py-3 md:py-5 border border-white">{maintain.day}</td>
                            <td className="md:px-32 px-4 py-3 md:py-5 border border-white">{maintain.breakfast}</td>
                            <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{maintain.lunch}</td>
                            <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{maintain.snacks}</td>
                            <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{maintain.dinner}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-400">
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
        <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {maintains.map((maintain) => {
                    const isUnlocked = checkVideoUnlockStatus(maintain.day);

                    return maintain.video ? (
                        <div key={maintain._id} className="text-center mb-10">
                            <video
                                className={`w-[300px] h-[200px] mx-auto mb-4 rounded-lg border border-gray-600 ${
                                    isUnlocked ? '' : 'opacity-50'
                                }`}
                                controls={isUnlocked}
                                disabled={!isUnlocked}
                            >
                                <source
                                    src={`data:video/mp4;base64,${maintain.video}`}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                            <button
                              className={`px-4 py-2 border text-white transition duration-300 ${
                                  isUnlocked ? 'bg-green-600' : 'bg-gray-800 cursor-not-allowed'
                              }`}
                              onClick={() => isUnlocked && handleButtonClick(maintain.day)}
                              disabled={!isUnlocked}
                          >
                              {maintain.day} {isUnlocked ? (isCompleted(maintain.day) ? '(Completed)' : '(Unlocked)') : '(Locked)'}
                          </button>
                        </div>
                    ) : null;
                  })}
                  </div>
              </div>
          )}

<div>
    <button className="bg-green-600 text-white md:w-[550px] w-[300px] h-[40px] md:mt-14 mt- mb-20 md:ml-[680px] ml-16 text-xl rounded-md">
            {isCompleted ? 'Complete' : 'Completed'}
        </button>
    </div>
    </div>
  );
};
export default Maintain
