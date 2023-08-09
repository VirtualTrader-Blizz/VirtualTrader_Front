import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Vérification en cours...");
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/verify-email", { token })
      .then(() => {
        setMessage(
          "Votre email a été vérifié avec succès ! Vous pouvez maintenant vous connecter."
        );
      })
      .catch((error) => {
        setMessage(
          "Erreur lors de la vérification de l'email. Veuillez réessayer."
        );
      });
  }, [token]);

  return (
    <div>
      <h1>Vérification de l'E-mail</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
