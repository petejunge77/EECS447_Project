import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect} from "react";
import { Container, Form, FormFeedback, FormGroup,
       FormText, Label, Input, Button } from "reactstrap";
import './login.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UserContext.js";



export default function SignUp(props) {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showSignUp, setShowsignup] = useState(false);
    const [res, setRes] = useState(null);
    const [touched, setTouched] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [loggedInID, setLoggedInID] = useState(false);
    
    const {user,
            setUser,
            isLoggedIn,
            setIsLoggedIn} = useAuth();
    // // error handling
    // TODO: Change back to 8
    const tooShort = password.length < 4;
    let notMatching = false;
    if (password !== confirmPassword) {
        notMatching = true;
    }


    const handleBlur = () => setTouched(true);

    const fetchData = async (userData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const res = await response.json();
            setRes(res);
            if (res.error) {
                navigate('/signup');
                alert(res.error);
            } else {
                // alert(`Welcome, '${username}'!`)
                setUser(res.user.username);
                setIsLoggedIn(true);
                navigate('/login');
 
            }

            console.log('res: ', res);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // const userData = {

    // // };
    
    function handlesignup() {
        setShowsignup(!showSignUp);
        navigate('/login');
        
    }

    function registeruser() {
        // create new user in the user table
        let userData = {
            first: first,
            last: last,
            username: username,
            password: password,
            method: 'signup'
        }
        fetchData(userData);
    }

    return (
        <Container className="popup">
            {isLoggedIn ? (<span>Username: {user} </span>) : null}
            <div className="popup-inner">

                    <Form onSubmit={registeruser}>
                        <h2 className="mb-4">Sign Up</h2>
                        <Label className="text-start">
                            First Name
                            <Input placeholder="Example" type="text" value={first} onChange={e => setFirst(e.target.value)} />
                        </Label>                        
                        <Label className="mt-4 mb-4 text-start">
                            Last Name
                            <Input  placeholder="Name" type="text" value={last} onChange={e => setLast(e.target.value)} />
                        </Label>
                        <Label className="mt-4 mb-4 text-start">
                            Create a Username
                            <Input  placeholder="beerdrinker447" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </Label>

                        
                        <FormGroup>
                        <Label className="mt-4 mb-4 text-start">
                            Create a Password
                                <Input type="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                    invalid={touched && tooShort} 
                                    onBlur={handleBlur} 

                                />
                                {tooShort && touched &&(
                                <FormFeedback>Password must be at least 8 characters long</FormFeedback>
                                )}
                            </Label>
                        </FormGroup>
                        <FormGroup>
                        <Label className="mt-4 mb-4 text-start">
                            Confirm Your Password
                                <Input type="password" 
                                    value={confirmPassword} 
                                    onChange={e => setConfirmPassword(e.target.value)} 
                                    invalid={touched && notMatching} 
                                    onBlur={handleBlur} 

                                />

                                {notMatching &&(
                                <FormFeedback>Passwords must match</FormFeedback>
                                )}
                            </Label>
                        </FormGroup>
                        <span onClick={handlesignup} style={{ display: 'block', cursor: 'pointer', textDecoration: 'underline' }}>Have an account? Log in here</span>
                        <button onClick={registeruser} type="submit">Sign Up</button>
                    </Form>
                
                
            </div>
        </Container>
    )

}