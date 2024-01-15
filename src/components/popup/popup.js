import { Modal } from "antd";
import Success from "../../assets/success.svg";
import "./popup.css";
import { useNavigate } from "react-router-dom";

const Popup = ({ successText, setShowResult, msg }) => {
  const navigate = useNavigate();
  return (
    <Modal
      open={true}
      footer={false}
      centered
      className="popup"
      onCancel={() => {
        navigate("/");
        setShowResult(false);
      }}
    >
      <div className="popup-image">
        <img src={Success} alt="success-popup" />
      </div>
      <h1 className="success-title">{msg}</h1>
      <h2 className="success-sub">{successText}</h2>
    </Modal>
  );
};

export default Popup;
