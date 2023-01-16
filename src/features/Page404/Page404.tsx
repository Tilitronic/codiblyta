import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export function Page404 () {
    return (
        <div style={styles.pageWrapper} >
            <Paper sx={styles.errorWrapper}>
                <Typography>Oops! No such page!</Typography>
                <Link to='/'><Typography>go to home page</Typography></Link>
            </Paper>
        </div>
    );
}

const styles = {
    pageWrapper: {
        marginTop: '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorWrapper: {
        maxWidth: '500px',
        height: '50px',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
};
