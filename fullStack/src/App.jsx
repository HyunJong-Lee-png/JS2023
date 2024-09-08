import { useEffect, useState } from 'react'
import SaveUser from './components/saveUser'
import SaveComment from './components/saveComment'
import './App.css'
import UserInfo from './components/userInfo'
import CommentInfo from './components/commentInfo'

function App() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  const initial = async () => {
    const data = await fetch('http://localhost:3001/user');
    const getUsers = await data.json();
    setUsers(getUsers);
    setComments(getUsers);
  }
  useEffect(() => {
    initial();
  }, [])
  return (
    <>
      <SaveUser setUsers={setUsers} />
      <UserInfo users={users} />
      <SaveComment setComments={setComments} />
      <CommentInfo comments={comments} setComments={setComments} />
    </>
  )
}

export default App
