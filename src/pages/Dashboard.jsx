import { useEffect, useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [filteredRows, setFilteredRows] = useState(mockData.results); //new state variable to stpre filtered rows from search
  const timestampsdata = timestamps;

  const handleRowClick = (row, timestamps) => {
    // A callback function that updates the state of the Dashboard component with the details of the selected order, and it's timestamp
    setSelectedOrderDetails({
      buySellIndicator: row.executionDetails.buySellIndicator,
      orderStatus: row.executionDetails.orderStatus,
      orderType: row.executionDetails.orderType,
    });
    setSelectedOrderTimeStamps(timestamps); //sendi
  };

  useEffect(() => {
    const filtered = mockData.results.filter((row) =>
      row["&id"].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchText]);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${filteredRows.length} orders`} //changing the no. of orders in the heading so to match with the search results
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR", "INR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          rows={filteredRows}
          timestamps={timestampsdata}
          currency={currency}
          onRowClick={handleRowClick}
        />
        {/*passing props, also changed to filteredRows so only searched text shows
         * handleRowClick is called when the row is clicked
         */}
      </div>
    </div>
  );
};

export default Dashboard;
