import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import backimg1 from "../../img/back1.jpg";
import backimg2 from "../../img/back2.jpg";
import backimg3 from "../../img/back3.jpg";

function CarouselComponent(){
	return(
		<Carousel infiniteLoop={true}  autoPlay>
			<div>
				<img alt="" src={backimg1} />
				<p className="legend">Expore through the crop fields and data</p>
			</div>
			<div>
				<img alt="" src={backimg2} />
				<p className="legend">Get all your desired crops delivered to your location</p>
			</div>
			<div>
				<img alt="" src={backimg3} />
				<p className="legend">Get to know about the current agriculture data in the country</p>
			</div>
		</Carousel>
	);
}

export default CarouselComponent;
