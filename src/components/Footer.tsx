import tsi from "../assets/image/tsi.png";
import uwem from "../assets/image/uwem.png";
import uwo from "../assets/image/western.png";
import "./Footer.css";
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <>
      <footer>
        {/* Insert logos here */}
        <div className="social-wrapper">
          <a href="https://unitedwayem.ca/" target="_blank" rel="noopener noreferrer">
            <img
              className="social-logo"
              style={{ width: "150px", height: "130px" }}
              src={uwem}
              alt="UWEM Logo"
            />
          </a>

          <a href="https://uwotsi.com" target="_blank" rel="noopener noreferrer">
            <img
              className="social-logo"
              style={{ width: "130px", height: "130px" }}
              src={tsi}
              alt="TSI Logo"
            />
          </a>

          <a href="https://www.uwo.ca/" target="_blank" rel="noopener noreferrer">
            <img
              className="social-logo"
              style={{ width: "130px", height: "130px" }}
              src={uwo}
              alt="UWO Logo"
            />
          </a>
        </div>

        {/* Footer text centered below the logos */}
        <h4 className="kanit-semibold">
          © 2024 UWO TSI ALL RIGHTS RESERVED
        </h4>
        <div className="hyperlinks">
          <span>
            <Link className="link" to="/">Home</Link>
          </span>
          <span>
        <Link className="link" to="/login">Admin Login</Link>
</span>
          <span>
            <a className="link" href="https://unitedwayem.ca/event/td-stairclimb-2024/">TD StairClimb</a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
