import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';


export default function Form(props) {

  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [theStudent, setTheStudents] = useState(student || "");
  const [theInterviewer, setTheInterviewer] = useState(interviewer || null);

  const reset = () => {
      setTheStudents("")
      setTheInterviewer(null)
  };

  const cancel = () => {
    reset()
    onCancel()
  };

  const save = () => {
    onSave(theStudent, theInterviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={theStudent}
            onChange={(event) => setTheStudents(event.target.value)} />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={theInterviewer}
          onChange={setTheInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}