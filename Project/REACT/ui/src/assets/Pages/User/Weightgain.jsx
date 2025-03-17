import React,{useState ,useEffect} from 'react';
import HomeNavbar from '../../components/HomeNavbar';
import services2 from '../../Images/services2.png'


const Weightgain = () => {
  const [weightgains, setWeightgains] = useState([]);
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

  useEffect(() => {
    localStorage.setItem('currentDay', currentDay);
}, [currentDay]);

// Sync clickedDays and lastClickedDate to localStorage whenever they change
useEffect(() => {
    localStorage.setItem('clickedDays', JSON.stringify(clickedDays));
    localStorage.setItem('lastClickedDate', lastClickedDate);
}, [clickedDays, lastClickedDate]);

const handleButtonClick = (DAY) => {
    const dayNumber = parseInt(DAY.replace(/\D/g, ''), 10); // Ensure day is properly parsed to an integer

    console.log(`Button clicked for day: ${dayNumber}`);
    
    if (dayNumber > currentDay) {
        alert(`You can watch Day ${dayNumber} after the day changes.`);
        return;
    }

    const currentTime = Date.now();
    const updatedClickedDays = {
        ...clickedDays,
        [DAY]: currentTime,
    };

    console.log('Updated clickedDays:', updatedClickedDays);

    setClickedDays(updatedClickedDays); // Update the clickedDays state
    setLastClickedDate(currentTime); // Update the last clicked date
};

// Determine if the button should show as "Completed"
const isCompleted = (DAY) => {
    return clickedDays[DAY] !== undefined;
};

// Determine if the video is unlocked
const checkVideoUnlockStatus = (DAY) => {
    // Only unlock the video if the current day has passed
    return currentDay >= parseInt(DAY.replace(/\D/g, ''), 10);
};

return (

  <div className="bg-black md:h-full-screen h-full-screen">
  <HomeNavbar />
  <div className="flex flex-col md:flex-row ml-32">
      <img src={services2} alt="" className="size-16 md:mt-28 mt-10 md:ml-6 ml-[-80px]" />
      <h1 className="text-5xl text-center md:pt-28 md:mt-0 mt-[-60px] md:ml-0 ml-[-80px] pl-10 text-green-400">Weight Gain</h1>
  </div>
  <div className="text-white text-l pt-5 ml-32">
      <p className="md:pr-[1380px] md:pl-[25px] pr-[50px] pl-[10px] md:ml-0 ml-[-80px] md:mt-0 mt-5 text-justify">
      Weight gain typically involves consuming more calories than the body burns through a balanced diet and strength-building exercises. 
      8-12 rep per set , 3-5 sets per exercise. Aim for 7-9 hours of quality sleep per night.
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
                  {weightgains.length > 0 ? (
                      weightgains.map((weightgain) => (
                          <tr key={weightgain._id}>
                              <td className="md:px-44 px-4 py-3 md:py-5 border border-white">{weightgain.DAY}</td>
                              <td className="md:px-32 px-4 py-3 md:py-5 border border-white">{weightgain.BREAKFAST}</td>
                              <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{weightgain.LUNCH}</td>
                              <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{weightgain.SNACKS}</td>
                              <td className="md:px-18 px-4 py-3 md:py-5 border border-white">{weightgain.DINNER}</td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="5" className="text-center py-8 text-gray-400">
                              No Weight Gain data available.
                          </td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
  </div>

  {/* Video Section */}
  {weightgains.some((weightgain) => weightgain.VIDEO) && (
      <div className="mt-8">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {weightgains.map((weightgain) => {
                  const isUnlocked = checkVideoUnlockStatus(weightgain.DAY);

                  return weightgain.VIDEO ? (
                      <div key={maintain._id} className="text-center mb-10">
                          <video
                              className={`w-[300px] h-[200px] mx-auto mb-4 rounded-lg border border-gray-600 ${
                                  isUnlocked ? '' : 'opacity-50'
                              }`}
                              controls={isUnlocked}
                              disabled={!isUnlocked}
                          >
                              <source
                                  src={`data:video/mp4;base64,${weightgain.VIDEO}`}
                                  type="video/mp4"
                              />
                              Your browser does not support the video tag.
                          </video>
                          <button
                            className={`px-4 py-2 border text-white transition duration-300 ${
                                isUnlocked ? 'bg-green-600' : 'bg-gray-800 cursor-not-allowed'
                            }`}
                            onClick={() => isUnlocked && handleButtonClick(weightgain.DAY)}
                            disabled={!isUnlocked}
                        >
                            {weightgain.DAY} {isUnlocked ? (isCompleted(weightgain.DAY) ? '(Completed)' : '(Unlocked)') : '(Locked)'}
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


export default Weightgain
