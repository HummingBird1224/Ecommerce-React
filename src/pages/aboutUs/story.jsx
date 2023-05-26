import React from 'react'

import {Box, Typography} from '@mui/material'
import {Text} from '@mantine/core'

import Title from '../../components/title/title'

const Story=()=>{
  return(
    <div style={{paddingTop:70}}>
      <Title title="Our Story" position="left"/>
      <Box className="story-content">
        <Text  className="story-content-title">
          Who we are
        </Text>
        <br/>
        <br/>
        <Text className="story-content-main">
           Arya.ag, India’s largest grain commerce platform, connects 
            sellers and buyers of agriproduce, providing complete assurance 
            on quantity, quality and payments. The platform eliminates 
            distress sales of farmers’ produce by enabling farmgate storage 
            and seamless finance options, offering farmers the freedom of 
            when and whom to sell to. With visibility into over 10,000 
            commodity storage points across the country, Arya assures 
            year-round supply to SME and corporate buyers with embedded financing 
            options. 
            <br/>
            <br/>
            Arya’s clients include farmers, farmer producer organisations 
            (FPOs), financial institutions, SME agri processors, commodity traders
             and corporate agribusinesses. Arya also offers warehouse receipt financing 
             via Aryadhan, its wholly owned NBFC subsidiary. Aryadhan provides credit to 
             farmers, FPOs and SME aggregators (processors/traders) who have stored agri 
             commodities in the Arya warehouse network.
        </Text>
      </Box>
    </div>
  );
}

export default Story;