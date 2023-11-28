import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import styles from './Home.module.css';
import ChairIcon from '@mui/icons-material/Chair';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';

const Home = () => {
  return (
    <Box sx={{ 
      height: '500px', 
      backgroundRepeat: 'no-repeat', 
      backgroundPosition: '0px -90px', 
      backgroundSize: 'cover',
      position: 'relative'
      }}>
        <Grid container sx={{
          justifyContent: 'center',
          height: '100%',
          alignItems: 'center'
        }} >
          <h1>Welcome to Hotel Application!!!</h1>
        </Grid>
    </Box>
  );
};

export default Home;