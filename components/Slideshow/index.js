import GlobalStyles from "./main.styles.js";
import Header from "@components/Header";
import Footer from "@components/Footer";
import PreviewBanner from "@components/PreviewBanner";
import Image from "next/dist/client/image";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export function Slideshow(props) {
    console.log(props);
    const {slides} = props;

  return (
    <>
    <p>test</p>
    {slides.map(({title, image: {url, width, height}}) => {
        console.log(url);
           return(
           <Image src={url} width={width} height={height} alt={title}/>
           );
        })}
      <style jsx global>
        {GlobalStyles}
      </style>
    </>
  );
}

export const Slideshow2 = (props) => {
    console.log(props)
    const {slides} = props;
    console.log(slides)

    return (
        <>
      <div className="slide-container">
          <div className="slide-title">test</div>
        <Slide>
        {slides.map(({image: {url,title}})=> {
            
            return (
            <div className="each-slide" key={title}>
              <div style={{'backgroundImage': `url(${url}); height:400px; background-size:cover`}}>
                <span>{title}</span>
              </div>
            </div>)
            })}
        </Slide> 
      </div>
      <style jsx global>
        {GlobalStyles}
      </style>
      </>
    )
}