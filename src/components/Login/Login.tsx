import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('token', 'demo-token');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <div className="login-wrapper">
                <div className="login container ">
                    <div className="image">
                        <img src="prh_admin.svg" alt="prh admin image" />
                    </div>
                    <div className="heading container">
                        <p>Sign in to your account</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="textinput container">
                            <div className="email input-cmn">
                                <img src="Icon_User.svg" alt="mail svg" />
                                
                                 <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="password input-cmn">
                                <img src="Icon_Password.svg" alt="password svg" />
                                
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

                    <div className="forget container">
                        <p>Doesn’t remember your password? <a className="adminreset">Reset here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
