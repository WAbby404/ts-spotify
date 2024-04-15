import { Avatar, Typography } from "@mui/material";
import { PlaylistData, UserData } from "./types";

type PlaylistDetailsProps = {
  currentPlaylist: PlaylistData;
  userData: UserData;
};

function PlaylistDetails({ currentPlaylist, userData }: PlaylistDetailsProps) {
  return (
    <div className="border-solid border-2 border-sky-500 flex">
      <img src={currentPlaylist.img} alt="Album cover INFO (bring this in)" />
      <div className="flex flex-col ">
        <Typography>PLAYLIST</Typography>
        <Typography>{currentPlaylist.title}</Typography>
        <div className="flex gap-1.5 items-center">
          <Avatar src={userData.img} />
          <Typography>{userData.name}</Typography>
          <div>
            <Typography>{currentPlaylist.totalSongs} songs</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetails;
