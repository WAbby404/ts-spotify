import { useContext } from "react";
import { SelectedPlaylistContext, UserDataContext } from "../App";

type PlaylistDetailsProps = {
  closed: boolean;
};

function PlaylistDetails({ closed }: PlaylistDetailsProps) {
  const userData = useContext(UserDataContext);
  const currentPlaylist = useContext(SelectedPlaylistContext);
  return (
    <div
      className={`flex text-white gap-2 pt-2 ${closed ? "hidden xl:flex" : ""}`}
    >
      <img
        src={currentPlaylist.img}
        alt={`${currentPlaylist.title} album art`}
        className="h-24"
      />
      <div className="flex flex-col">
        <h2 className="text-sm">PLAYLIST</h2>
        <h3 className="font-bold text-white text-xl grow flex items-center">
          {currentPlaylist.title}
        </h3>
        <div className="flex gap-1.5 items-center">
          <img src={userData.img} className="h-8 rounded-full" alt="User" />
          <h3>{userData.name}</h3>
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
