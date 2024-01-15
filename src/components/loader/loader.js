import LoaderSvg from "../../assets/loader.svg";
import "./loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <img src={LoaderSvg} alt="loader" />
    </div>
  );
};

export default Loader;
