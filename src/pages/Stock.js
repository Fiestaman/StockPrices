import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Stock() {
  // set symbol to pull data for
  const { symbol } = useParams();
  const [stockData, setStockData] = useState({});

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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStockData();
  }, []);

  const loaded = () => {
    return (
      <>
        <h1 className="stockName">
          {stockData.name + " (" + stockData.symbol + ")"}
        </h1>
        <div className="info">
          <p>Price: {stockData.price}</p>
          <p>
            Change:{" "}
            <span className={stockData.change >= 0 ? "green" : "red"}>
              {stockData.change + " (" + stockData.changesPercentage + "%)"}
            </span>
          </p>
          <p>Daily High: {stockData.dayHigh}</p>
          <p>Daily Low: {stockData.dayLow}</p>
          <p>Yearly High: {stockData.yearHigh}</p>
          <p>Yearly High: {stockData.yearHigh}</p>
          <button onClick={getStockData}>Refresh</button>
        </div>
      </>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return <>{stockData?.price ? loaded() : loading()}</>;
}
