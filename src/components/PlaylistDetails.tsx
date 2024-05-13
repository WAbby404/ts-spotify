import { Avatar, Typography } from "@mui/material";
import { PlaylistData, UserData } from "./types";

type PlaylistDetailsProps = {
  currentPlaylist: PlaylistData;
  userData: UserData;
};

function PlaylistDetails({ currentPlaylist, userData }: PlaylistDetailsProps) {
  return (
    <div className="flex text-white border-2 border-rose-500 gap-2">
      <img
        src={currentPlaylist.img}
        alt="Album cover INFO (bring this in)"
        className="h-24"
      />
      <div className="flex flex-col ">
        <h2 className="text-sm">PLAYLIST</h2>
        <h3 className="font-bold text-white text-xl grow flex items-center">
          {currentPlaylist.title}
        </h3>
        <div className="flex gap-1.5 items-center">
          <img src={userData.img} className="h-8 rounded-full" alt="User" />
          <Typography>{userData.name}</Typography>
          <div>
            <p className="italic font-thin">
              {currentPlaylist.totalSongs} songs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetails;
