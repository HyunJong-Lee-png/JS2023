import { useContext } from "react";
import { TableConText } from "../App";

export default function InsertNumber() {
  const { dispatch } = useContext(TableConText)
  const makeTable = (e) => {
    e.preventDefault();
    const { target: { row, column, mine } } = e;
    dispatch({ type: 'gg', payload: { row: row.value, column: column.value, mine: mine.value } });

  }
  return (
    <form onSubmit={makeTable}>
      <input type='number' name='row' placeholder="가로 줄" required></input>
      <input type='number' name='column' placeholder="세로 줄" required></input>
      <input type='number' name='mine' placeholder="지뢰 갯수" required></input>
      <input type="submit" value={'생성'}></input>
    </form>
  );
}