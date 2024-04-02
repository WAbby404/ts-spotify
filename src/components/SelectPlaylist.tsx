import { Avatar, Typography } from "@mui/material";

type SelectPlaylistProps = {
    playlists: string[]
}

function SelectPlaylist({playlists}: SelectPlaylistProps) {
    return (
        <div>
            {playlists.map((playlist) => {
                return (
                    <div>
                        <Avatar/>
                        <Typography variant="subtitle1">{playlist}</Typography>
                    </div>
                )
            })}
            
        </div>
    );
}

export default SelectPlaylist;