import { Box, Button, TextField, Select, MenuItem} from "@mui/material"
import { useState } from "react"
import { User } from "../../model/user"
import classes from './RegistrationForm.module.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from "react"
import { getRoles } from "@testing-library/react";
import { Role } from "../../model/Role";

interface Props {
  onSubmit: (user: User) => void
}

const RegistrationForm = ({onSubmit}: Props) => {
  const [data, setData] = useState<User>({})
  const [gender] = React.useState<number>(0);
  const [role] = React.useState<string>("");
  const handleDateChange = (newDate: Date | null) => {
    data.birthdate = newDate?.toISOString()
    console.log(data.birthdate)
  };


  const handleSubmit = (e: any) => {
    console.log(data)
    e.preventDefault();
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register now</h2>
      <div className={classes.grid}>
        <TextField
          required
          label="First name"
          onChange={(e) => setData({...data, firstname: e.target.value})}
          />
        <TextField
          required
          label="Last name"
          onChange={(e) => setData({...data, lastname: e.target.value})}
        />
        <Select
            value={gender}
            label="Gender"
            onChange={(e) => setData({...data, sex: gender})}>
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
        </Select>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of birth"
            onChange={handleDateChange}
            maxDate={new Date()}
          />
        </LocalizationProvider>
        <TextField
          required
          label="Phone number"
          onChange={(e) => setData({...data, phone: e.target.value})}
        />
        <TextField
          required
          label="Address"
          onChange={(e) => setData({...data, address: e.target.value})}
        />
        <TextField
          required
          label="Email"
          onChange={(e) => setData({...data, email: e.target.value})}
        />
        <TextField
          required
          label="Password"
          type="password"
          onChange={(e) => setData({...data, password: e.target.value})}
        />
        <Select
            value={role}
            label="Role"
            onChange={(e) => setData({...data, role: role})}>
                <MenuItem value={"Host"}>Host</MenuItem>
                <MenuItem value={"Guest"}>Guest</MenuItem>
        </Select>
      </div>
      <Box marginTop="20px">
        <Button size="large" variant="contained" type="submit" >Register</Button>
      </Box>
    </form>
  )
}

export default RegistrationForm