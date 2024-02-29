import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  }
  // async function register(ev) {
  //   ev.preventDefault();
  //   try {
  //     await fetch("http://localhost:4000/register", {
  //       method: "POST",
  //       body: JSON.stringify({ username, password }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   } catch (error) {
  //     console.error("Error during fetch:", error);
  //   }
  // }

  return (
    <form action="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button> Register</button>
    </form>
  );
}