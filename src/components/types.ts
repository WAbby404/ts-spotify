export type PlaylistData = {
  title: string;
  img: string;
  playlistId: string;
  totalSongs: number;
};

export type UserData = {
  name: string;
  img: string;
};

export type SpotifyParams = {
  method: string;
  headers: {
    Authorization: string;
  };
};
