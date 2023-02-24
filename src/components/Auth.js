import {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';
import { useNavigate } from "react-router-dom";
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
     const navigate = useNavigate();
 
   const submitHandler = e => {
       e.preventDefault()
 
       console.log('submitHandler called')
    const body={
        username,
        password
    }

    const url='http://localhost:5000'

    axios.post (register? `${url}/register` : `${url}/login`, body)
    .then(({data})=>{
        console.log("after auth", data)
        authCtx.login(data.token, data.exp, data.userId)
        navigate("/book");
    })
    .catch((err)=>{
        setPassword('')
        setUsername('')
    })

   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type="text" placeholder='Username' autoComplete='username' value={username} onChange={e=>setUsername(e.target.value)}/>
               <input
                   className='form-input' type='password' autoComplete='current-password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={()=>{setRegister(false)}}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth

