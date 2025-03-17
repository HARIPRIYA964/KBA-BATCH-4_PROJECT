import React,{useState} from 'react'
import services3 from '../../Images/services3.png'
import { useEffect } from 'react';
import HomeNavbar from '../../components/HomeNavbar';

const Weightloss = () => {
  const [weightlosses, setWeightlosses] = useState([]);
  const [error, setError] = useState('');
  const [clickedDays, setClickedDays] = useState({});
  const [currentDay, setCurrentDay] = useState(1);
  const [lastClickedDate, setLastClickedDate] = useState('');

// UseEffect to retrieve all localStorage data together
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
    const fetchWeightloss = async () => {
      try {
        const response = await fetch(`/api/viewweightloss`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error fetching Weightloss data. Please check your backend.');
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        if (Array.isArray(data)) {
          setWeightlosses(data);
        } else {
          throw new Error('Received data is not an array.');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }
    };

    fetchWeightloss();
  }, []);
  // Sync currentDay to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentDay', currentDay);
}, [currentDay]);

// Sync clickedDays and lastClickedDate to localStorage whenever they change
useEffect(() => {
    localStorage.setItem('clickedDays', JSON.stringify(clickedDays));
    localStorage.setItem('lastClickedDate', lastClickedDate);
}, [clickedDays, lastClickedDate]);

const handleButtonClick = (Day) => {
    const dayNumber = parseInt(Day.replace(/\D/g, ''), 10); // Ensure day is properly parsed to an integer

    console.log(`Button clicked for day: ${dayNumber}`);
    
    if (dayNumber > currentDay) {
        alert(`You can watch Day ${dayNumber} after the day changes.`);
        return;
    }

    const currentTime = Date.now();
    const updatedClickedDays = {
        ...clickedDays,
        [Day]: currentTime,
    };

    console.log('Updated clickedDays:', updatedClickedDays);

    setClickedDays(updatedClickedDays); // Update the clickedDays state
    setLastClickedDate(currentTime); // Update the last clicked date
};

// Determine if the button should show as "Completed"
const isCompleted = (Day) => {
    return clickedDays[Day] !== undefined;
};

// Determine if the video is unlocked
const checkVideoUnlockStatus = (Day) => {
    // Only unlock the video if the current day has passed
    return currentDay >= parseInt(Day.replace(/\D/g, ''), 10);
};
  return (
    <div className="bg-black md:h-full-screen h-full-screen">
            <HomeNavbar />
            <div className="flex flex-col md:flex-row ml-32">
                <img src={services3} alt="" className="size-16 md:mt-28 mt-10 md:ml-6 ml-[-80px]" />
                <h1 className="text-5xl text-center md:pt-28 md:mt-0 mt-[-60px] md:ml-0 ml-[-80px] pl-10 text-green-400">Weight Loss</h1>
            </div>
            <div className="text-white text-l pt-5 ml-32">
                <p className="md:pr-[1380px] md:pl-[25px] pr-[50px] pl-[10px] md:ml-0 ml-[-80px] md:mt-0 mt-5 text-justify">
                    Weight loss requires a balanced diet, regular exercise, hydration, and consistency.
                    Focus on long-term habits for sustainable results.
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
                            {weightlosses.length > 0 ? (
                                weightlosses.map((weightloss) => (
                                    <tr key={weightloss._id}>
                                        <td className="md:px-44 px-4 py-3 md:py-5 border border-white">{weightloss.Day}</td>
                                        <td className="md:px-32 px-4 py-3 md:py-5 border border-white">{weightloss.Breakfast}</td>
                                        <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{weightloss.Lunch}</td>
                                        <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{weightloss.Snacks}</td>
                                        <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{weightloss.Dinner}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-400">
                                        No Weight Loss data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Video Section */}
            {weightlosses.some((weightloss) => weightloss.Video) && (
                <div className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {weightlosses.map((weightloss) => {
                            const isUnlocked = checkVideoUnlockStatus(weightloss.Day);

                            return weightloss.Video ? (
                                <div key={weightloss._id} className="text-center mb-10">
                                    <video
                                        className={`w-[300px] h-[200px] mx-auto mb-4 rounded-lg border border-gray-600 ${
                                            isUnlocked ? '' : 'opacity-50'
                                        }`}
                                        controls={isUnlocked}
                                        disabled={!isUnlocked}
                                    >
                                        <source
                                            src={`data:video/mp4;base64,${weightloss.Video}`}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                    <button
                                      className={`px-4 py-2 border text-white transition duration-300 ${
                                          isUnlocked ? 'bg-green-600' : 'bg-gray-800 cursor-not-allowed'
                                      }`}
                                      onClick={() => isUnlocked && handleButtonClick(weightloss.Day)}
                                      disabled={!isUnlocked}
                                  >
                                      {weightloss.Day} {isUnlocked ? (isCompleted(weightloss.Day) ? '(Completed)' : '(Unlocked)') : '(Locked)'}
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

export default Weightloss
