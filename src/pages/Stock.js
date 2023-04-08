import { useParams } from "react-router-dom";
import data from "../data";

export default function Stock() {
  const { symbol } = useParams();
  const symbolData = data.find((stock) => stock.symbol === symbol);

  const loaded = () => {
    return (
      <div className="info">
        {symbolData.name}
        {symbolData.lastPrice}
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

  return <>{loaded()}</>;
}
