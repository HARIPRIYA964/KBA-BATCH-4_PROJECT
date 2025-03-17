import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import about1 from '../../Images/about1.jpg'
import services1 from '../../Images/services1.png'
import services2 from '../../Images/services2.png'
import services3 from '../../Images/services3.png'
import { useNavigate } from 'react-router-dom'

const Services = () => {
    const [service, setServices] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const profileStatus = localStorage.getItem('profileFilled');
        setServices(profileStatus === 'true')
    },[])

    const handleNavigation = (path) => {
        const profileStatus = localStorage.getItem('profileFilled') === 'true';
        if(profileStatus){
            navigate(path)
        } else {
            alert('Please fill your profile first')
            navigate('/profile');
        }
    }

    return (
        <>
            {/* Wrapper to prevent horizontal scrolling */}
            <div className="overflow-x-hidden">
                {/* Navbar & Hero Section */}
                <div className="bg-[url(./assets/Images/home1.jpg)] bg-cover w-full h-screen">
                    <Navbar />
                    <section id="home" className="flex flex-col items-center text-center pt-[250px]">
                        <h1 className="text-6xl md:text-8xl text-white">WELCOME To</h1>
                        <h1 className="font3 text-6xl md:text-8xl text-white pt-5">COREO</h1>
                    </section>
                </div>

                {/* About Section */}
                <section id="about" className="bg-black w-full h-auto py-20 px-4 md:px-20">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="text-green-400 text-4xl md:text-6xl">Extend Your <br />Fitness</span>
                            <p className="text-white text-justify pt-5">
                            Fitness is a vital component of a healthy lifestyle, encompassing physical activity, balanced nutrition, and mental well-being. It involves activities like strength training, cardio, and flexibility exercises to improve muscle strength, endurance, and mobility. Regular fitness practices boost energy levels, enhance mood, and reduce health risks. A consistent fitness routine not only supports a healthy body but also fosters mental clarity, confidence, and resilience. Embracing fitness as a daily priority promotes long-term health, vitality, and overall quality of life.                            </p>
                        </div>
                        <img src={about1} alt="About" className="h-[350px] md:h-[450px] w-full object-cover" />
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="bg-black w-full py-20 px-4 md:px-20">
                    <div className="text-center">
                        <span className="text-green-400 text-4xl md:text-6xl">Services</span>
                        <p className="text-white text-center max-w-3xl mx-auto pt-5">
                            Our services are designed to cater to diverse fitness needs, ensuring a comprehensive approach to achieving your health goals.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-10 mt-10">
                        {[
                            { img: services1, title: "Maintain", path: "/maintain", desc: "Regular exercise, a balanced diet, and hydration to sustain overall well-being." },
                            { img: services3, title: "Weight Loss", path: "/weightloss", desc: "Weight loss through calorie deficit, cardio, strength training, and healthy habits." },
                            { img: services2, title: "Weight Gain", path: "/weightgain", desc: "Strength training, calorie surplus, and protein-rich meals to support muscle growth." }
                        ].map((service, index) => (
                            <div key={index} className="border border-green-500 bg-green-500 w-[300px] md:w-[320px] h-[400px] p-6 text-center">
                                <img src={service.img} alt={service.title} className="h-20 mx-auto" />
                                <h3 className="text-white text-2xl pt-5 font-bold">{service.title}</h3>
                                <p className="text-white pt-4">{service.desc}</p>
                                <button
                                    className="border text-white w-[100px] h-[36px] mt-6 mx-auto block"
                                    onClick={() => handleNavigation(service.path)}
                                >
                                    Join Now
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-green-400 bg-black py-10 px-4 md:px-20">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
                        {/* About */}
                        <div>
                            <h1 className="text-white text-2xl font-bold">About COREO</h1>
                            <p className="text-gray-300 text-justify mt-4">
                                A fitness app helps track workouts, nutrition, progress, and health goals. It provides personalized plans, and exercise routines for better performance.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h1 className="text-white text-2xl font-bold">LINKS</h1>
                            <ul className="text-green-400 mt-4 space-y-2">
                                <li>Home</li>
                                <li>About</li>
                                <li>Services</li>
                            </ul>
                        </div>

                        {/* Thank You Message */}
                        <div>
                            <h1 className="text-white text-2xl font-bold">Thank You!</h1>
                            <p className="text-gray-300 mt-4">
                                Regular exercise improves strength, endurance, flexibility, and mental health, helping individuals maintain a balanced lifestyle and achieve long-term fitness goals effectively.
                            </p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-gray-400 mt-10">
                        <p>© 2025 All rights reserved | Made with ❤️ by COREO</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Services;
