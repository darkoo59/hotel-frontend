import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AirplaneImage from '../images/airplane.jpg';
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
          <Grid item xs={4} textAlign='center'>
            <Paper className={styles['main-content']}>
              <h1>Hotel!</h1>
              <p>Reserve your accommodation.</p>
              <NavLink to='/flights'>
                <Button variant='contained' startIcon={<ChairIcon/>} sx={{ 
                  backgroundColor: 'var(--primary-light)',
                  my: 1,
                  p: '11px 21px'
                }}>Rent a room</Button>
              </NavLink>
            </Paper>
          </Grid>
        </Grid>
        <Grid container columnSpacing={25} sx={{
          py: 9,
          px: 7,
          backgroundColor: '#bcbec9'
        }}>
          <Grid item xs={12} md={6} lg={4} sx={{ justifyContent: 'center'}}>
            <Card variant='outlined' sx={{ 
              backgroundColor: 'var(--primary-color)',
              color: 'var(--primary-text)',
              maxHeight: '280px'}}>
              <CardHeader title='Account'/>
              <CardContent>
                <Typography variant='body1'>
                  Create account and start a journey with us
                </Typography>
              </CardContent>
              <CardActions>
                <NavLink to='/register'>
                  <Button variant='contained' startIcon={<ConnectingAirportsIcon/>} sx={{
                     my: 2, 
                     backgroundColor: 'var(--primary-dark)', 
                     color: 'var(--primary-text)'}}>Register</Button>
                </NavLink>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card variant='outlined' sx={{ 
              backgroundColor: 'var(--primary-color)',
              color: 'var(--primary-text)',
              maxHeight: '280px'}}>
              <CardHeader title='Tickets'/>
              <CardContent>
                <Typography variant='body1'>
                  You want to recall memories?<br/>
                  View all your accommodations
                </Typography>
              </CardContent>
              <CardActions>
                <NavLink to='/myAccommodations'>
                  <Button variant='contained' startIcon={<BedroomParentIcon/>} sx={{ 
                    my: 2, 
                    backgroundColor: 'var(--primary-dark)', 
                    color: 'var(--primary-text)'}}>My Accommodations</Button>
                </NavLink>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    </Box>
  );
};

export default Home;