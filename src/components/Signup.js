import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Signup(props) {
    const [signup, setsignup] = useState({username:"", email:"", password:"", cpassword:""});
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: signup.username,
                email:signup.email,
                password: signup.password
            })
        })
        let json = await response.json()
        console.log(json)
        
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("Token", json.authToken);
            props.showalert("success", "Account Created Successfully.")
            history.push("/");
        }
        else{
            props.showalert("danger", "Invalid Details")
        }
    }
    const onChange = (e) => {
        setsignup({...signup, [e.target.name] : e.target.value})
    }

    return (
        <form className='mt-5' onSubmit={handleSubmit}>
            <h2 className='my-3'>Sign up to iNotebook</h2>
            <div className="mb-3 w-50">
                <label htmlFor="username" className="form-label">Username</label>
                <input value={signup.username} onChange={onChange} type="text" className="form-control" name="username" id="username" aria-describedby="emailHelp" required minLength={3}/>
            </div>
            <div className="mb-3 w-50">
                <label htmlFor="email" className="form-label">Email</label>
                <input value={signup.email} onChange={onChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3 w-50">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={signup.password} onChange={onChange} type="password" name="password" className="form-control" id="password" required minLength={5}/>
            </div>
            <div className="mb-3 w-50">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input value={signup.cpassword} onChange={onChange} type="password" name="cpassword" className="form-control" id="cpassword" required minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary" >Sign Up</button>
        </form>
    )
}

export default Signup