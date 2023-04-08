import { Link, useNavigate as navigate } from "react-router-dom";

export default function Dashboard(data) {
  const stocksArr = ["AAPL", "MSFT", "GOOGL", "ORCL", "INTL", "TSLA", "AMZN"];

  const stocks = data.stocks.map((stock) => {
    const handleClick = () => {
      console.log(stock.symbol);
      navigate(`/stocks/${stock.symbol}`, { replace: true });
    };

    return (
      <>
        {/* <Link to={`/stocks/${stock.symbol}`}> */}
        <tr className="stock" onClick={handleClick()}>
          <td>
            <Link to={`/stocks/${stock.symbol}`}>
              <button>{stock.name}</button>
            </Link>
          </td>
          <td>
            <Link to={`/stocks/${stock.symbol}`}>
              <button>{stock.symbol}</button>
            </Link>
          </td>
          <td>
            <Link to={`/stocks/${stock.symbol}`}>
              <button>{stock.lastPrice}</button>
            </Link>
          </td>
        </tr>
        {/* </Link> */}
      </>
    );
  });
  console.log(data.stocks);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
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
    </div>
  );
}
