import {Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
 export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const  submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate(redirect)
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'info',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[error, isAuthenticated, dispatch, navigate])

    return (
        <Fragment>
            <div className='admin-popup'>
                <img className="arrow-img" src='https://3.bp.blogspot.com/-7p7u_Imcauc/W6BcRIbrW3I/AAAAAAAMKiU/4M212erT13snd7ncKI9S2dV37ikVQnTsQCLcBGAs/s1600/AS0004412_00.gif'/>
                <Alert key='primary' variant='primary'>
                <div>
                    <h3><b style={{color:'black'}}>ADMIN:</b></h3> 
                   <p>Email:<b> prasath@gmail.com</b></p>
                   <p>Password:<b style={{color:'green'}}> 1234</b></p>
                </div>
                </Alert>
            </div>
    
            <MetaData title={`Login`} />
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" style={{borderRadius:'30px'}}>
                        <h1 className="mb-3" style={{textAlign:'center'}}>Login</h1>
                        <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e =>setPassword(e.target.value)}
                        />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        
                        >
                        LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
                
            </div>
        </Fragment>
    )
}