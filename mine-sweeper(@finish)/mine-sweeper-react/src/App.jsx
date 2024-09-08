import { createContext, useEffect, useReducer, useState } from 'react'
import InsertNumber from './components/insertNumber';
import MineSearch from './components/mineSearch';

export const TdState = {
  BLANK: -1,
  OPENED: 0,
  QUESTION: -3,
  FLAG: -2,
  MINE: -4,
  MINE_QUESTION: -6,
  MINE_FLAG: -5,
}

function changeTdState(rowIndex, cellIndex, copyState, type) {
  const table = copyState?.table;
  if (type === 'ChangeToFlag') {
    table[rowIndex][cellIndex] = TdState.FLAG;

  } else if (type === 'ChangeToQuestion') {
    table[rowIndex][cellIndex] = TdState.QUESTION;

  } else if (type === 'ChangeToNormal') {
    table[rowIndex][cellIndex] = TdState.BLANK;

  } else if (type === 'ChangeToMineFlag') {
    table[rowIndex][cellIndex] = TdState.MINE_FLAG;

  } else if (type === 'ChangeToMineQuestion') {
    table[rowIndex][cellIndex] = TdState.MINE_QUESTION;

  } else if (type === 'ChangeToMine') {
    table[rowIndex][cellIndex] = TdState.MINE;

  } else if (type === 'ClickBlank') {
    copyState.firstClick = true;

    if (table[rowIndex]?.[cellIndex] === TdState.BLANK) {
      table[rowIndex][cellIndex] = TdState.OPENED;

      const mineMount =
        [table[rowIndex - 1]?.[cellIndex - 1], table[rowIndex - 1]?.[cellIndex], table[rowIndex - 1]?.[cellIndex + 1],
        table[rowIndex]?.[cellIndex - 1], table[rowIndex]?.[cellIndex + 1],
        table[rowIndex + 1]?.[cellIndex - 1], table[rowIndex + 1]?.[cellIndex], table[rowIndex + 1]?.[cellIndex + 1]]
          .filter(td => [TdState.MINE, TdState.MINE_FLAG, TdState.MINE_QUESTION].includes(td)).length;

      if (mineMount) {
        table[rowIndex][cellIndex] = mineMount;
        return copyState;
      }
      //지뢰가 없으면
      changeTdState(rowIndex - 1, cellIndex - 1, copyState, 'ClickBlank');
      changeTdState(rowIndex - 1, cellIndex, copyState, 'ClickBlank');
      changeTdState(rowIndex - 1, cellIndex + 1, copyState, 'ClickBlank');
      changeTdState(rowIndex, cellIndex - 1, copyState, 'ClickBlank');
      changeTdState(rowIndex, cellIndex + 1, copyState, 'ClickBlank');
      changeTdState(rowIndex + 1, cellIndex - 1, copyState, 'ClickBlank');
      changeTdState(rowIndex + 1, cellIndex, copyState, 'ClickBlank');
      changeTdState(rowIndex + 1, cellIndex + 1, copyState, 'ClickBlank');
    }
  } else if (type === 'ClickMine') {

    if (!copyState.firstClick) {
      const mineCheck = [];
      Array(Number(copyState.row)).fill('').forEach(_ => {
        const row = [];
        mineCheck.push(row);
        Array(Number(copyState.column)).fill('').forEach(_ => {
          row.push(false);
        })
      })
      const mineMount =
        [table[rowIndex - 1]?.[cellIndex - 1], table[rowIndex - 1]?.[cellIndex], table[rowIndex - 1]?.[cellIndex + 1],
        table[rowIndex]?.[cellIndex - 1], table[rowIndex]?.[cellIndex + 1],
        table[rowIndex + 1]?.[cellIndex - 1], table[rowIndex + 1]?.[cellIndex], table[rowIndex + 1]?.[cellIndex + 1]]
          .filter(td => [TdState.MINE, TdState.MINE_FLAG, TdState.MINE_QUESTION].includes(td)).length;

      table[rowIndex][cellIndex] = mineMount;
      copyState.firstClick = true;
      return transferMine(copyState, mineCheck, rowIndex, cellIndex);


    }
    //첫번째 정상클릭 후  다음 클릭이 지뢰일 떄
    alert('너 게임 짐');
    return {
      table: [],
      firstClick: false,
      row: '',
      column: '',
      mine: '',
      transferOk: { ok: false },
    }
  }

  return copyState;
}

