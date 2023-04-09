import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stocksData, setStocksData] = useState([]);

  // set apiKey to api key found in .env file
  const apiKey = process.env.REACT_APP_API_KEY;

  // array of stock symbols to check
  const stocksArr = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "ORCL",
    "TSLA",
    "AMZN",
    "NVDA",
    "AMD",
    "BABA",
    "ABNB",
    "BRK-A",
    "NVR",
    "TVIX",
    "DTYS",
    "BKNG",
    "MKL",
    "WTM",
  ];

  // set retrieval url based on stocksArr
  const url = `https://financialmodelingprep.com/api/v3/quote/${stocksArr.join(
    ","
  )}?apikey=${apiKey}`;

  // get data for stocks in stocksArr
  const getStocksData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStocksData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStocksData();
  }, []);

  const loaded = () => {
    const stocks = stocksData.map((stock) => {
      const handleClick = () => {
        navigate(`/stocks/${stock.symbol}`);
      };

      return (
        <>
          <tr className="stock" onClick={handleClick}>
            <td>{stock.name}</td>
            <td>{stock.symbol}</td>
            <td>{stock.price}</td>
            <td className={stock.change >= 0 ? "green" : "red"}>
              {stock.change.toFixed(2) + " (" + stock.changesPercentage + "%)"}
            </td>
          </tr>
        </>
      );
    });

    return (
      <>
        <table>
          <thead>
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">Symbol</th>
              <th scope="col">Price</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>{stocks}</tbody>
        </table>
      </>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {stocksData[0]?.symbol ? loaded() : loading()}
    </div>
  );
}
