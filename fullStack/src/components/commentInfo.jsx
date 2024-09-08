export default function CommentInfo({ comments, setComments }) {

  const handleUpdate = (userId) => async () => {
    try {
      const comment = window.prompt('수정할 메세지를 입력하세요.');
      const data = await fetch('http://localhost:3001/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          comment,
        }),
      });
      const updatedUser = await data.json();
      setComments((prev) => prev.map(user => user._id === updatedUser._id ? { ...user, comment: updatedUser.comment } : user));
    } catch (err) {
      console.log(err.message);
    }

  };
  const handleDelete = (userId) => async () => {
    await fetch('http://localhost:3001/user', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    });
    setComments((prev) => prev.filter(user => user._id !== userId));
  };

  return (
    <table>
      <tbody>
        <tr style={{ fontWeight: '600' }}>
          <td>아이디</td>
          <td>작성자</td>
          <td>댓글</td>
          <td>수정</td>
          <td>삭제</td>
        </tr>
        {comments.map(comment =>
          comment.comment &&
          <tr key={comment._id}>
            <td>{comment._id}</td>
            <td>{comment.name}</td>
            <td>{comment.comment}</td>
            <td><button onClick={handleUpdate(comment._id)}>수정</button></td>
            <td><button onClick={handleDelete(comment._id)}>삭제</button></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}