function transferMine(copyState, mineCheck, rowIndex, cellIndex) {
  const { table, transferOk } = copyState;
  // debugger;
  if (mineCheck[rowIndex]?.[cellIndex] === true || transferOk?.ok || mineCheck[rowIndex]?.[cellIndex] === undefined) return;
  console.log('마인체크 몇번');

  if (table[rowIndex - 1]?.[cellIndex - 1] === TdState.BLANK) {
    table[rowIndex - 1][cellIndex - 1] = TdState.MINE;
    transferOk.ok = true;
  } else if (table[rowIndex - 1]?.[cellIndex] === TdState.BLANK) {
    table[rowIndex - 1][cellIndex] = TdState.MINE;
    transferOk.ok = true;
  } else if (table[rowIndex - 1]?.[cellIndex + 1] === TdState.BLANK) {
    table[rowIndex - 1][cellIndex + 1] = TdState.MINE;
    transferOk.ok = true;
  } else if (table[rowIndex]?.[cellIndex - 1] === TdState.BLANK) {
    table[rowIndex][cellIndex - 1] = TdState.MINE;
    transferOk.ok = true;
  } else if (table[rowIndex]?.[cellIndex + 1] === TdState.BLANK) {
    table[rowIndex][cellIndex + 1] = TdState.MINE;
    transferOk.ok = true;
  } else if (table[rowIndex + 1]?.[cellIndex - 1] === TdState.BLANK) {
    table[rowIndex + 1][cellIndex - 1] = TdState.MINE;
    transferOk.ok = true;
  } else if (table[rowIndex + 1]?.[cellIndex] === TdState.BLANK) {
    table[rowIndex + 1][cellIndex] = TdState.MINE;
    transferOk.ok = true;
  } else if (table[rowIndex + 1]?.[cellIndex + 1] === TdState.BLANK) {
    table[rowIndex + 1][cellIndex + 1] = TdState.MINE;
  } else {

    mineCheck[rowIndex][cellIndex] = true;
    transferMine(copyState, mineCheck, rowIndex - 1, cellIndex - 1)
    transferMine(copyState, mineCheck, rowIndex - 1, cellIndex)
    transferMine(copyState, mineCheck, rowIndex - 1, cellIndex + 1)
    transferMine(copyState, mineCheck, rowIndex, cellIndex - 1)
    transferMine(copyState, mineCheck, rowIndex, cellIndex + 1)
    transferMine(copyState, mineCheck, rowIndex + 1, cellIndex - 1)
    transferMine(copyState, mineCheck, rowIndex + 1, cellIndex)
    transferMine(copyState, mineCheck, rowIndex + 1, cellIndex + 1)
  }
  return copyState;
}

export const TableConText = createContext('');

const reducer = (state, action) => {
  const rowIndex = action.payload?.rowIndex;
  const cellIndex = action.payload?.columnIndex;
  switch (action.type) {
    case 'makeTable': {
      return {
        ...state,
        table: action.payload,
      }
    }
    case 'ChangeToFlag': {

      return changeTdState(rowIndex, cellIndex, { ...state }, 'ChangeToFlag')

    }
    case 'ChangeToQuestion': {
      return changeTdState(rowIndex, cellIndex, { ...state }, 'ChangeToQuestion')

    }
    case 'ChangeToNormal': {
      return changeTdState(rowIndex, cellIndex, { ...state }, 'ChangeToNormal')

    }
    case 'ChangeToMineFlag': {
      return changeTdState(rowIndex, cellIndex, { ...state }, 'ChangeToMineFlag')

    }
    case 'ChangeToMineQuestion': {
      return changeTdState(rowIndex, cellIndex, { ...state }, 'ChangeToMineQuestion')

    }
    case 'ChangeToMine': {
      return changeTdState(rowIndex, cellIndex, { ...state }, 'ChangeToMine')

    }
    case 'ClickBlank': {

      return changeTdState(rowIndex, cellIndex, { ...state }, 'ClickBlank')
    }
    case 'ClickMine': {
      return changeTdState(rowIndex, cellIndex, { ...state }, 'ClickMine')
    }
    case 'gg': {
      const { payload: { row, column, mine } } = action;
      return {
        ...state,
        row,
        column,
        mine
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

const initialState = {
  table: [],
  firstClick: false,
  row: '',
  column: '',
  mine: '',
  transferOk: { ok: false },
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { row, column, mine } = state;
  const flantMine = () => {
    if (!row) return;

    const temp = Array(row * column).fill('').map((_, index) => index);
    const mines = [];
    Array(Number(mine)).fill('').forEach((_, i) => {
      const candidate = temp.splice(Math.floor(Math.random() * temp.length), 1)[0];
      mines.push(candidate);
    });
    const data = [];
    Array(Number(column)).fill('').forEach(_ => {
      const tr = [];
      data.push(tr);
      Array(Number(row)).fill('').forEach(_ => {
        tr.push(TdState.BLANK);;
      })

    })
    mines.forEach(mine => {
      const rowMine = Math.floor(mine / row);
      const cellMine = mine % column;
      data[rowMine][cellMine] = TdState.MINE;
    })

    return data;
  };

  console.log('table', state)

  useEffect(() => {
    dispatch({ type: 'makeTable', payload: flantMine() })
  }, [row, column])
  return (
    <>
      <TableConText.Provider value={{ state, dispatch, }}>
        <InsertNumber />
        {state.table?.length && <MineSearch row={row} column={column} />}
      </TableConText.Provider>
    </>
  )
}

export default App
