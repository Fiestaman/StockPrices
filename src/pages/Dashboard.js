import { useNavigate } from "react-router-dom";

export default function Dashboard(data) {
  const navigate = useNavigate();

  const stocksArr = ["AAPL", "MSFT", "GOOGL", "ORCL", "INTL", "TSLA", "AMZN"];

  const stocks = data.stocks.map((stock) => {
    const handleClick = () => {
      navigate(`/stocks/${stock.symbol}`, { replace: true });
    };

    return (
      <>
        <tr className="stock" onClick={handleClick}>
          <td>{stock.name}</td>
          <td>{stock.symbol}</td>
          <td>{stock.lastPrice}</td>
        </tr>
      </>
    );
  });

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
