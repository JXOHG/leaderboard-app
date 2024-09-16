import react from "react"
import tsi from "../assets/image/tsi.png"
import uwem from "../assets/image/uwem.png"
import uwo from "../assets/image/western.png"
import "./Footer.css"
export default function Footer(){

    return(
        <>
        <footer>
            
           
            {/*insert logo here */}
            <div className="social-wrapper">
            <a href="https://unitedwayem.ca/" target="_blank">
                    <img className="social-logo" style = {{width: '150px', height: '130px'}} src={uwem}/>
                </a>
                
                <a href="https://uwotsi.com" target="_blank">
                    <img className="social-logo" style = {{width: '130px', height: '130px'}} src={tsi}/>
                </a>
                <a href="https://www.uwo.ca/index.html/" target="_blank">
                    <img className="social-logo" style = {{width: '130px', height: '130px'}} src={uwo}/>
                </a>
                </div>
                
                <h4 className="kanit-semibold">
                © 2024 UWO TSI ALL RIGHTS RESERVED
            </h4>

        </footer>
        </>
    )
    

}