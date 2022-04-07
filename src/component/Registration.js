import React, { useEffect, useState } from 'react'
import {Button,Container,Typography,Stack,TextField,Alert,CircularProgress,} from '@mui/material';

import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";

const Registration = () => {
    const auth = getAuth();
    let [username,setUsername] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [cpassword,setCpassword] = useState("")
    let [error,setError] = useState("")
    let [loading,setLoading] = useState(false)

    let handleSubmit = () => {
        if(!username){
            setError("Please Give An Username")
        }else if(!email){
            setError("Please Give An Email")
        }else if(!password){
            setError("Please Give A Password")
        }else if(!cpassword){
            setError("Please Give A Confirm Password")
        }else if(password.length < 8){
            setError("Password Must Be Greater Than 8 Character")
        }else if(password != cpassword){
            setError("Password and Confirm Password Not Match")

        }
        else{
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then(()=>{
                updateProfile(auth.currentUser, {
                    displayName: username,
                    photoURL: "images/demoprofile.png"
                  }).then(() => {
                    setLoading(false)
                  }).catch((error) => {
                    setLoading(false)
                  });
            })
            .catch((error) => {
                const errorMessage = error.message;
                if(errorMessage.includes("auth/email-already-in-use")){
                    setError("Email Already In Use")
                }
                setLoading(false)
              });
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setError("")
        },3000)
    },[error])

  return (
    <Container maxWidth="sm" sx={{ mt:5}}>
        <Stack spacing={2} sx={{ border: 1 ,p:4,borderRadius: 2}}>
        <Typography variant="h4" component="h4" align="center" sx={{py:1, mb:2,bgcolor: 'primary.main',color:'white',borderRadius: 1}}>
                Registration
        </Typography>
        {error &&
            <Alert variant="filled" severity="warning" >
                {error}
            </Alert>
        }

       
        
        <TextField  onChange={(e)=> setUsername(e.target.value)} id="outlined-basic" label="User Name" variant="outlined" />
        <TextField onChange={(e)=> setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" type="email" />
        <TextField onChange={(e)=> setPassword(e.target.value)} id="outlined-basic" label="Passowrd" variant="outlined" type="password" />
        <TextField onChange={(e)=> setCpassword(e.target.value)} id="outlined-basic" label="Confirm Password" variant="outlined" type="password" />

        {loading 
        
            ?
            <Button variant="outlined"><CircularProgress/></Button>
            :
            <Button onClick={handleSubmit} variant="contained">Sign Up</Button>
        }


        <Typography variant="p" component="p" align="center" sx={{py:1, mb:2,borderRadius: 1}}>
                Already Have An Account? Login
        </Typography>
        </Stack>
        
    </Container>
  )
}

export default Registration