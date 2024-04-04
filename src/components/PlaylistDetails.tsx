import { Avatar, Typography } from "@mui/material";

type PlaylistDetailsProps = {
  playlistDetails: {
    img: string;
    title: string;
  };
};

function PlaylistDetails({ playlistDetails }: PlaylistDetailsProps) {
  return (
    <div className="border-solid border-2 border-sky-500">
      <img src={playlistDetails.img} alt="Album cover INFO (bring this in)" />
      <div>
        <Typography>Figure out what to put here</Typography>
        <Typography>{playlistDetails.title}</Typography>
        <div>
          <Avatar />
          <Typography>Username</Typography>
          <div>
            <Typography>
              # of songs BULLET Amount of time (hr & minutes)
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetails;
