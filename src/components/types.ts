// ryancavanagh in node_modules for spotify types

export type PlaylistData = {
  title: string;
  img: string;
  playlistId: string;
  totalSongs: number;
};

export type UserData = {
  name: string;
  img: string;
  id: string;
};

export type SpotifyParams = {
  method: string;
  headers: {
    Authorization: string;
  };
};

export type PopupData = {
  popup: boolean;
  title: string;
  text: string;
};

// Spotify API Types

// Typing API get user reponse

type ExternalUrlObject = {
  spotify: string;
};

type FollowersObject = {
  href: string;
  total: number;
};

type ImageObject = {
  height?: number;
  url: string;
  width?: number;
};

export type UserObjectPublic = {
  display_name?: string;
  external_urls: ExternalUrlObject;
  followers?: FollowersObject;
  href: string;
  id: string;
  images?: ImageObject[];
  type: string;
  uri: string;
};

// Typing API get users playlists response

export type ListOfUsersPlaylistsResponse =
  BasePagingObject<PlaylistObjectSimplified> & {};

type BasePagingObject<T> = {
  href: string;
  items: T[];
  limit: number;
  next: string;
  total: number;
};

type PlaylistObjectSimplified = PlaylistBaseObject & {
  tracks: {
    href: string;
    total: number;
  };
};

type PlaylistBaseObject = {
  collaborative: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: UserObjectPublic;
  public: boolean;
  snapshot_id: string;
  type: string;
  uri: string;
};

// Typing API get users artists response

export type MultipleArtistsResponse = {
  artists: ArtistObjectFull[];
};

export type ArtistObjectFull = ArtistObjectSimplified & {
  followers: FollowersObject;
  genres: string[];
  images: ImageObject[];
  popularity: number;
};

type ArtistObjectSimplified = {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};
