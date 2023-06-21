import React, { useState, useEffect } from "react";
import EachCandidateInputField from "./EachCandidateInputField";
import uniqueRandom from "unique-random";
import emailjs from "@emailjs/browser";
import "./index.css";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const tests = [
  "Fresher Test",
  "Freshers QA Test",
  "Full Stack Developer Test",
  "Freshers Python Test",
  "Freshers Java Test",
  "Frontend Freshers Test",
  "Shopify Developer Test",
  "MERN Developer Junior Test",
  "MERN Developer Intermediate Test",
];
const SendAssessments = () => {
  const [activeTest, setActiveTest] = useState("");
  const [studentCount, setStudentCount] = useState(1);
  const [proceeding, setProceeding] = useState(false);
  const [candidateFields, setCandidateFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/notFound");
    }
    setStudentCount(1);
    setProceeding(false);
  }, [activeTest]);
  const handleInputChange = (index, values) => {
    setCandidateFields((prevCandidateFields) => {
      const updatedFields = [...prevCandidateFields];
      updatedFields[index] = { ...updatedFields[index], ...values };
      return updatedFields;
    });
  };
  const onClickProceed = () => {
    if (activeTest === "") {
      alert("Select Test");
    } else {
      setProceeding(true);
      setCandidateFields(Array.from({ length: studentCount }, () => ({})));
    }
  };

  const sendingMailThroughEmailJs = (student) => {
    console.log(student);
    emailjs
      .send(
        "service_okvqzif",
        "template_3ujjkix",
        {
          to_name: student.name,
          from_name: "kloc",
          message: `You have been invited to write ${student.test}. \n Your login email is ${student.email} and Test pin in ${student.uniqueId}. \n Test Link : http://localhost:3000/studentLogin`,
          to_email: student.email,
        },
        "MkG09aTM7gyK7zTog"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert(`Email sent to ${student.email}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  
  const updateStudentThroughSheetDb = (student) => {
    console.log(activeTest);
    const random = uniqueRandom(10000, 100000);
    const details = {
      name: student.name,
      email: student.email,
      test: activeTest,
      phoneNo: student.phone,
      endDate: student.endDate,
      uniqueId: "kloc" + random(),
      isCompleted: "incomplete",
    };
    console.log(details, "gh");
    fetch("https://sheetdb.io/api/v1/qeetqgie30fhh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer n95196updlz3oo643ihw1vmttqaq81atj4mfk7qq",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    // sendingMailThroughEmailJs(details);
  };

  const onClickSendAssessment = () => {
    console.log(candidateFields);

    // Check if any of the candidate input fields are empty
    const isEmptyField = candidateFields.some((each) =>
      Object.values(each).some((value) => value === "")
    );

    if (isEmptyField) {
      alert("Please fill in all the candidate details");
      return;
    }

    candidateFields.forEach((each) => {
      updateStudentThroughSheetDb(each);
    });
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className='radio-button-container'>
          <div className='d-flex assessment-container'>
            <div>
              {tests.map((each, index) => (
                <div className='radio-input-field-container' key={each}>
                  <label className='each-check-box'>
                    <input
                      onChange={(e) => setActiveTest(e.target.value)}
                      value={each}
                      name='test'
                      type='radio'
                      required
                    />
                    <span className='checkmark'> {each}</span>
                  </label>
                  <input
                    disabled={activeTest !== each}
                    className='test-count-input input-fields'
                    type='text'
                    onChange={(e) => setStudentCount(e.target.value)}
                    value={activeTest === each ? studentCount : ""}
                  />
                  <br />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onClickProceed}
            className='btn btn-primary Proceed-button'
            type='button'
          >
            Proceed
          </button>
        </div>
        <div className='each-input-student-details-div'>
          {proceeding &&
            Array.from({ length: studentCount }, (_, index) => (
              <EachCandidateInputField
                key={index}
                index={index} // Pass the index as a prop
                onInputChange={(values) => handleInputChange(index, values)}
              />
            ))}

          {proceeding && (
            <div className='text-center'>
              <button
                onClick={onClickSendAssessment}
                className='btn btn-primary m-2'
              >
                Send Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SendAssessments;
