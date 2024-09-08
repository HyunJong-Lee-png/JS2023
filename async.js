// 깔끔하게 Promise를 사용하기 위해 만들어진 sugar함수

//1. async
function fetchUser() {
  //do network reqeust in 10secs...
  return new Promise((resolve, rejcet) => {
    resolve('ellie');
  })
}
<div>하이</div>
const user = fetchUser();
user.then(console.log);
console.log(user);

// async로 바꾸면

async function fetchUser1() {
  //do network reqeust in 10secs...
  return 'ellie';
}

const user1 = fetchUser1();
user1.then(console.log);
console.log(user1);

//2. await(async안에서만 사용)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  return 'apple';
}
async function getBanana() {
  await delay(2000);
  return 'Banana';
}

/*async function getFruits(){
  const apple = getApple();
  const banana = getBanana();
  const getapple = await apple;
  const getbanana = await banana;
  return `${getapple}+${getbanana}`;
}*/

async function getAllFruits() {
  return Promise.all([getApple(), getBanana()]).then(fruits => 
    fruits.join('+')
  )
}

getAllFruits().then(console.log);

