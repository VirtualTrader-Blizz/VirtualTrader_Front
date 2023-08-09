import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfilImage from "../../addons/images/profil.png";
import DropdownMenu from "../Main/Profil";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nickname, setNickname] = useState("");
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3001/security/verifyToken", { token })
        .then((response) => {
          setIsAuthenticated(true);
          setNickname(response.data.nickname);
          return axios.post("http://localhost:3001/portfolio/getbalance", {
            token,
          });
        })
        .then((response) => {
          setBalance(response.data.balance);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        });
    }
  });

  return (
    <div className="bg-white text-gray-800 shadow py-4">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl text-blue-500 font-bold">VirtualTrader</h1>
          </Link>
          <div className="flex justify-center items-center hidden md:flex space-x-8">
            {" "}
            <Link to="/wallet" className="text-lg font-medium">
              Wallet
            </Link>
            <Link to="/trading" className="text-lg font-medium">
              Trading
            </Link>
            <Link to="/more-money" className="text-lg font-medium">
              Plus d'argent
            </Link>
            <Link to="/about" className="text-lg font-medium">
              A Propos
            </Link>
          </div>
          <div className="hidden md:flex">
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="mr-8 text-lg font-medium">
                  💰 : {balance ? balance + " $" : "0 $"}
                </div>
                <DropdownMenu profil={ProfilImage} nickname={nickname} />
              </div>
            ) : (
              <div className="hidden md:flex">
                <Link to="/register">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    S'inscrire
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Se connecter
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-800 hover:text-gray-600">
              <button className="text-gray-800 hover:text-gray-600">
                Menu
              </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
