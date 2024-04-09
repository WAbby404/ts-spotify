import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

type LogoutProps = {
  LogoutAccount: () => void;
  userData: {
    name: string;
    img: string;
  };
};

function Logout({ userData, LogoutAccount }: LogoutProps) {
  return (
    <div>
      <Avatar src={userData.img} />
      <h2>{userData.name}</h2>
      <Button onClick={() => LogoutAccount()}>Logout</Button>
    </div>
  );
}

export default Logout;
