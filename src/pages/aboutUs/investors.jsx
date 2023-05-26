import React from 'react'

import {
  Grid,
  Container
} from '@mui/material'

import Title from '../../components/title/title'

const InvestorCard=(props)=>{
  const {image, alt}=props;
  return(
    <Grid  
      item 
      xs={12} md={6} lg={3}
      // spacing={2}
      // ml={1}
      
    >
      <div className="investor-card" >
        <img src={image} alt={alt} className='investor-logo'/>
      </div>
    </Grid>
  )
}

const Investors=()=>{
  return(
    <div className="investors-container">
      <Container>
        <Title title="FRUTRI Investors" position="center" color="white"/>
        <Grid
          // spacing={2}
          container 
          display="flex"
          justifyContent="space-around"
          style={{paddingTop:70}}
        >
          <InvestorCard
            image="investor.png"
            alt="investor logo"
          />
          <InvestorCard
            image="investor.png"
            alt="investor logo"
          />
          <InvestorCard
            image="investor.png"
            alt="investor logo"
          />
          <InvestorCard
            image="investor.png"
            alt="investor logo"
          />
        </Grid>
      </Container>
    </div>
  )
}

export default Investors;