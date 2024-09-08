import Td from "./td";
import './mine_sweeper.css'

export default function Tr({ column, rowIndex }) {

  return (
    <tr>
      {Array(Number(column)).fill('').map((td, columnIndex) => <Td key={columnIndex} columnIndex={columnIndex} rowIndex={rowIndex} />)}
    </tr>
  );
}