import styled from '@emotion/styled';

const NoteContainer = styled.div`
  margin-top: 20px;
`;

const NoteTitle = styled.label`
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const NoteInput = styled.textarea`
  width: 100%;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  color: black;
  background: white;
  resize: none;

  &::placeholder {
    color: #999;
  }
`;

interface Props {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

const Note = (props: Props) => {
  const { note, setNote } = props;
  return (
    <NoteContainer>
      <NoteTitle>Need customisation?</NoteTitle>
      <NoteInput
        placeholder="Add a note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </NoteContainer>
  );
};

export default Note;
