class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('nor found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

const userstorage = new UserStorage();

userstorage.loginUser(id, password, onSuccess, onError);

userstorage.loginUser(
  id,
  password,
  (user) => {
    userstorage.getRoles(
      user,
      (userInfo) => { `${userInfo.name},${userInfo.role}` },
      (error) => {
        console.log(error);
      })
  },
  (error) => { console.log(error) });

//Promise로 변경
class UserStorage1 {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === 'ellie' && password === 'dream') ||
          (id === 'coder' && password === 'academy')
        ) {
          resolve(id);
        } else {
          reject(new Error('nor found'));
        }
      }, 2000);
    })
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === 'ellie') {
          resolve({ name: 'ellie', role: 'admin' });
        } else {
          reject(new Error('no access'));
        }
      }, 1000);
    })
  }
};

const userstorage1 = new UserStorage1();
userstorage1
  .loginUser(id, password)
  .then(userstorage1.getRoles)
  .then(resolve => console.log(`${resolve.name}과 ${resolve.role}`))
  .catch(console.log);

// async + await로 변경

class UserStorage2 {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === 'ellie' && password === 'dream') ||
          (id === 'coder' && password === 'academy')
        ) {
          resolve(id);
        } else {
          reject(new Error('nor found'));
        }
      }, 2000);
    })
  }
  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === 'ellie') {
          resolve({ name: 'ellie', role: 'admin' });
        } else {
          reject(new Error('no access'));
        }
      }, 1000);
    })
  }
};

const userstorage2 = new UserStorage2();
const id = prompt('enter your id');
const password = prompt('enter your password');
async function getUserInfo() {
  try {
    const userId = await userstorage2.loginUser(id, password);
    const userInfo = await userstorage2.getRoles(userId);
    console.log(`${userInfo.name}의 이름과 ${userInfo.role}을 가짐`);
  }
  catch (error) {
    console.log(error);
  }
}
getUserInfo();





