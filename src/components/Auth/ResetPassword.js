import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/change-password", { email })
      .then(() => {
        setMessage("Lien de réinitialisation envoyé à votre e-mail.");
      })
      .catch((error) => {
        setMessage("Une erreur est survenue.");
      });
  };

  return (
    <div>
      <h1>Réinitialiser le Mot de Passe</h1>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Envoyer le lien de réinitialisation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
