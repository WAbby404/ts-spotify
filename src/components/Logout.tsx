import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

type LogoutProps = {
  setToken: (emptyString: string) => void;
  userData: {
    name: string;
    img: string;
  };
};

function Logout({ userData, setToken }: LogoutProps) {
  return (
    <div>
      <Avatar src={userData.img} />
      <h2>{userData.name}</h2>
      <Button onClick={() => setToken("")}>Logout</Button>
    </div>
  );
}

export default Logout;
