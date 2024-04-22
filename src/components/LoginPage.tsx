import Button from "@mui/material/Button";
import Login from "./Login";

function LoginPage() {
  return (
    <div className="border-solid border-2 border-sky-500">
      <Button href={Login()}>Login</Button>
    </div>
  );
}

export default LoginPage;
