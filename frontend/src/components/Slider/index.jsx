import React from 'react';
import {Fade, Slide, Zoom} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import backImg1 from "../../assets/images/carBack7.jpg";
import backImg2 from "../../assets/images/carBack8.jpg";
import backImg3 from "../../assets/images/carBack9.jpg";

export default function Slideshow(){
    return (
        <div style={{width:'100vw', marginTop:'-300px'}}>
            <Fade arrows={false}>
                <img src={backImg1} alt="" style={{
                    width: '100%',
                    height:'100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}/>
                <img src={backImg2} alt="" style={{
                    width: '100%',
                    height:'100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}/>
                <img src={backImg3} alt="" style={{
                    width: '100%',
                    height:'100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}/>
            </Fade>
        </div>
    )
}
