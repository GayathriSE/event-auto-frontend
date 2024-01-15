import { Input, Form } from "antd";
import "./add-participants.css";

const AddnInputs = ({ id }) => {
  return (
    <div className="add-inputs">
      <Form.Item
        name={`email-${id}`}
        className="form-inputs-par"
        id={id}
        rules={[
          {
            required: true,
            type: "email",
            message: "Email required!",
          },
        ]}
      >
        <Input placeholder="Participant Email Id" />
      </Form.Item>
      <Form.Item
        name={`firstName-${id}`}
        className="form-inputs-par"
        id={id}
        rules={[
          {
            required: true,
            message: "first name required!",
          },
        ]}
      >
        <Input placeholder="Participant First Name" />
      </Form.Item>
      <Form.Item
        name={`lastName-${id}`}
        id={id}
        className="form-inputs-par"
        rules={[
          {
            required: true,
            message: "last name required!",
          },
        ]}
      >
        <Input placeholder="Participant Last Name" />
      </Form.Item>
    </div>
  );
};

export default AddnInputs;
