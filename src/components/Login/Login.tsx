import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"

const Login = () => {
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://13.203.171.5:3001/api/profile/verify', {
        otp,
        phone
      });

      console.log("Response from backend:", response.data);
      console.log("Response keys:", Object.keys(response.data));

      if (response.data.token && response.data.profile) {
        // Store token and profile data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.profile));
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <div className="login-wrapper">
        <div className="login container">
          <div className="image">
            <img src="PRH Admin new.svg" alt="prh admin image" />
          </div>
          <div className="heading container">
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="textinput container">
              
              <div className="password input-cmn">
                <img src="Icon_Password.svg" alt="phone icon" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
              </div>

<div className="email input-cmn">
                <img src="Icon_User.svg" alt="otp icon" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  required
                />
              </div>

              <button type='submit' className='signin'>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
