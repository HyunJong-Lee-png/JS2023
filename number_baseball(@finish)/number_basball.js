 var x = 'hi';
    const $form = document.querySelector('#form');
    const $input = document.querySelector('#input');
    const $logs = document.querySelector('#logs');

    const answer = [];
    const shuffle = Array(10).fill().map((e, i) => i);
    [1, 2, 3, 4].forEach(e => {
      answer.push(shuffle.splice(Math.floor(Math.random() * shuffle.length), 1)[0])
    })

    let challenge;
    $input.addEventListener('input', (e) => {
      challenge = e.target.value;
    })

    setTimeout(() =>{console.log('hi')})
    setTimeout(() =>{console.log('wow')})
    let strike = 0;
    let ball = 0;
    let out = 0;
    const alreadyInput = [];
    $form.addEventListener('submit', onSubmit);

    function onSubmit(e) {
      strike = 0;
      ball = 0;
      e.preventDefault();
      if (new Set(challenge).size !== 4 || !Number(challenge) || alreadyInput.includes(challenge)) {
        alert('다시 입력하세요.');
      } else {
        alreadyInput.push(challenge);
        const joinAnswer = answer.join('');
        [1, 2, 3, 4].forEach((e, i) => {
          if (joinAnswer[i] === challenge[i]) {
            strike++;
          } else if (challenge.indexOf(joinAnswer[i]) > -1) {
            ball++;
          }
        });
        strike + ball === 0 ? out++ : out;
        if (alreadyInput.length === 10 || out === 3) {
          alert('게임오버');
          out = 0;
          return;
        }
        $logs.append(`스트라이크: ${strike}개, 볼: ${ball}개, 아웃: ${out}개`, document.createElement('br'));
      }
      if (strike === 4) {
        alert('승리!');
        return;
      }
      e.target['input'].value = '';
      e.target['input'].focus();
    }