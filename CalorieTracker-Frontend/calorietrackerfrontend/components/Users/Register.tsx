import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register() {

    return (
        <form>
            <TextField label="Email" variant="outlined" fullWidth margin="normal" required />
            <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
            </Button>
        </form>
    );
}

export default Register;