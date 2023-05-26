import React from 'react'

import {
  Typography,
  Grid,
  Box,
  Container
} from '@mui/material'

import Title from '../../components/title/title'

const TeamCard=(props)=>{
  const {image, name, role}=props;

  return(
    <Box >
      <div className='team-card'>
        <img src={image} alt={name} className="team-img"/>
      </div>
      <div className="team-name">
        <a href="">{name}</a>
        <p>{role}</p>
      </div>
    </Box>
  )
}

const Team=()=>{
  return(
    <div className="team-container">
      <Container>
        <Title title="Our Team" position="center"/>
        <Typography 
          variant="subtitle1" 
          component="h6" 
          style={{
            textAlign:'center',
            paddingTop:40
          }}>
          SOME OF THE BEST MINDS IN THE BUSINESS ARE WORKING ON THIS.
        </Typography>
        <Grid
          spacing={2}
          item container
          display="flex"
          justifyContent="space-around"
          style={{paddingTop:70}}
        >
          <TeamCard 
            image='team.jpg'
            name='Adv Rajesh Kumar'
            role='Legal'
          />
          <TeamCard 
            image='team.jpg'
            name='Amrinder Singh'
            role='Food Technologist'
          />
          <TeamCard 
            image='team.jpg'
            name='Mahesh Kumar'
            role='Sn. Manager Agritech'
          />
          <TeamCard 
            image='team.jpg'
            name='Vishal Sangwan'
            role='Manager'
          />
        </Grid>
      </Container>
    </div>
  )
}

export default Team;