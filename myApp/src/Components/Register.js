import React, { useState } from "react";

const Register = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(event)
    try {
      const response = await fetch(`http://localhost:8080/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, password })
      });
      const result = await response.json();
      if (result.error) {
        alert(result.error);
      } else {
        alert(result.message);
        window.location.href = '/login';
      } 
    } catch (error) {
      alert("Failed to register user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={event => setId(event.target.value)}
        placeholder="ID"
      />
      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
