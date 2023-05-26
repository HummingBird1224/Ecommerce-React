import React from 'react'

import {
  Grid,
  Container,
  TextField,
  Typography,
  Button
} from '@mui/material'

import Title from '../../components/title/title'

const News=()=>{
  return(
    <div className='news-container'>
      <Container>
        <Title title="Stay Updated With Arya News" position="center" color='white' />
        <Grid
          container
          display="flex"
          justifyContent='center'
          alignItems='center'
        >
          <Grid
            item
            xs={12} md={6} 
          >
            <Typography variant="body1">
              Subscribe to get the latest Arya news and industry insights straight to your inbox
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              placeholder='Sign up with your email ID'
              variant="filled"
              style={{margin:'20px 0', width:'90%', background:'white'}}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="contained" 
              color='success' 
              style={{background:'#374016', padding:'15px 0', width:'90%'}} 
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default News;