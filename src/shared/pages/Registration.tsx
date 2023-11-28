import { Avatar, Backdrop, Box, Button, CircularProgress, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

const Register = () => {
  const [sex, setSex] = useState<number>(0);
  const [role, setRole] = useState<string>("Guest");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(role)
    if (
      !data.get("firstname") ||
      !data.get("lastname") ||
      !data.get("email") ||
      !data.get("password") ||
      !data.get("address") ||
      !data.get("phone") ||
      !data.get("birthdate")
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      console.log(process.env.REACT_APP_API)
      await axios.post(url + 'user/registration',
        {
          firstname: data.get("firstname"),
          lastname: data.get("lastname"),
          email: data.get("email"),
          password: data.get("password"),
          address: data.get("address"),
          phone: data.get("phone"),
          role: role,
          birthdate: data.get("birthdate"),
          sex: sex
        });

      navigate('/login');
      toast.success("Registration successful!");

    } catch (error: any) {
      if (error.response?.request.status === 409) {
        toast.info("Email address is already taken!");
      } else if (error.response?.request.status === 400) {
        toast.error("Invalid data format, please provide valid data!");
      } else {
        toast.error("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }

  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="text"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="dob" required>Date of Birth</InputLabel>
                <TextField
                  required
                  fullWidth
                  name="birthdate"
                  type="date"
                  id="dob"
                  autoComplete="date"
                />
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
                    <FormControlLabel value="1" control={<Radio />} label="Female" />
                    <FormControlLabel value="0" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group" required>Role</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <FormControlLabel value="Guest" control={<Radio />} label="Guest" />
                    <FormControlLabel value="Host" control={<Radio />} label="Host" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
  )
}

export default Register;