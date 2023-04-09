import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stocksData, setStocksData] = useState("null");

  // set apiKey to api key found in .env file
  const apiKey = process.env.REACT_APP_API_KEY;

  // array of stock symbols to check
  const stocksArr = ["AAPL", "MSFT", "GOOGL", "ORCL", "INTL", "TSLA", "AMZN"];

  const url = `https://financialmodelingprep.com/api/v3/quote/${stocksArr.join(
    ","
  )}?apikey=${apiKey}`;

  const getStocksData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStocksData(data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log("this is url", url);

  useEffect(() => {
    getStocksData();
  }, []);

  const loaded = () => {
    console.log(stocksData);
    const stocks = stocksData.map((stock) => {
      const handleClick = () => {
        console.log(stock.symbol);
        // navigate(`/stocks/${stock.symbol}`, { replace: true });
      };

      return (
        <>
          <tr className="stock" onClick={handleClick()}>
            <td>
              <button>{stock.name}</button>
            </td>
            <td>
              <button>{stock.symbol}</button>
            </td>
            <td>
              <button>{stock.price}</button>
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
      {stocksData && stocksData[0].symbol ? loaded() : loading()}
    </div>
  );
}
