import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'

const LoginPage = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    const loginSubmit = async(e) =>{
        e.preventDefault ();
        try{
            const response = await fetch('/api/login',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({email:email,password:password})
            })
            if(response.ok){
                const data = await response.json();
                console.log(data)
                localStorage.setItem('userType', JSON.stringify(data));
                if(data.userType === 'admin'){
                    navigate('/dashboard')
                    alert('Admin login successful')
                }
                else{
                    navigate('/services')
                    alert('User login successful')
                }
            }
                else{
                    alert('Invalid userName or Password')
                }
            
        }
        catch(error){
            alert('Internal server error',error)
        }
    }
  return (
   <>
   <div className="flex justify-center mt-52">
   <div className="bg-gray-800 w-[350px] h-[400px] pt-9 rounded-2xl shadow-lg shadow-gray-800 text-white">
        <span className=" pl-20  text-2xl">Login</span>
        <form onSubmit={loginSubmit}>
        <div className="pl-16 pt-5 mb-3">
            <label>Email:</label>
        </div>
        <input type="email" 
        className="w-[210px] ml-16 border  border-sky-500" 
        value={email}
        onChange={(e) => setEmail(e.target.value) } required/>
        <div className="pl-16 pt-5 mb-3">
            <label>Password</label>
            </div>
        <input type="password" 
        className="w-[210px] ml-16 border  border-sky-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)} required />
        <div className="border boder-1 border-green-400 w-16 ml-36 mt-5 text-center">
            <button type='submit'>Login</button>
        </div>
        <div className="ml-28 mt-5"> 
            <a href="" >Forgot Password?</a>
        </div>
        <div className="flex ml-16 mt-3">
            <p className="">Don't have an account? </p><Link to='sign-up' className="pl-2 text-green-400"> Sign Up</Link>
        </div>
        </form>
    </div>
   </div>
   </>
  )
}

export default LoginPage
