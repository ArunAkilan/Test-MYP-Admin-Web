import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BackEndUrlProfile}/api/profile/login`, {
        phone,
        password, // changed from otp to password
      });

      if (response.data.token && response.data.profile) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.profile));
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
            <img src={`${import.meta.env.VITE_BASE_URL}/navbar/myp_logo.svg`} width={72} alt="prh admin image" />
          </div>
          <div className="heading container">
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="textinput container">

              <div className="password input-cmn">
                <img src={`${import.meta.env.VITE_BASE_URL}/Icon_Password.svg`} alt="phone icon" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="email input-cmn">
                <img src={`${import.meta.env.VITE_BASE_URL}/Icon_User.svg`} alt="password icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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
