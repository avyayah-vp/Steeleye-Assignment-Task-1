import styles from "./ListRow.module.css";

const ListCell = ({ children, onClick }) => { //added a onCLick prop to the component so the callback function can be called when a row is clicked
  return <tr className={styles.cell} onClick={onClick}>{children}</tr>;
};

export default ListCell;
