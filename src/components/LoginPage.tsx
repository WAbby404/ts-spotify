import Button from "@mui/material/Button";

function LoginPage() {
  const client_id = "c72f57285fb44f519e7fb11dad73ed97";
  const auth_endpoint = "https://accounts.spotify.com/authorize";
  const redirect_uri = "http://localhost:3000";

  return (
    <div className="border-solid border-2 border-sky-500">
      <Button
        href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`}
      >
        Login
      </Button>
    </div>
  );
}

export default LoginPage;
