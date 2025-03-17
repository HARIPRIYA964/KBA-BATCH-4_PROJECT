import React from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                // Clear cookies properly by refreshing the page
                document.cookie = "Token=; Max-Age=0; path=/";
                
                // Redirect to login page
                navigate('/', { replace: true });
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="rounded-md">
            Logout
        </button>
    );
};

export default Logout;