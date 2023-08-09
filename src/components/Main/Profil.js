import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const DropdownMenu = ({ nickname, profil }) => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandle = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="text-gray-800 font-bold cursor-pointer flex items-center"
      >
        <img src={profil} alt="Profil" className="w-8 h-8 rounded-full mr-2" />
        <span className="text-gray-800 font-bold">{nickname}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 py-2 bg-white border rounded shadow-xl">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <span role="img" aria-label="Profil">
              👤
            </span>{" "}
            <span className="ml-4">Profil</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <span role="img" aria-label="Paramètre">
              ⚙️
            </span>{" "}
            <span className="ml-3">Paramètre</span>
          </Link>
          <Link
            to="/trading"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <span role="img" aria-label="Porte Monnaie">
              🏔
            </span>{" "}
            <span className="ml-4">Trading</span>
          </Link>
          <Link
            to="/wallet"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <span role="img" aria-label="Porte Monnaie">
              💰
            </span>{" "}
            <span className="ml-4">Porte Monnaie</span>
          </Link>
          <button
            onClick={() => {
              logoutHandle();
            }}
            className="flex items-center px-4 py-2 w-full text-gray-800 hover:bg-gray-100"
          >
            <span role="img" aria-label="Déconnexion">
              🚪
            </span>{" "}
            <span className="ml-4">Déconnexion</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
