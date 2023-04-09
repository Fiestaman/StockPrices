import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../data";

export default function Stock() {
  // set symbol to pull data for
  const { symbol } = useParams();
  const [stockData, setStockData] = useState("null");

  // set apiKey to api key found in .env file
  const apiKey = process.env.REACT_APP_API_KEY;

  // set retrieval url
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
  // const symbolData = data.find((stock) => stock.symbol === symbol);

  const getStockData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStockData(...data);
      console.log("this is data", ...data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStockData();
  }, []);

  const loaded = () => {
    return (
      <div className="info">
        {stockData.name}
        {stockData.price}
      </div>
    );
  };
  // const loaded = () => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setCoin(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return <>{stockData && stockData.price ? loaded() : loading()}</>;
}
