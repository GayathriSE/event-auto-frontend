import { useState } from "react";
import Header from "../header/header";
import "./add-participants.css";
import { Button, Form } from "antd";
import AddnInputs from "./add";
import Loader from "../loader/loader";
import Cookies from "js-cookie";
import axios from "axios";
import Popup from "../popup/popup";

const AddParticipants = () => {
  const [val, setVal] = useState([]);
  const [load, setLoad] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const transformInput = (input) => {
    const result = [];
    for (let i = 0; i < Object.keys(input).length / 3; i++) {
      const emailKey = `email-ind-${i}`;
      const firstNameKey = `firstName-ind-${i}`;
      const lastNameKey = `lastName-ind-${i}`;

      const email = input[emailKey];
      const firstName = input[firstNameKey];
      const lastName = input[lastNameKey];

      const outputObject = {
        email: email,
        displayName: `${firstName} ${lastName}`,
      };

      result.push(outputObject);
    }

    return result;
  };

  const onFinish = (value) => {
    try {
      setLoad(true);
      if (!Cookies.get("eventId")) {
        alert("Error occured. Please try again later");
        return;
      }
      const output = transformInput(value);
      const payload = {
        eventId: Cookies.get("eventId"),
        participants: output,
      };
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/api/add-participants`,
          payload
        )
        .then((data) => {
          setLoad(false);
          if (data.data.statusCode === 200) {
            setShowResult(true);
            console.log("Hunspot sync Done");
          } else {
            setLoad(false);
            alert("Something Went Wrong!");
          }
        })
        .catch((err) => {
          setLoad(false);
          alert("Something went wrong");
          console.log(err);
        });
    } catch (e) {
      setLoad(false);
      alert("Something Went wrong!");
      console.log(e);
    }
  };

  return (
    <div>
      <Header />
      <div className="event-form-container-par">
        <div className="btn-container">
          <h1 className="form-title">Add Participants</h1>
          <Button
            className="sbt-button"
            onClick={() => setVal((prev) => [...prev, prev.length + 1])}
          >
            Add New Participant
          </Button>
        </div>
        <div className="event-form">
          <Form onFinish={onFinish}>
            {val.map((item, index) => (
              <AddnInputs key={index} id={`ind-${index}`} />
            ))}

            <div className="btn-container">
              {val.length ? (
                <Button
                  className="sbt-button"
                  htmlType="submit"
                  disabled={load ? true : false}
                >
                  Submit
                </Button>
              ) : null}
            </div>
          </Form>
        </div>
      </div>
      {load && <Loader />}
      {showResult && (
        <Popup
          successText="Participants added, and HubSpot synchronization completed."
          setShowResult={setShowResult}
        />
      )}
    </div>
  );
};

export default AddParticipants;
