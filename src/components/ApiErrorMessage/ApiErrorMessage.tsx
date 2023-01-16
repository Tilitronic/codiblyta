
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface ApiErrorMessageProps {
    status: string
    massage: string
}
export function ApiErrorMessage ({ status, massage }: ApiErrorMessageProps) {
    return (
        <div style={styles.errorMessage}>
            <Paper sx={styles.errorPaper}>
                <Typography>
                    {'API request returned an error ' + status + ' with the following message: ' + massage}
                </Typography>
            </Paper>
        </div>

    );
}

const styles = {
    errorMessage: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorPaper: {
        maxWidth: '500px',
        height: '50px',
        padding: '50px',
        display: 'flex',
        alignItems: 'center'
    }
};
