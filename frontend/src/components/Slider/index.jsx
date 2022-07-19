import React from 'react';
import {Fade, Slide, Zoom} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import backImg1 from "../../assets/images/carBack3.jpg";
import backImg2 from "../../assets/images/carBack5.jpg";
import backImg3 from "../../assets/images/carBack6.jpg";

export default function Slideshow(){
    return (
        <div className="slide-container">
            <Fade arrows={false}>
                <img src={backImg1} alt="" style={{
                    width: '100vw',
                    height:'70%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}/>
                <img src={backImg2} alt="" style={{
                    width: '100vw',
                    height:'70%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}/>
                <img src={backImg3} alt="" style={{
                    width: '100vw',
                    height:'70%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }} />
            </Fade>
        </div>
    )
}
