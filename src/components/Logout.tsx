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
    <div className="p-2 order-3 flex justify-center gap-4 bg-[#0B1A0B]/75 rounded-sm md:w-full xl:col-span-2 xl:row-span-1 xl:w-full xl:h-full xl:order-2">
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
