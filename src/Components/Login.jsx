import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSlice";
import { BASE_URL } from "../Utils/constants";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                email: email,
                password: password
            },{ withCredentials: true});
            dispatch(addUser(res.data));
            navigate('/feed');
        } catch(err) {
            setError(err.response.data);
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup" , { firstName, lastName, email, password} , {withCredentials: true});
            
            dispatch(addUser(res.data.data));
            navigate("/profile");
        } catch(err) {
            console.error(err);
        }
    }

    
  return (
    <div className="flex justify-center mt-20">
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <form onSubmit={(e) => e.preventDefault()}>
                <h2 className="card-title">{isLogin ? "SignIn" : "SignUp"}</h2>
                <div>
                    <label className="form-control w-full max-w-xs">
                    {!isLogin && <><div className="label">
                        <span className="label-text">First Name</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Type here" 
                        value={firstName} 
                        onChange={(e)=> setFirstName(e.target.value)}
                        className="input input-bordered w-full max-w-xs" />
                        <div className="label">
                        <span className="label-text">Last Name</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Type here" 
                        value={lastName} 
                        onChange={(e)=> setLastName(e.target.value)}
                        className="input input-bordered w-full max-w-xs" /></>}
                    <div className="label">
                        <span className="label-text">Email ID</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Type here" 
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}
                        className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input 
                        type="password" 
                        placeholder="Type here"
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}
                        autoComplete="false"
                        className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <div className="card-actions justify-end mt-2">
                    <p className="text-red-600">{error}</p>
                    <p className="cursor-pointer text-cyan-600" 
                        onClick={() => setIsLogin(!isLogin)}>{isLogin ? "New to DevTinder? Create an account" : "Already have an account? please SignIn!"}</p>
                    <p className="cursor-pointer text-cyan-600  ml-20"
                        onClick={() => navigate("/LoginHelp")}>Forgot Password?</p>
                    <button type="button" className="btn btn-primary mt-10 items-center" 
                            onClick={()=> {isLogin ? handleLogin() : handleSignUp()}}>{isLogin ? "Login" : "SignUp"}</button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login;