import React from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBitcoinSign,
  faChartLine,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow justify-center items-start pt-20">
        <div className="container flex flex-wrap mx-auto w-full items-center">
          <div className="w-3/6 p-4 flex flex-col">
            <div className="bg-blue-500 p-4 rounded-lg mb-8">
              <h1 className="text-5xl font-bold text-white text-center leading-tight mb-4">
                Devenez Trader de Crypto
              </h1>
              <p className="text-2xl text-white text-center">
                Tradez comme un professionnel sans frais.
              </p>
            </div>
            <p className="text-xl pl-5 pr-5 text-gray-700">
              Échangez, achetez, et explorez le monde passionnant de la
              crypto-monnaie. Sans frais, sans risque. Idéal pour les débutants
              comme pour les traders expérimentés.
            </p>
          </div>
          <div className="w-1/6"></div>
          <div className="w-2/6 p-4">
            <div className="box p-4 mb-4 bg-white flex items-center rounded-lg shadow-lg">
              <div className="icon mr-4 text-3xl flex items-center justify-center bg-blue-100 rounded-full h-12 w-12 pt-1">
                <FontAwesomeIcon icon={faBitcoinSign} />
              </div>
              <div className="ml-7">
                <h2 className="text-2xl font-bold">Tradez du Bitcoin !</h2>
                <p className="text-lg">
                  Plusieurs cryptos listées pour plus de réalisme.
                </p>
              </div>
            </div>
            <div className="box p-4 mb-4 bg-white flex items-center rounded-lg shadow-lg">
              <div className="icon mr-4 text-3xl flex items-center justify-center bg-blue-100 rounded-full h-12 w-12 pt-1">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div className="ml-7">
                <h2 className="text-2xl font-bold">
                  Les Courbes en Temps Réel
                </h2>
                <p className="text-lg">
                  Suivez les cours en direct pour optimiser vos trades.
                </p>
              </div>
            </div>
            <div className="box p-4 mb-4 bg-white flex items-center rounded-lg shadow-lg">
              <div className="icon mr-4 text-3xl flex items-center justify-center bg-blue-100 rounded-full h-12 w-12 pt-1">
                <FontAwesomeIcon icon={faProjectDiagram} />
              </div>
              <div className="ml-7">
                <h2 className="text-2xl font-bold">
                  Explorez un Projet Fictif
                </h2>
                <p className="text-lg">
                  Apprenez et explorez sans risque. Idéal pour s'initier au
                  trading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-around items-center bg-gray-100 p-4 rounded-lg mb-20 container">
          {[
            { name: "BTC", price: "$40,000", change: "+5%" },
            { name: "ETH", price: "$2,500", change: "-2%" },
            { name: "XRP", price: "$0.90", change: "+3%" },
            { name: "LTC", price: "$150", change: "+1%" },
            { name: "ADA", price: "$1.25", change: "0%" },
          ].map((coin, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-xl font-bold">{coin.name}</p>
              <p className="text-lg">{coin.price}</p>
              <p
                className={`text-sm ${
                  coin.change.startsWith("+")
                    ? "text-green-500"
                    : coin.change.startsWith("-")
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {coin.change} 24h
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
