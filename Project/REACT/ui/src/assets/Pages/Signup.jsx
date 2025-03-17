import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async(e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/signup',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    firstname: firstname,
                    lastname:lastname,
                    email:email,
                    password:password
                })
            })
            if(response.ok){
                alert('Signup successfull');
                navigate('/')
            }
            else{
                alert('signup Failed')
            }
        }
        catch(error){
            alert('Internal server error')
            console.log(error)
        }
    }



  return (
    <>
    <div  className="flex justify-center mt-52">
    <div className="bg-gray-800 w-[400px] h-[550px] pt-9 rounded-2xl shadow-lg shadow-gray-800 text-white	">
        <h1 className="text-3xl  text-center">Sign Up</h1>
        <form onSubmit={handleSignup}>
        <div className="pl-20 pt-5 mb-3">
            <label>First Name</label>
        </div>
        <input type="text" 
        className="w-[240px] ml-20 border  border-sky-500"
        id='firstname'
        name='firstname'
        value={firstname}
        onChange={(e)=> setFirstname(e.target.value)} required />
        <div  className="pl-20 pt-5 mb-3">
            <label>Last Name</label>
        </div>
        <input type="text"
         className="w-[240px] ml-20 border  border-sky-500" 
         value={lastname}
         onChange={(e) => setLastname(e.target.value)}/>
        <div className="pl-20 pt-5 mb-3">
            <label>Email</label>
        </div>
        <input type="email" 
        className="w-[240px] ml-20 border  border-sky-500" 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}/>
        
        <div className="pl-20 pt-5 mb-3">
            <label>Password</label>
        </div>
        <input type="password"
         name=""
          id="" 
          className="w-[240px] ml-20 border  border-sky-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <div className="border boder-1 border-green-400 w-16 ml-44 mt-5 text-center">
            <button>Sign Up</button>
        </div>
        <div className="flex ml-24 mt-3">
            <p className="">Don't have an account? </p><Link to='/' className="pl-2 text-green-400"> Login</Link>
        </div>
        </form>
    </div>
    
    </div>
    </>
  )
}

export default Signup
