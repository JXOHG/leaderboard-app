// Button.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface LoginButtonProps {
  disabled: boolean;
  onClick: () => void;
}

//Footer: React.FC<FooterProps> = ({className})
const LoginButton: React.FC<LoginButtonProps> = ({ disabled, onClick })=>{
  return (
    <>
      <div className="mb-2">
        <Button variant="secondary" disabled={disabled} size="lg" onClick={onClick} type="submit" style={{ width: "24vw", backgroundColor: disabled ? "#d9d9d9": "#c72614", color: disabled ? "#54585A" : "#ffffff", fontWeight:"500", borderRadius: "18px", border: "#bbb", filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25)", marginTop:"2vh"}}>
          Login
        </Button>
      </div>
    </>
  );
}

export default LoginButton;

/*backgroundColor: disabled ? "#d9d9d9" : "#007bff", // Change to blue when enabled
          color: disabled ? "#54585A" : "#ffffff", // White text when enabled*/