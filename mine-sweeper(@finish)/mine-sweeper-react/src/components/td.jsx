import { useContext, } from "react";
import './mine_sweeper.css'
import { TableConText } from "../App";
import { TdState } from "../App";

export default function Td({ rowIndex, columnIndex }) {

  const { state, dispatch } = useContext(TableConText);

  const td = state.table[rowIndex][columnIndex];
  const payload = {
    rowIndex, columnIndex
  }

  const handleTd = (e) => {
    e.preventDefault();
    switch (state.table[rowIndex][columnIndex]) {
      case TdState.BLANK:
        dispatch({ type: 'ChangeToFlag', payload, });
        return;
      case TdState.FLAG:
        dispatch({ type: 'ChangeToQuestion', payload, });
        return;
      case TdState.QUESTION:
        dispatch({ type: 'ChangeToNormal', payload, });
        return;
      case TdState.MINE:
        dispatch({ type: 'ChangeToMineFlag', payload, });
        return;
      case TdState.MINE_FLAG:
        dispatch({ type: 'ChangeToMineQuestion', payload, });
        return;
      case TdState.MINE_QUESTION:
        dispatch({ type: 'ChangeToMine', payload, });
    }
  };

  const mineSweeper = () => {
    if (td === TdState.BLANK) {
      dispatch({ type: 'ClickBlank', payload, });
    } else if (td === TdState.MINE) {
      dispatch({ type: 'ClickMine', payload });
    }
  }

  return (
    <td
      onContextMenu={handleTd}
      onClick={mineSweeper}
      className=
      {td === TdState.FLAG || td === TdState.MINE_FLAG
        ? 'flag' : td === TdState.QUESTION || td === TdState.MINE_QUESTION
          ? 'question' : td >= TdState.OPENED ? 'opened' : ''}>
      {td === TdState.MINE
        ? '' : td === TdState.FLAG || td === TdState.MINE_FLAG
          ? '!' : td === TdState.QUESTION || td === TdState.MINE_QUESTION
            ? '?' : td === TdState.BLANK || td === TdState.OPENED
              ? '' : td}

    </td>
  );
}