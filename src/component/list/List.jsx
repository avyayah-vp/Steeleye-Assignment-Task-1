import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows, timestamps, currency, onRowClick }) => {
  //passing timestamp and currency as props
  const timestampsmap = {};
  timestamps.results.forEach((result) => {
    timestampsmap[result["&id"]] = result.timestamps;
  });

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
          {/*added currency, (adding a JavaScript expression inside JSX)*/}
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <ListRow
            key={i}
            onClick={() => onRowClick(row, timestampsmap[row["&id"]])}
          >
            {/**the current row object and it's timestamsp from timestampsmap */}
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>
              {timestampsmap[row["&id"]].orderSubmitted}
            </ListRowCell>
            <ListRowCell>
              {row.bestExecutionData.orderVolume[currency]}
            </ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
