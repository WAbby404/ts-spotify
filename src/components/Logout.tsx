import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';

type LogoutProps = {
    username: string
}

function Logout({username}: LogoutProps) {
    return (
        <div>
            <Avatar/>
            <h2>{username}</h2>
            <Button>Logout</Button>     
        </div>
    );
}

export default Logout;