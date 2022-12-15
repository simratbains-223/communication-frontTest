import React from "react";
import "./login-page.css";

export default function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    // event.preventDefault()
    // if(formData.password === #sqlitedatabase) {
    //     console.log("Successful")
    // } else {
    //     console.log("Passwords do not match")
    //     return
    // }
  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email address'
          className='form--input'
          name='email'
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type='password'
          placeholder='Password'
          className='form--input'
          name='password'
          onChange={handleChange}
          value={formData.password}
        />

        <button className='form--submit'>Sign in</button>
      </form>
    </div>
  );
}
