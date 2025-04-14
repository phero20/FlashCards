import React, { useState } from "react";
import Logo from "../components/Logo";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
      props.handleAuth(username, email, password, isLoginMode); // Pass data to the parent for authentication
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-evenly bg-transparent">
      {/* Logo Section */}
      <Logo />

      {/* Form Section */}
      <form
        onSubmit={handleFormSubmit}
        className={`transform transition-transform duration-1000 ease-in-out ${
          props.loading ? "hidden" : "flex"
        } flex-col gap-4 w-full max-w-md justify-center items-center dark:text-white`}
      >
        <p
          onClick={toggleMode}
          className="text-lg font-semibold cursor-pointer mb-6"
        >
          {isLoginMode
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 border-b-2 border-black dark:border-white focus:border-teal-500 w-72 focus:outline-none bg-transparent"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border-b-2 border-black dark:border-white focus:border-teal-500 w-72 focus:outline-none bg-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border-b-2 border-black dark:border-white focus:border-teal-500 w-72 focus:outline-none bg-transparent"
        />
        <button
          type="submit"
          className="p-3 bg-teal-500 hover:bg-teal-600 font-bold rounded-xl  w-72 transition duration-300"
        >
          {isLoginMode ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
