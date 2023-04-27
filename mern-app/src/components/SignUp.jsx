import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
const insertData = () => { 
  
  let result = axios.post(`http://localhost:8080/signupUser`, { email: email, password: password });
  
  if(result) {
      
      navigate('/SignIn');
    } else {
      alert("User already registered");
      navigate('/SignUp');
    }
    
    }
      
    return (
          <>
            <form onSubmit={insertData}  style={{ width: "400px", margin: "auto", marginTop: "100px" }}>

            <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
            <br /><br />

            
             
            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" placeholder='Email Address' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
                
                {error && !email &&<span style={{color:"red", fontSize:"16px"}}>Enter valid email</span>}
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" placeholder='Password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                {error && !password && <span style={{color:"red", fontSize:"16px"}}>Enter password</span>}
                
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example3" placeholder='Confirm Password' className="form-control" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} name="confirmpassword" />
                {error && !confirmpassword && <span style={{color:"red", fontSize:"16px"}}>Enter password again</span>}
                
            </div>

            
            <button type="submit" name="signup" className="btn btn-primary btn-block mb-4">Sign up</button>
            <div className="text-center">
              <p>Have an account? <a href="Signin">Sign In</a></p>
            </div>
        </form>
        </>
  )
}
export default SignUp;