
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export function Page404 () {
    return (
        <div style={styles.page404} >
            <Paper sx={styles.errorWrapper}>
                <Typography>Oops! No such page!</Typography>
            </Paper>
        </div>
    );
}

const styles = {
    page404: {
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
        alignItems: 'center'
    }
};
