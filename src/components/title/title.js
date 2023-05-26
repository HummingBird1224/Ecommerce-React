import React from 'react'

import {createStyles, Text} from '@mantine/core'

const useStyles=createStyles((theme)=>({
  title:{
    fontSize:30,
    fontWeight:700,
    // fontFamily:'Montserrat,sans-serif'
    // '&::before':{
    //   background: 'linear-gradient(270deg,#5c6b25,#8cc641)',
    //   bottom: 0,
    //   content: '""',
    //   height: 2,
    //   left: 0,
    //   position: 'absolute',
    //   width: '60%',
    // },
    // '&::after':{
    //   background: '#5c6b25',
    //   bottom: 0,
    //   content: '""',
    //   height: 2,
    //   left: '64%',
    //   position: 'absolute',
    //   width: '6%',
    // }
  },
}))

const Title=(props)=>{
  const {classes}=useStyles();
  const {title, position, color}=props;

  return(
    <Text 
      className={classes.title}
      style={{
        textAlign:position,
        color:color?color:'black'
      }}
    >
      {title}
    </Text>
  )
}

export default Title;