export default function SaveUser({ setUsers }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, married } = e.target;
    const data = await fetch('http://localhost:3001/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        age: age.value,
        married: married.checked,
      }),
    });
    const user = await data.json();
    setUsers((prev) => [...prev, user]);
  }

  return (
    <form id="saveUser" onSubmit={handleSubmit}>
      <fieldset >
        <legend>사용자 등록</legend>
        <input type="text" placeholder="이름" name="name" /><br />
        <input type="number" placeholder="나이" name="age" /><br />
        <input id='married' type="checkbox" name="married" />
        <label htmlFor="married">결혼 여부</label><br />
        <input type="submit" value={'등록'} /><br />
      </fieldset>
    </form>
  );
}