import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    // useEffect(() => {
    //     const auth = localStorage.getItem('token');
    //     if (auth) {
    //         navigate('/Profile');
    //     }
    // }, [])

    
    const submitData = async (e) => {

        e.preventDefault();

        if(!email || !password) {
            setError(true);
            return false;
        }
        //calling signin api
        axios.post(`http://localhost:8080/login`, { email: email, password: password }).then(res => {
                console.log("API Message: ", res.data)
                navigate('/Dashboard')  
        })
        .catch((error)=> {
            alert("Invalid credentials")
            console.log(error);
        })
    }
    

    return <>
        <form onSubmit={(e) => {
            submitData(e);
        }} 
            style={{ width: "400px", margin: "auto", marginTop: "100px" }}>

            <h1 style={{ textAlign: 'center' }}>Sign In</h1>
            <br /><br />

            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" placeholder='Email Address' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
                
                {error && !email &&<span style={{color:"red", fontSize:"16px"}}>Enter valid email</span>}
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" placeholder='Password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                {error && !password && <span style={{color:"red", fontSize:"16px"}}>Enter password</span>}
                
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
            <div className="text-center">
                <p>Don't have an account? <a href="SignUp">Sign Up</a></p>
            </div>
        </form>
    </>
}
export default SignIn