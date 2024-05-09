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
    <div className="bg-slate-800 p-2">
      <div className="flex justify-center items-center gap-2">
        {/* sizes depending on screen size??? */}
        <Avatar src={userData.img} alt={`${userData.name}`} />
        <h2 className="text-white font-bold">{userData.name}</h2>
      </div>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
}

export default Logout;
