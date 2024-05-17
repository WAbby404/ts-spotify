import { Divider, Skeleton } from "@mui/material";
import PlaylistDetails from "./PlaylistDetails";
import SelectGenres from "./SelectGenres";
import EditPlaylist from "./EditPlaylist";
import { PlaylistData, UserData } from "./types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type EditPlaylistProps = {
  selectedPlaylist: PlaylistData;
  userData: UserData;
  genres: string[];
  count: number;
  newPlaylist: any[];
  isLoading: boolean | null;
  newPlaylistTitle: string;
  removeSong: (index: number) => void;
  setCount: React.Dispatch<React.SetStateAction<any>>;
  setGenres: React.Dispatch<React.SetStateAction<any>>;
  generateNewPlaylist: () => void;
};

function EditGenres(props: EditPlaylistProps) {
  const [closed, setClosed] = useState<boolean>(false);

  return (
    <div className="bg-[#0B1A0B]/75 rounded-sm p-2 md:w-[90%] xl:x-full border-4 border-indigo-500/50">
      <div
        className="flex gap-2 justify-center items-center"
        onClick={() => setClosed(!closed)}
      >
        <img
          src={require("../images/playlistGenresIcon.png")}
          alt="Playlist icon"
          className="w-7"
        />
        <h1 className="text-white">Pick your Genres</h1>
        <button className={`xl:hidden text-white font-bold`}>
          {closed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
      </div>
      {props.selectedPlaylist.title ? (
        <div className="flex flex-col gap-2 md:p-5">
          <PlaylistDetails
            closed={closed}
            userData={props.userData}
            currentPlaylist={props.selectedPlaylist}
          />
          <Divider />
          <SelectGenres
            closed={closed}
            genres={props.genres}
            setGenres={props.setGenres}
            setClosed={setClosed}
            count={props.count}
            setCount={props.setCount}
            generateNewPlaylist={props.generateNewPlaylist}
          />
          <Divider />
        </div>
      ) : (
        <div className={`flex gap-2 ${closed === true ? "" : "hidden"}`}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <div className="flex flex-col">
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={210} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={210} />
            <div className="flex gap-2">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={210} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditGenres;
