import {
  Button,
  Skeleton,
  Typography,
  generateUtilityClasses,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { PlaylistData } from "./types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type NewPlaylistProps = {
  newPlaylistDetails: {
    img: string;
    title: string;
    songs: string[];
  };
  selectedPlaylist: PlaylistData;
  genres: string[];
  count: number;
  newPlaylist: any[];
  isLoading: boolean | null;
  newPlaylistTitle: string;
  setCount: React.Dispatch<React.SetStateAction<any>>;
};

function NewPlaylist(props: NewPlaylistProps) {
  const [closed, setClosed] = useState(false);

  const convertFromMs = (millis: any) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  };

  const render = () => {
    switch (props.isLoading) {
      case true:
        return (
          <>
            <h2 className="text-white">Generating your new playlist</h2>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </>
        );
      case false:
        return (
          <div className="text-white">
            <div
              className="flex gap-2 justify-center items-center"
              onClick={() => setClosed(!closed)}
            >
              <img
                src={require("../images/editPlaylistIcon.png")}
                alt="Playlist icon"
                className="w-7"
              />
              <h1 className="text-white">Edit your new playlist</h1>
              <button className={`md:hidden text-white font-bold`}>
                {closed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>
            <div className={`w-[90%] m-auto`}>
              {/* <img src={props.newPlaylistDetails.img} alt={`${}`} /> */}
              <h2 className={` ${closed ? "hidden" : ""}`}>
                {props.newPlaylistTitle}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className={`flex justify-between ${closed ? "hidden" : ""}`}>
                {/* <TagIcon className="sm: hidden" /> */}
                <h3>TITLE</h3>
                <h3 className="sm: hidden">ALBUM</h3>
                {/* <AccessTimeFilledIcon className="sm: hidden" /> */}
              </div>
              <ul className={`flex flex-col gap-2 ${closed ? "hidden" : ""}`}>
                {props.newPlaylist.map((song, index) => {
                  return (
                    <li key={index} className="flex justify-between">
                      <h4 className="sm: hidden">{index}</h4>
                      <div className="flex gap-2 justify-center items-center">
                        <img
                          src={song.track.album.images[2].url}
                          alt={`song.track.album.artists[0].name album cover`}
                        />
                        <div>
                          <h4>{song.track.name}</h4>
                          <h4 className="font-thin">
                            {song.track.album.artists[0].name}
                          </h4>
                        </div>
                      </div>
                      <h4 className="sm: hidden">{song.track.album.name}</h4>
                      <h4 className="sm: hidden">
                        {convertFromMs(song.track.duration_ms)}
                      </h4>
                      <h4 className="hover:text-red-500">
                        <CloseIcon />
                      </h4>
                    </li>
                  );
                })}
              </ul>
              <div className="">
                <Button variant="contained">Add Playlist to Spotify</Button>
              </div>
            </div>
          </div>
        );

      default:
        return <></>;
    }
  };

  return <div>{render()}</div>;
}

export default NewPlaylist;
