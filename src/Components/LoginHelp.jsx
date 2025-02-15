
import { useRef, useState } from "react";
import OtpComponent from "./OtpComponent";
import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../Utils/validateFormFields";
import Loading from "./Loading";

const LoginHelp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [isOtp, setIsOtp] = useState(false); 
  const [isVerified, setIsVerified] = useState(false);
  const otp = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value) => {
    otp.current = value;
  }
  
  const generateOtp = async () => {
    try {
        if(validateEmail(email)){
          setError("Invalid Email");
          return;
        }
        const res = await axios.post(BASE_URL+"/forgot-password",{ email });
        setIsOtp(true);
        setError("");
    } catch(err){
        console.log(err.response.data.message);
        setError(err.response.data.message);
    }
  }
  const verifyOtp = async () => {
    try {
        const res = await axios.post(BASE_URL+"/verify-otp",{ email, otp: otp.current});
        setError("");
        setIsOtp(false);
        setIsVerified(true);
    } catch(err){
      console.log(err.message);
      console.log(err);
      setError(err.response.data.message);
    }
  }
  const updatePassword = async () => {
    try {
        if(password !== cPassword){
          setError("password and confirm password must be same");
          return;

        }
        if(validatePassword(password)){
          setError("Please enter the strong password.");
          return;
        }
        const res = await axios.patch(BASE_URL+"/reset-password", {email, otp: otp.current,password});
        setIsChanged(true);
        setTimeout(() => {
            setIsChanged(false);
            navigate("/login");
        },3000);
        setError("");
    } catch(err){
      console.log(err.message);
      setError(err.response.data.message);
    }
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (isVerified) {
        await updatePassword();
        setIsLoading(false);
      }  else {
        await generateOtp();
        setIsLoading(false);
      }
    } catch (err) {
      console.log("ERROR: ", err.message);
      setError(err.response.data.message);
    }
  };

  return isLoading ? <Loading/> : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isChanged && <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Password Updated Successfully. Please Login!</span>
        </div>
      </div>}
    
      <div className="bg-white shadow-md rounded-xl w-1/3 p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Enter Email</label>
            <input 
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" 
              type="text"
              readOnly={isOtp || isVerified}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              value={email} 
            />
          </div>

          {isOtp && 
              <div className="mt-6">
                    <OtpComponent onOtpChange={handleOtpChange}/>
                    <div className="mt-6 flex flex-col items-center space-y-6">
                      <div className="flex justify-center space-x-6">
                        <button 
                          className="bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
                          type="button"
                          disabled={isLoading}
                          onClick={() => verifyOtp()}
                        >
                          Verify
                        </button>
                        <button 
                          className="text-teal-500 font-bold text-sm hover:text-teal-800 focus:outline-none transition duration-300"
                          onClick={handleSubmit}
                          disabled={isLoading}
                        >
                          Resend OTP
                        </button>
                      </div>
                    </div>
                </div>}


          {isVerified && (
            <>
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">Enter new Password</label>
                <input 
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" 
                  type="password" 
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">Confirm new Password</label>
                <input 
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" 
                  type="password" 
                  onChange={(e) => setcPassword(e.target.value)}
                  autoComplete="new-password"
                  value={cPassword} 
                />
              </div>
            </>
          )}
          {(error.length !==0) && <p className="text-center p-2 mx-1 my-1 text-red-600">{error}</p> }
          {!isOtp && (
            <div className="text-center">
              <button className="bg-cyan-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-cyan-700" 
                  type="submit"
                  disabled={isLoading}
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginHelp;
