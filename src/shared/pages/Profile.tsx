import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Stack, TextField, Typography, CircularProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { UserContext, UserContextValue } from "../context/UserContext";
import axios from "axios";

const Profile = () => {
  const { logout, isAuth, loading, changePassword, updateUserInfo, sendToken, getUserInfo} = useContext<UserContextValue>(UserContext);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const url = process.env.REACT_APP_API;
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setUserDataLoaded(false);
    try {
      let accessToken = localStorage.getItem('2w3e8oi9pjuthyf4')
      const response = await axios.get(url + 'user/user-info', { headers: {"Authorization" : `Bearer ` + accessToken} })
      if(response.status == 201){
        console.log(response.data)
        setUser({ email: response.data.email, role: response.data.roles[0], firstname: response.data.firstname, lastname: response.data.lastname,
        address: response.data.address, phone: response.data.phone, sex: response.data.sex, birthdate: response.data.birthdate  })
        setUserDetail({ email: response.data.email, firstname: response.data.firstname, lastname: response.data.lastname,
            address: response.data.address, phone: response.data.phone, sex: response.data.sex, birthdate: response.data.birthdate  })
        setBirthdate(response.data.birthdate)
        setSex(getSexValue(response.data.sex))
      }
      else{
        toast.warn(response.data)
      }
    } catch (err) {
    } finally {
       console.log(user)
      setUserDataLoaded(true)
    }
  }
  const [userDetail, setUserDetail] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    address: user?.address,
    phone: user?.phone,
    sex: user?.sex,
    birthdate: user?.birthdate,
  });
  const [updatePasswordInfo, setUpdatePasswordInfo] = useState({ oldPassword: '', token: '', newPassword: ''});
  const getSexValue = (stringValue: string) => {
    if(stringValue === "MALE")
       return 0;
    else 
       return 1;
   }
  const [sex, setSex] = useState<number>(getSexValue(user?.sex));
  const [birthdate, setBirthdate] = useState(user?.birthdate);
  
  if (loading || !userDataLoaded) return (
    <Container sx={{ height: '100vh', display: 'flex'}}>
      <CircularProgress color="primary" sx={{ mx: 'auto', mt: '50px' }}/>
    </Container>
  )

  const handleBirthdateChange = (event: any) => {
    setBirthdate(event.target.value);
  };

  const updateUser = async () => {
    console.log(userDetail.firstname)
    console.log(user?.firstname)
    if (user?.firstname == userDetail.firstname && user?.lastname === userDetail.lastname && user?.email === userDetail.email && user?.address === userDetail.address &&
        user?.phone === userDetail.phone && getSexValue(user?.sex) === sex && user?.birthdate === birthdate) {
      return;
    }

    console.log('Sex = ' + sex)

    if (!userDetail.firstname || !userDetail.lastname || !userDetail.address || !userDetail.email || !userDetail.phone || !birthdate) {
      toast.error("All fields are mandatory");
      setUserDetail({ firstname: user?.firstname, lastname: user?.lastname, email: user?.email,
        address: user?.address, phone: user?.phone, sex: user?.sex, birthdate: user?.birthdate});
      return;
    }
    await updateUserInfo(userDetail.firstname, userDetail.lastname, userDetail.email, userDetail.address, userDetail.phone, sex, birthdate)
  };

  const changeUserPassword = async () => {
    if (!updatePasswordInfo.oldPassword || !updatePasswordInfo.token || !updatePasswordInfo.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }
    
    await changePassword(updatePasswordInfo.oldPassword, updatePasswordInfo.token, updatePasswordInfo.newPassword);
  }

  const sendTokenWithMail = async () => {
    await sendToken();
  }

  return (
    <div>
    {(userDataLoaded && !loading) && (
    <Container sx={{ mt: 10 }}>
      <Stack direction="row" spacing={8} >
        <Box sx={{ minHeight: '450px' }} >
          <Card sx={{ maxWidth: '600px', height: '100%', mx: 'auto', py: '18px', px: '10px'}}>
            <CardContent>
              <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center">Your Information</Typography>
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                    sx={{ width: '100%' }}
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    value={userDetail.firstname}
                    onChange={(e) => {setUserDetail({...userDetail, firstname: e.target.value})}}
                    onKeyDown={(e) => { if(e.key === 'Enter' ) updateUser(); }} />
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                      sx={{ width: '100%' }}
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      value={userDetail.lastname}
                      onChange={(e) => {setUserDetail({...userDetail, lastname: e.target.value})}}
                      onKeyDown={(e) => { if(e.key === 'Enter' ) updateUser(); }} />
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                      sx={{ width: '100%' }}
                      id="livingPlace"
                      label="Address"
                      variant="outlined"
                      value={userDetail.address}
                      onChange={(e) => {setUserDetail({...userDetail, address: e.target.value})}}
                      onKeyDown={(e) => { if(e.key === 'Enter' ) updateUser(); }} />
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                      sx={{ width: '100%' }}
                      id="Email"
                      label="Email"
                      variant="outlined"
                      value={userDetail.email}
                      onChange={(e) => {setUserDetail({...userDetail, email: e.target.value})}}
                      onKeyDown={(e) => { if(e.key === 'Enter' ) updateUser(); }}/>
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                      sx={{ width: '100%' }}
                      id="Phone"
                      label="Phone"
                      variant="outlined"
                      value={userDetail.phone}
                      onChange={(e) => {setUserDetail({...userDetail, phone: e.target.value})}}
                      onKeyDown={(e) => { if(e.key === 'Enter' ) updateUser(); }}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group" required>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={sex}
                    onChange={(event) => setSex(parseInt(event.target.value))}
                  >
                    <FormControlLabel value="0" control={<Radio />} label="Male" />
                    <FormControlLabel value="1" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                <InputLabel htmlFor="dob" required>Date of Birth</InputLabel>
                <TextField
                  required
                  fullWidth
                  name="birthdate"
                  type="date"
                  id="dob"
                  autoComplete="date"
                  value={birthdate}
                  onChange={handleBirthdateChange}
                />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button onClick={updateUser} sx={{ ml: '8px'}} variant="contained" size="medium" color="primary">Save</Button>
            </CardActions>
          </Card>
        </Box >

        <Box sx={{ minHeight: '450px' }}>
          <Card sx={{ maxWidth: '600px', height: '100%', mx: 'auto', py: '18px', px: '10px'}}>
            <CardContent>
              <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center">Change Password</Typography>
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                    sx={{ width: '100%' }}
                    id="currentPassword"
                    label="Current Password"
                    variant="outlined"
                    type="password"
                    value={updatePasswordInfo.oldPassword}
                    onChange={(e) => {setUpdatePasswordInfo({...updatePasswordInfo, oldPassword: e.target.value})}}
                    onKeyDown={(e) => { if(e.key === 'Enter' ) changeUserPassword(); }} />
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                      sx={{ width: '100%' }}
                      id="newPassword"
                      label="New Password"
                      variant="outlined"
                      type="password"
                      value={updatePasswordInfo.newPassword}
                      onChange={(e) => {setUpdatePasswordInfo({...updatePasswordInfo, newPassword: e.target.value})}}
                      onKeyDown={(e) => { if(e.key === 'Enter' ) changeUserPassword(); }} />
                </Grid>
                <Grid item xs={10} md={8} lg={7}>
                  <TextField 
                      sx={{ width: '100%' }}
                      id="token"
                      label="Reset password token"
                      variant="outlined"
                      type="password"
                      value={updatePasswordInfo.token}
                      onChange={(e) => {setUpdatePasswordInfo({...updatePasswordInfo, token: e.target.value})}}
                      onKeyDown={(e) => { if(e.key === 'Enter' ) changeUserPassword(); }} />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button onClick={changeUserPassword} sx={{ ml: '8px'}} variant="contained" size="medium" color="primary">Save</Button>
            </CardActions>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button onClick={sendTokenWithMail} sx={{ ml: '8px'}} variant="contained" size="medium" color="primary">Send token to email</Button>
            </CardActions>
          </Card>
        </Box> 
      </Stack>
    </Container>
    ) }</div>
  );
}

export default Profile;