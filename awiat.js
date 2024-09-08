const f1 = () => {
    return new Promise((res,rej) => { 
      setTimeout(()=>{
        res("1번 주문 완료");
      }, 1000);
    });
  };
  
  const f2 = (message) => {
    console.log(message);
    return new Promise((res,rej) => { setTimeout(()=>{res("2번 주문 완료");}, 3000);});};
  
  const f3 = (message) => {
    console.log(message);
    return new Promise((res,rej) => {
      setTimeout(()=>{
        res("3번 주문 완료");
      }, 2000);
    });
  };

console.log('hi');
  async function order(){
    const order1 = await f1();
    const order2 = await f2(order1);
    const order3 = await f3(order2);
    console.log(order3);
  }
  const a = order();
console.log(a);

//순서는 22, 29에서 첫번쨰 await부터 끝까지 백그라운드로 보내고 resolve(undefined)된
//promise객체를 변수 a에 넣어줌 30

Promise.all([f1(),f2(),f3()])
.then((resolve)=> console.log(resolve));

Promise.race([f1(),f2(),f3()]).then(resolve => console.log(resolve));