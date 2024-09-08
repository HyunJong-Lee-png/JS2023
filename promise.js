//Promise is a JS object for asynchronous operation.
//비동기적인것을 사용할 떄 콜백함수 대신 사용
//state: pending -> fulfilled or rejected
//Producer vs Consumer

//1. Producer
//when new Promise is created, the executor runs automatically.(바로실행)
const promise = new Promise((resolve, reject) => {
  //doing some heavy work (network, files)
  console.log('doing something...');
  setTimeout(() => {
    //resolve('ellie');
    reject(new Error('no network'));
  }, 2000);
});

//2. Consumer: then, catch, finally
promise
  .then((value) => { //이것도 비동기 함수, 결국 then도 map같은것처럼 같은 promis를 리턴해서 catch,finally가능
    console.log(value);
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => { console.log('finally') }); //무조건 수행

//3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num + 1), 1000);
    });
  })
  .then(num => console.log(num));

const id = prompt('enter your id');
const password = prompt('enter your password');

const userstorage = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (
      (id === 'ellie' && password === 'dream') ||
      (id === 'coder' && password === 'academy')
    ) {
      resolve(id);
    } else {
      reject((new Error('nor found')));
    }
  }, 2000)
});
userstorage
  .then(user => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === 'ellie') {
          resolve({ name: 'ellie', role: 'admin' });
        } else {
          reject(new Error('no access'));
        }
      }, 1000)
    })
  })
  .then(userInfo => { console.log((userInfo))});
