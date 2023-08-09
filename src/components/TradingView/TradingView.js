import React, { useEffect, useState } from "react";
import Header from "../Main/Header";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const HomePage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [action, setAction] = useState("buy");
  const [amountInDollars, setAmountInDollars] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const token = await localStorage.getItem("token");
        if ((await localStorage.getItem("token")) === null) {
          window.location.href = "http://localhost:3000/login";
          return;
        }
        const response = await axios.post(
          "http://localhost:3001/crypto/getcryptos",
          {
            token,
          }
        );

        if (isMounted) {
          setCryptos(response.data.cryptos);
        }
      } catch (error) {
        localStorage.clear();
        window.location.reload();
      }
    };

    const intervalId = setInterval(fetchData, 6000);
    fetchData();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const priceData = Array.from({ length: 10 }, (_, i) => ({
    time: i,
    price: Math.random() * 1000,
  }));

  const handleTransactionSubmit = async () => {
    console.log("bipbip");
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    setAmountInDollars(
      (newQuantity * parseFloat(selectedCrypto.last_price)).toFixed(2)
    );
  };

  const handleAmountInDollarsChange = (e) => {
    const newAmountInDollars = e.target.value;
    setAmountInDollars(newAmountInDollars);
    setQuantity(
      (newAmountInDollars / parseFloat(selectedCrypto.last_price)).toFixed(6)
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-row flex-grow">
        <div className="w-1/4 h-screen bg-white p-4 overflow-y-auto border-r">
          <input
            type="text"
            placeholder="Rechercher..."
            className="p-2 w-full border rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredCryptos.map((crypto) => (
            <div
              key={crypto.stock_id}
              className={`p-4 border rounded shadow cursor-pointer mb-2 ${
                selectedCrypto && selectedCrypto.stock_id === crypto.stock_id
                  ? "bg-blue-100"
                  : "bg-white"
              }`}
              onClick={() => setSelectedCrypto(crypto)}
            >
              <h2 className="text-lg font-bold">{crypto.name}</h2>
              <p className="text-gray-600">Symbole: {crypto.symbol}</p>
              <p className="text-gray-700">
                Prix: ${parseFloat(crypto.last_price)}
              </p>
            </div>
          ))}
        </div>
        <div className="w-3/4 p-8">
          {selectedCrypto ? (
            <div className="grid grid-cols-2 gap-8">
              <div className="col-span-1 bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">
                  {selectedCrypto.name}
                </h1>
                <p className="text-xl text-gray-700 mb-4">
                  Symbole: {selectedCrypto.symbol}
                </p>
                <p className="text-xl text-green-500 mb-4">
                  Prix: ${parseFloat(selectedCrypto.last_price)}
                </p>
                <p className="text-xl text-blue-500 mb-4">
                  Vous possédez: 42 {selectedCrypto.symbol}{" "}
                </p>
              </div>

              <div className="col-span-1 bg-white p-8 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Acheter/Vendre</h2>
                <h3
                  className={`text-2xl ${
                    action === "buy" ? "text-green-500" : "text-red-500"
                  } mb-4`}
                >
                  Vous allez {action === "buy" ? "acheter" : "vendre"}{" "}
                  {quantity} {selectedCrypto.symbol} pour ${amountInDollars}
                </h3>
                <div className="flex flex-row space-x-4 mb-4">
                  <button
                    onClick={() => setAction("buy")}
                    className={`w-1/2 p-2 rounded ${
                      action === "buy" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                  >
                    Acheter
                  </button>
                  <button
                    onClick={() => setAction("sell")}
                    className={`w-1/2 p-2 rounded ${
                      action === "sell" ? "bg-red-500 text-white" : "bg-white"
                    }`}
                  >
                    Vendre
                  </button>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Quantité en {selectedCrypto.symbol}
                  </label>
                  <input
                    type="number"
                    placeholder="Quantité"
                    className="p-2 w-full border rounded mb-4"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />

                  <label className="text-gray-600 mb-2 block">
                    Montant total en dollars
                  </label>
                  <input
                    type="number"
                    placeholder="Montant en dollars"
                    className="p-2 w-full border rounded mb-4"
                    value={amountInDollars}
                    onChange={handleAmountInDollarsChange}
                  />

                  <button
                    onClick={handleTransactionSubmit}
                    className="p-2 w-full bg-green-500 text-white rounded"
                  >
                    Soumettre
                  </button>
                </div>
              </div>

              <div className="col-span-2 bg-white p-8 rounded shadow mt-8">
                <h2 className="text-xl font-bold mb-4">Performances</h2>
                <p className="text-gray-700">24h: +3.24%</p>
                <p className="text-gray-700">7d: -0.84%</p>
                <p className="text-gray-700">1m: +12.56%</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Sélectionnez une crypto-monnaie pour afficher les détails.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
