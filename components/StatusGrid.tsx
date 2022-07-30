
import { Divider, Grid } from '@mui/material';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useQuery } from '@apollo/client';

import QUERY_SYSTEMSTATUS from './SystemQuery.graphql';


export default function StatusGrid () {

    const { data, loading, error } = useQuery(QUERY_SYSTEMSTATUS);

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) return <h1>{`Error! ${error}`}</h1>;


    return <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
            <Typography variant="h6" component="div" align='center' gutterBottom>
                CPU Usage
            </Typography>
            <br />
            <CircularProgressWithLabel size="16rem" value={Math.round(parseFloat(data.systemStatus.cpuUsage))} />
            <Typography component="div" align='center' gutterBottom>
                CPU Count: {data.systemStatus.cpuCount}
            </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
            <Typography variant="h6" component="div" align='center' gutterBottom>
                RAM Usage
            </Typography>
            <br />
            <CircularProgressWithLabel size="16rem" value={Math.round((parseInt(data.systemStatus.memoryAvailable) / parseInt(data.systemStatus.memoryTotal)) * 100)} />
            <Typography component="div" align='center' gutterBottom>
                Total RAM: {data.systemStatus.memoryTotal / 1024 / 1024} MB
            </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
            <Typography variant="h6" component="div" align='center' gutterBottom>
                System Status
            </Typography>
            <List>
                <ListItem disablePadding>
                    System: {data.systemStatus.system} {data.systemStatus.release}
                </ListItem>
            </List>
        </Grid>
    </Grid>
}