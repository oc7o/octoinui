import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Layout from '../components/layout';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME_QUERY } from '../auth/graphql';
import Carousel from 'react-material-ui-carousel'
import { Button, Paper, Box } from '@mui/material';


const Home: NextPage = () => {

  const client = useApolloClient();

  const { data, loading, error } = useQuery(ME_QUERY);

  // const fetchMe = async () => {
  //   console.log(client);
    
  //   const { data } = await client.query({
  //     query: ME_QUERY
  //   })

  //   console.log(data);
  //   return data.me;
  // }
  // const me = fetchMe();
  // console.log(me);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Layout home>
      <Typography variant="h3" component="div" gutterBottom>
        Dashboard
      </Typography>
      {/* <StatusGrid></StatusGrid> */}

      <Carousel>
        <Paper>
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          />
        </Paper>
        <Paper>
          <Typography variant="h5" component="div" gutterBottom>
            Dashboard
          </Typography>
        </Paper>
        <Paper>
          <Typography variant="h5" component="div" gutterBottom>
            Dashboard
          </Typography>
        </Paper>
      </Carousel>

      Welcome { data && data.me && <Typography variant="h5" component="div" gutterBottom>{data.me.username}</Typography> }
      { error && <Typography variant="h5" component="div" gutterBottom>{error.message}</Typography> }
      

    </Layout>
  );
};

export default Home;
