import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Main/Header";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/register", { username, email, password })
      .then(() => {
        setMessage(
          "Inscription réussie! Veuillez vérifier votre e-mail pour confirmer votre compte."
        );
      })
      .catch((error) => {
        setMessage("L'adresse e-mail est déjà inscrite.");
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">Inscription</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              S'inscrire
            </button>
          </form>
          {message && (
            <p className="text-red-500 text-center mt-2">{message}</p>
          )}
          <div className="text-center mt-4">
            <span className="text-gray-600">Vous avez déjà un compte ? </span>
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
