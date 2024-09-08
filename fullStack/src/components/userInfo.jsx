export default function UserInfo({ users }) {
  return (
    <table>
      <thead>
        <tr style={{ fontWeight: '600' }}>
          <td>아이디</td>
          <td>이름</td>
          <td>나이</td>
          <td>결혼여부</td>
        </tr>
        {users.map(user =>
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.married.toString()}</td>
          </tr>)}
      </thead>
    </table>
  );
}