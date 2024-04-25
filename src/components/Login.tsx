function Login() {
  const client_id = "c72f57285fb44f519e7fb11dad73ed97";
  const auth_endpoint = "https://accounts.spotify.com/authorize";
  const redirect_uri = "http://localhost:3000";

  window.location.href = `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`;
}

export default Login;
