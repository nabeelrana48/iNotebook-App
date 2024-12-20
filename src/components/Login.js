import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login(props) {
    const [login, setlogin] = useState({email:"", password:""});
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:login.email,
                password: login.password
            })
        })
        let json = await response.json()
        console.log(json)
        
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("Token", json.authToken);
            props.showalert("success", "Logged in Successfully.")
            history.push("/");
        }
        else{
            props.showalert("danger", "Invalid Credentials")
        }
    }
    const onChange = (e) => {
        setlogin({...login, [e.target.name] : e.target.value})
    }

    return (
        <form className='mt-5' onSubmit={handleSubmit}>
            <h2 className='my-3'>Login to Continue to iNotebook</h2>
            <div className="my-3 w-50">
                <label htmlFor="email" className="form-label">Email</label>
                <input value={login.email} onChange={onChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3 w-50">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={login.password} onChange={onChange} type="password" name="password" className="form-control" id="password" required/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}

export default Login