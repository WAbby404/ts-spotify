import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

type LogoutProps = {
  handleLogout: () => void;
  userData: {
    name: string;
    img: string;
  };
};

function Logout({ handleLogout, userData }: LogoutProps) {
  return (
    <div>
      <Avatar src={userData.img} />
      <h2>{userData.name}</h2>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
}

export default Logout;
