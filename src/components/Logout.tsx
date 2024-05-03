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
      <div className="flex justify-center content-center gap-2">
        {/* sizes depending on screen size??? */}
        <Avatar src={userData.img} alt={`${userData.name}`} />
        <h2>{userData.name}</h2>
      </div>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
}

export default Logout;
