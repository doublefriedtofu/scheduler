import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';


export default function Form(props) {

  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [theStudent, setTheStudents] = useState(student || "");
  const [theInterviewer, setTheInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setTheStudents("");
    setTheInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  // const save = () => {
  //   onSave(theStudent, theInterviewer);
  // };

  function validate() {
    if (theStudent === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (theInterviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    props.onSave(theStudent, theInterviewer);
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
            onChange={(event) => setTheStudents(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={interviewers}
            value={theInterviewer}
            onChange={setTheInterviewer}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}