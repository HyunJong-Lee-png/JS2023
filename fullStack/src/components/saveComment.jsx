
export default function SaveComment({ setComments }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, comment } = e.target;
    const data = await fetch('http://localhost:3001/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId.value,
        comment: comment.value,
      })
    });
    const updateComment = await data.json();
    setComments((prev) => [...prev, updateComment]);
  }
  return (
    <form id="saveUser" onSubmit={handleSubmit}>
      <fieldset >
        <legend>댓글 등록</legend>
        <input type="text" placeholder="사용자 아이디" name="userId" /><br />
        <input type="text" placeholder="댓글" name="comment" /><br />
        <input type="submit" value={'등록'} /><br />
      </fieldset>
    </form>
  );
}