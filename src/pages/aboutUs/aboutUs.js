import React from 'react'
import {Grid, Container} from '@mui/material'

import './aboutUs.css'

import BannerTop from './bannerTop'
import Story from './story'
import Founder from './founder'
import Team from './team'
import Investors from './investors'
import Contact from './contact'
import News from './news'

function AboutUs(){
  return(
    <div className="aboutus-container" >
       <BannerTop /> 
       <Container>
        <Story/>
        <Founder />
      </Container>
      <Team/>
      <Investors/>
      <Contact/>
      <News/>
    </div>
  );
}

export default AboutUs;