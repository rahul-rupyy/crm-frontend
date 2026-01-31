const NoteCard = ({ author, text, time }: { author: string; text: string; time: string }) => {
  return (
    <div>
      <p>Author: {author}</p>
      <p>Text: {text}</p>
      <p>Time: {time}</p>
    </div>
  );
};

export default NoteCard;
