import { useRef, useState } from "react";

const OtpComponent = ({ onOtpChange }) => {
    const [otp, setOtp] = useState(["","","",""]);
    const otpRefs = [useRef(),useRef(),useRef(),useRef()];
    const handleChange = (e,index) => {
        const value = e.target.value;
        setOtp(preOtps => { 
            const newOtps = [...preOtps];
            newOtps[index] = value;
            onOtpChange(newOtps.join(""));
            return newOtps;
        });
        if(value.length == 1 && index < otpRefs.length - 1) {
            otpRefs[index+1].current.focus();
        }
    }
    return (
        <div className="flex justify-center gap-2 mb-6">
            {otpRefs.map((ref,index) => (
                <input
                    ref={ref}
                    key={index}
                    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    maxLength="1"
                    value={otp[index]}
                    type="text"
                    required
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    onChange={(e) => handleChange(e,index)}
                />
            ))}
        </div>
    )
}

export default OtpComponent;