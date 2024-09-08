
//DOM
const $ul = document.querySelector('.playground>ul');
const $score = document.querySelector('.score');

//SETTING
const GAME_ROWS = 20;
const GAME_COLS = 10;

//DATA
let score = 0;
let duration = 500;
let downInterval = null;
let tempMovingItem;
let prevTempItem = {
  type: 'tree',
  direction: 0,
  top: 0,
  left: 1,
}

const BLOCKS = {

  square: [
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
  ],
  bar: [
    [[1, 0], [2, 0], [3, 0], [4, 0]],
    [[2, -1], [2, 0], [2, 1], [2, 2]],
    [[1, 0], [2, 0], [3, 0], [4, 0]],
    [[2, -1], [2, 0], [2, 1], [2, 2]],
  ],
  tree: [
    [[1, 0], [0, 1], [1, 1], [2, 1]],
    [[2, 1], [1, 0], [1, 1], [1, 2]],
    [[1, 2], [0, 1], [1, 1], [2, 1]],
    [[0, 1], [1, 0], [1, 1], [1, 2]],
  ],
  zeeRight: [
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[0, 1], [1, 0], [1, 1], [0, 2]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[0, 1], [1, 0], [1, 1], [0, 2]],
  ],
  zeeLeft: [
    [[2, 0], [1, 0], [1, 1], [0, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
    [[2, 0], [1, 0], [1, 1], [0, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
  ],
  elLeft: [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [0, 0], [0, 1], [0, 2]],
    [[0, 0], [1, 0], [2, 0], [2, 1]],
    [[0, 2], [1, 0], [1, 1], [1, 2]],
  ],
  elRight: [
    [[2, 0], [2, 1], [1, 1], [0, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 0], [0, 1], [1, 0], [2, 0]],
    [[1, 0], [2, 0], [2, 1], [2, 2]],
  ],

}

const movingItem = {
  type: 'tree',
  direction: 0,
  top: 0,
  left: 3,
}

function createTable() {
  tempMovingItem = { ...movingItem };
  Array(GAME_ROWS).fill().forEach((e, i) => {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    $ul.append(li);
    li.append(ul);
    Array(GAME_COLS).fill().forEach((e, j) => {
      const li = document.createElement('li');
      ul.append(li);
    })
  });
}
let click = true;
createTable();
renderBlocks();
let tId = setInterval(intervalFuc, duration);
let tId2;

function intervalFuc() {
  prevTempItem = { ...tempMovingItem };
  tempMovingItem.top++;
  renderBlocks('down', 'interval');
}



function renderBlocks(down, interval, willRemoved) {

  const { type, direction, top, left } = tempMovingItem;
  let count = 0;

  if (click) {
    if (prevTempItem.top === tempMovingItem.top &&
      prevTempItem.left === tempMovingItem.left &&
      prevTempItem.direction === tempMovingItem.direction &&
      prevTempItem.type !== tempMovingItem.type) {

      alert(`게임오버, 당신의 점수는 ${$score.textContent}점 입니다.`);
      document.removeEventListener('keydown', moveItem);
      clearInterval(tId);
      clearInterval(tId2);
      return;
    }
  }

  click = true;
  let saveLiIndex;
  if (willRemoved) {
    willRemoved.forEach((row, i) => {
      const boolean = Array.from(row.children[0].children).every((li, j) => {
        return li.classList.contains('stop');
      });
      if (boolean) {
        Array.from(row.children[0].children).forEach((li) => {
          li.className = '';
        })
        $score.textContent = ++score;
        count++;
        Array.from($ul.children).forEach((li, j) => {
          if (li === row) {
            saveLiIndex = j;
            if (count) {
              const transLi = [];
              const type = [];
              let durationIndex = 0;
        
              try {
                Array.from($ul.children).forEach((firstLi, i) => {
                  firstLi.children[0].querySelectorAll('li').forEach((secondLi, j) => {
                    if (secondLi.classList.contains('stop')) {
                      transLi.push([i, j]);
                      type.push(Array.from(secondLi.classList)[0]);
                      secondLi.className = '';
                    }
                  });
                  durationIndex++;
                  if (durationIndex === saveLiIndex) {
                    throw new Error('stopped');
                  }
                });
              }
              catch {
        
                transLi.forEach((lItag, i) => {
                  $ul.children[lItag[0] + 1].children[0].children[lItag[1]].classList.add(`${type[i]}`, 'stop');
                })
              }
            }
          }
        })
      }
    });
   
  }

  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach((movingBlock) => {
    movingBlock.className = '';
  });

  try {
    BLOCKS[type][direction].forEach(block => {
      debugger;
      const x = block[0] + left;
      const y = block[1] + top;
      const target = $ul.children[y]?.children[0].children[x];
      if (target) {
        target.classList.add(type, 'moving');
        if (target.classList.length === 4 || target.classList.length === 3) {
          throw new Error('stopped');
        }
        if (target.classList.contains('stop')) {
          throw new Error('stopped');
        }
        return;
      }
      if (!target) {
        throw new Error('stopped');
      }

    })

  } catch {
    if (interval) {

      tempMovingItem.top--;
      clearInterval(tId2);
    } else {
      tempMovingItem = { ...prevTempItem };
    }
    const { type, direction, top, left } = tempMovingItem;

    if (down) {

      const movingBlocks = document.querySelectorAll('.moving');
      movingBlocks.forEach((movingBlock) => {

        if (movingBlock.classList.length === 3) {

          movingBlock.classList.remove('moving');
          return;
        } else if (movingBlock.classList.length === 4) {
          movingBlock.classList.remove(type, 'moving');
          return;
        }
        movingBlock.className = '';
      });

      const condidate = [];

      BLOCKS[type][direction].forEach(block => {
  
        const x = block[0] + left;
        const y = block[1] + top;
        const target = $ul.children[y]?.children[0].children[x];
        target.classList.add(type, (down === 'side' || down === 'up') ? 'moving' : 'stop');
        condidate.push(target.parentNode.parentNode); //한줄 꽉찼을 때 지워질 수 있는 태그인덱스들
      });

      const willRemoved = Array.from(new Set(condidate)).sort((a, b) => a - b);

      if (down === 'side' || down === 'up') return;
      preventSpace = true;
      tempMovingItem = { ...movingItem, type: ['tree', 'bar', 'square','elRight','elLeft','zeeLeft', 'zeeRight'][Math.floor(Math.random() * 7)] };
      renderBlocks('', '', willRemoved);
      return;
    }

    renderBlocks();

  }
}
document.addEventListener('keydown', moveItem);

let preventSpace = true;
function moveItem(e) {
  prevTempItem = { ...tempMovingItem };
  switch (e.code) {
    case 'ArrowRight': {
      tempMovingItem.left++;
      renderBlocks('side');
      break;
    }
    case 'ArrowLeft': {
      tempMovingItem.left--;
      renderBlocks('side');
      break;
    }
    case 'ArrowDown': {
      tempMovingItem.top++;
      renderBlocks('down');
      break;
    }
    case 'ArrowUp': {
      tempMovingItem.direction >= 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction++;
      renderBlocks('up');
      break;
    }
    case 'Space': {
      if (preventSpace) {
        tId2 = setInterval(intervalFuc, 0);
        preventSpace = false;
      }

    }
    default:
      break;
  }

}



