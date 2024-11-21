import { useSearchParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';

import { Link } from 'react-router-dom';

import { UserLogin } from "../interfaces/UserLogin.tsx";
import { login, signup } from '../api/authAPI.tsx';
import Auth from '../utils/auth.tsx';


const Login = () => {

  const [searchParams] = useSearchParams();
  const action = searchParams.get('action'); 
  const qmessage = searchParams.get('message'); 

  const [message, setMessage] = useState(qmessage || '');


  const navigate = useNavigate();


    // State to manage the login form data
    const [loginData, setLoginData] = useState<UserLogin>({
        username: '',
        password: ''
    });

    // Handle changes in the input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData({
            // the line below spreads the loginData object into the new state (loginData)
            ...loginData,
            // the line below Dynamically sets the field in loginData whose name matches the name of the input to the new value
            // meaning it will match the inputted username value to username and password to password
            [name]: value
        });
    };

    // Handle form submission for login
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

         if( action == 'signup') try {

          const data = await signup(loginData);

          if (data.error) setMessage(data.error);

          if (data.userId) navigate('/login?message=Success. Please login.');

        } catch(err:any) {
          setMessage(err);
        }

        if (action != 'signup') try {
            // Call the login API endpoint with loginData
            const data = await login(loginData);
            // If the login is successful, call Auth.login to store the token in localStorage
            if (data.token) Auth.login(data.token);

            console.log(data);

        } catch (err:any) {
          setMessage(err);
          //  console.error('Failed to login', err); // Log any errors that occur during login
        }


    };

    return (
        <div className='form-container'>
          <form className='form login-form' onSubmit={handleSubmit}>
            <h1>{ action == 'signup' ? 'Signup' : 'Login' }</h1>

            { message ? (
              <div>{message}</div>
            ) : null }

            {/* Username input field */}
            <div className="form-group">
              <label>Username</label>
              <input 
                className="form-input"
                type='text'
                name='username'
                value={loginData.username || ''}
                onChange={handleChange}
              />
            </div>
            {/* Password input field */}
            <div className="form-group">
              <label>Password</label>
              <input 
                className="form-input"
                type='password'
                name='password'
                value={loginData.password || ''}
                onChange={handleChange}
              />
            </div>
            {/* Submit button for the login form */}
            <div className="form-group">

              <button className="btn btn-primary" type='submit'>{ action == 'signup' ? 'Signup' : 'Login' }</button>

              { action != 'signup' ? (
                <button className="btn btn-primary m-3"> <Link to="/login?action=signup">Signup</Link> </button>
              ) : null }

              

            </div>
          </form>
        </div>
      );

}

export default Login;