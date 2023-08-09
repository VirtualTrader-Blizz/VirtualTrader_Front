import React, { useState } from "react";
import Header from "../Main/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setMessage("Connexion réussie!");
        history.push("/");
      })
      .catch((error) => {
        setMessage(
          "E-mail ou mot de passe incorrect ou l'email n'as pas été verifié."
        );
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-2 border rounded border-gray-300"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-2 border rounded border-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Se connecter
            </button>
          </form>
          {message && (
            <p className="text-red-500 text-center mt-2">{message}</p>
          )}
          <div className="text-center mt-4">
            <span className="text-gray-600">Vous n'avez pas de compte ? </span>
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
