import React from 'react'

import {Grid, 
        Card, 
        CardMedia, 
        CardContent, 
        Typography, 
        CardActions,
        Button,
      } from '@mui/material'

import Title from '../../components/title/title'

const FounderCard=(props)=>{
  const {name, role, image}=props;
  return(
    <Card style={{marginTop:20}}>
      <CardMedia 
        component="img"
        image={image}
        title={name}
        style={{
          border:'5px solid #f1cea8',
          boxSizing:'border-box'
        }}
      />
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h6"  
          component="h6"
          style={{
            textTransform:'uppercase',
            fontSize:18,
            fontFamily:'Montserrat,sans-serif',
            fontWeight:600
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" style={{fontWeight:'bold'}}>View Profile</Button>
      </CardActions>
    </Card>
  )
}

const Founder=()=>{
  return(
    <div style={{paddingTop:70}}>
      <Title title="Founders & Board Members" position="center"/>
      <Grid
				spacing={2}
				item container
				display="flex"
				justifyContent="space-around"
        style={{paddingTop:70}}
			>
        <FounderCard 
          name="Arshdeep S" 
          role="Managing Director(MegaFPO)" 
          image="/Arshdeep.png"
        />
        <FounderCard 
          name="Jiwan Singh" 
          role="Executive Director(MegaFPO)" 
          image="/Arshdeep.png"
        />
        <FounderCard 
          name="Neeraj Bedain" 
          role="Managing Director(MegaFPO)" 
          image="/Arshdeep.png"
        />
      </Grid>
    </div>
  )
}

export default Founder;