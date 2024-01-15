import { useState } from "react";
import Header from "../header/header";
import "./create-event.css";
import { Button, DatePicker, Form, TimePicker } from "antd";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import FormImage from "../../assets/form-right.svg";
import axios from "axios";
import Loader from "../loader/loader";
import Cookies from "js-cookie";
import Popup from "../popup/popup";

const CreateEvent = () => {
  const [load, setLoad] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const onFinish = (value) => {
    try {
      setLoad(true);

      const combineDateAndTime = (targetDatestr, startTimestr, endTimestr) => {
        const targetDate = new Date(targetDatestr);
        const startTime = new Date(startTimestr);
        const endTime = new Date(endTimestr);

        targetDate.setHours(
          startTime.getHours(),
          startTime.getMinutes(),
          startTime.getSeconds()
        );

        const endDate = new Date(targetDate);
        endDate.setHours(
          endTime.getHours(),
          endTime.getMinutes(),
          endTime.getSeconds()
        );

        return {
          startDate: targetDate.toISOString(),
          endDate: endDate.toISOString(),
        };
      };
      const targetDatestr = new Date(value.eventDate);
      const startTimestr = new Date(value.eventStartTime);
      const endTimestr = new Date(value.eventEndTime);

      const { startDate, endDate } = combineDateAndTime(
        targetDatestr,
        startTimestr,
        endTimestr
      );
      const payload = {
        eventTitle: value.eventName,
        eventLocation: value.eventLocation,
        eventDescription: value.eventDescription,
        startTime: startDate,
        endTime: endDate,
      };
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/create-google-event`,
          payload
        )
        .then((data) => {
          setLoad(false);
          if (data.data.eventId.id) {
            Cookies.set("eventId", data.data.eventId.id, { expires: 7 });
            setShowResult(true);
          } else {
            setLoad(false);
            alert("Something Went Wrong!");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoad(false);
          alert("Something Went Wrong!");
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
      <div className="event-form-container">
        <h1 className="form-title">Create New Event</h1>
        <div className="event-form">
          <Form className="form" onFinish={onFinish}>
            <Form.Item
              className="form-inputs"
              name="eventName"
              rules={[
                {
                  required: true,
                  message: "Event Name Required!",
                },
              ]}
            >
              <Input placeholder="Event Name*" size="large" />
            </Form.Item>
            <Form.Item
              className="form-inputs"
              name="eventLocation"
              rules={[
                {
                  required: true,
                  message: "Event Location Required!",
                },
              ]}
            >
              <Input placeholder="Event Location*" size="large" />
            </Form.Item>
            <Form.Item
              className="form-inputs"
              name="eventDescription"
              rules={[
                {
                  required: true,
                  message: "Event Description Required!",
                },
              ]}
            >
              <TextArea
                placeholder="Event Description*"
                className="form-inputs"
              />
            </Form.Item>

            <Form.Item
              className="form-inputs"
              name="eventDate"
              rules={[
                {
                  required: true,
                  message: "Event Date Required!",
                },
              ]}
            >
              <DatePicker
                placeholder="Event Date"
                size="large"
                className="form-inputs"
              />
            </Form.Item>
            <Form.Item
              className="form-inputs"
              name="eventStartTime"
              rules={[
                {
                  required: true,
                  message: "Event Start Time Required!",
                },
              ]}
            >
              <TimePicker
                placeholder="Event Start Time*"
                size="large"
                className="form-inputs"
              />
            </Form.Item>
            <Form.Item
              className="form-inputs"
              name="eventEndTime"
              rules={[
                {
                  required: true,
                  message: "Event End Time Required!",
                },
              ]}
            >
              <TimePicker
                placeholder="Event End Time*"
                size="large"
                className="form-inputs"
              />
            </Form.Item>
            <Button
              htmlType="submit"
              className="sbt-button"
              disabled={load ? true : false}
            >
              Create Event
            </Button>
          </Form>
          <div className="right-bg">
            <img src={FormImage} alt="Form" />
          </div>
        </div>
      </div>
      {load && <Loader />}
      {showResult && (
        <Popup
          successText="Event creation successful – your event is now live and thriving!"
          setShowResult={setShowResult}
        />
      )}
    </div>
  );
};

export default CreateEvent;
