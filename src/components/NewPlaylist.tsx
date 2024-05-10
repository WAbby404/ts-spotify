import { Button, Skeleton, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

type NewPlaylistProps = {
  newPlaylistDetails: {
    img: string;
    title: string;
    songs: string[];
  };
  genres: string[];
  count: number;
  newPlaylist: any[];
  isLoading: boolean | null;
  setCount: React.Dispatch<React.SetStateAction<any>>;
};

function NewPlaylist(props: NewPlaylistProps) {
  // const [isLoading, setIsLoading] = useState(false);

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
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </>
        );
      case false:
        return (
          <div className="text-white">
            <div className="w-[90%] m-auto">
              {/* <img src={props.newPlaylistDetails.img} alt={`${}`} /> */}
              <Typography>Playlist Title</Typography>
            </div>
            <div>
              <div className="flex justify-between">
                <TagIcon />
                <Typography>TITLE</Typography>
                <Typography>ALBUM</Typography>
                <AccessTimeFilledIcon />
              </div>
              <ul>
                {props.newPlaylist.map((song, index) => {
                  return (
                    <li key={index} className="flex justify-between">
                      <Typography className="">{index}</Typography>
                      <div className="flex">
                        <img
                          src={song.track.album.images[2].url}
                          alt="replaceme"
                        />
                        <div>
                          <Typography>{song.track.name}</Typography>
                          <Typography>
                            {song.track.album.artists[0].name}
                          </Typography>
                        </div>
                      </div>
                      <Typography>{song.track.album.name}</Typography>
                      <Typography>
                        {convertFromMs(song.track.duration_ms)}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
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
