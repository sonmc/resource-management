import React, { useState } from "react";

const NoteControl = (props) => {
  const { value, onChangeNote } = props;
  const [isInput, setIsInput] = useState(false);
  const [note, setNote] = useState("");

  const handleChangeNote = (event) => {
    setNote(event.target.value);
  };
  const handleBlur = () => {
    onChangeNote(note);
    setIsInput(false);
  };
  const toggleControl = () => {
    setIsInput(true);
    setNote(value);
  };
  return (
    <React.Fragment>
      {!isInput ? <span onClick={toggleControl}>{value}</span> : <input onChange={handleChangeNote} onBlur={handleBlur} value={note} style={{ border: "none", width: "100%" }} />}
    </React.Fragment>
  );
};

export default NoteControl;
