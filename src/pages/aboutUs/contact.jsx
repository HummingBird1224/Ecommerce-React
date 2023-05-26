import React, {useState} from 'react'

import {
  Grid,
  Container,
  TextField,
  Button
} from '@mui/material'

const InputForm=(props)=>{
  const {title, helperText, setErrorText}=props;
  const inputChange=(event, title)=>{
    setErrorText(event.target.value, title)
  }

  return(
    <TextField
      required
      label={title}
      placeholder={"Enter your "+title}
      helperText={helperText}
      onChange={()=>inputChange(event,title)}
      variant="filled"
      style={{margin:'20px 0', width:'90%'}}
    />
  )
}

const Contact=()=>{
  const [phoneError, setPhoneError]=useState('')
  const [emailError, setEmailError]=useState('')
  const setErrorText=(value, title)=>{
    console.log(value, title)
    if(title='Phone Number'){
      if (value.match('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')) {
        setPhoneError('')
      } else {
        setPhoneError('Invalid Phone Number')
      }
    }
    else if(title='Email'){
      if (value.match('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')) {
        setEmailError('')
      } else {
        setEmailError('Invalid Email')
      }
    }   
  }

  return(
    <Container>
      <div className="contact-container">
        <Grid
          container 
          justifyContent="center" 
        >
          <Grid item xs={12} >
            <h3 >
              Please feel free to contact us !
            </h3>
          </Grid>
          
          <Grid item xs={12} md={6} >
            <InputForm
              title="Name" 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputForm
              title="Phone Number"
              helperText={phoneError}
              setErrorText={setErrorText}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputForm
              title="Email"
              helperText={emailError}
              setErrorText={setErrorText}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color='success' style={{background:'#374016'}}>
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Contact;