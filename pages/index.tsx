import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../components/layout';
import { useQuery } from '@apollo/client';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { Divider, Grid } from '@mui/material';
import StatusGrid from '../components/StatusGrid';


const Home: NextPage = () => {

  return (
    <Layout home>
      <Typography variant="h3" component="div" gutterBottom>
        Dashboard
      </Typography>
      <StatusGrid></StatusGrid>
      

    </Layout>
  );
};

export default Home;
