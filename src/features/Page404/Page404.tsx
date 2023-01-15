import './Page404.css';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export function Page404 () {
    return (
        <div className='page404' >
            <Paper sx={{ maxWidth: '500px', height: '50px', padding: '50px', display: 'flex', alignItems: 'center' }}>
                <Typography>Oops! No such page!</Typography>
            </Paper>
        </div>
    );
}
