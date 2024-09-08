import Tr from "./tr";
import './mine_sweeper.css'

export default function MineSearch({ row, column }) {
  return (
    <div>
      <table>
        <tbody>
          {Array(Number(row)).fill('').map((tr, rowIndex) => <Tr key={rowIndex} column={column} rowIndex={rowIndex}></Tr>)}
        </tbody>
      </table>
    </div>
  );
}