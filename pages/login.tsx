import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Layout from '../components/layout';

import { Button, Box, FormControl } from '@mui/material'
import {TextField} from '@mui/material';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { LOGIN_MUTATION, ME_QUERY } from '../auth/graphql';
import { useAuthContext } from '../auth/AuthContext';

const Login: NextPage = () => {
    
    const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);
    
    const { state, dispatch } = useAuthContext();

    const client = useApolloClient();

    // const login = async (e: React.FormEvent<HTMLFormElement>) => {
    //     console.log('login')
    //     e.preventDefault()
    //     console.log(e.target);
        
        
    //     // const res = await client.mutate({
    //     //     mutation: LOGIN_MUTATION,
    //     //     variables: {
    //     //         username: username.value,
    //     //         password: password.value
    //     //     }
    //     // })
    //     // console.log(res);
        

    //     await loginMutation({
    //         variables: {
    //             username: username.value,
    //             password: password.value
    //         }
    //     })
    //     // console.log(data, loading, error)
    // }

    // if (loading) {
    //     return <h1>Loading...</h1>
    // }

  return (
    <Layout>
      <Typography variant="h3" component="div" gutterBottom>
        Login
      </Typography>

      <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={async (e) => {            
            e.preventDefault();
            const { username, password } = e.currentTarget.elements
            // console.log(loginMutation);
            
            // await loginMutation({
            //     variables: {
            //         username: username.value,
            //         password: password.value
            //     }
            // })

            const r = await client.mutate({
                mutation: LOGIN_MUTATION,
                variables: {
                    username: username.value,
                    password: password.value
                }
            })

            console.log(r);

            if (r.data.tokenAuth.success) {
                console.log("success");
                
                await dispatch({ type: 'set_token', value: r.data.tokenAuth.obtainPayload.token });
                await dispatch({ type: 'set_refresh', value: r.data.tokenAuth.obtainPayload.refreshToken });
                await dispatch({ type: 'set_loggedIn', value: true });

                // const q = await client.query({
                //     query: ME_QUERY
                // })
                

            }

            // console.log(data, loading, error)
          }}
      >
        <FormControl>
          <TextField
            required
            id="username"
            label="Username"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained">Log in</Button>
          <Button variant="outlined">Sign up</Button>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default Login;