import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function LoginPage() {
  return (
    <div className="border-solid border-2 border-sky-500">
      <div>
        <Button>Login with Google</Button>
        <Button>Login with Apple</Button>
        <Button>Login with Facebook</Button>
      </div>
      <div>
        <TextField />
        <TextField />
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default LoginPage;
