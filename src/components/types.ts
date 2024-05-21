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

// Typing API fetchPlaylistTracks response
export type PlaylistTrackResponse = PagingObject<PlaylistTrackObject> & {};

type PagingObject<T> = BasePagingObject<T> & {
  previous: string;
  offset: number;
};

export type PlaylistTrackObject = {
  added_at: string;
  added_by: UserObjectPublic;
  is_local: boolean;
  track: TrackObjectFull;
};

type TrackObjectFull = TrackObjectSimplified & {
  album: AlbumObjectSimplified;
  external_ids: ExternalIdObject;
  popularity: number;
};

type AlbumObjectSimplified = {
  album_type: string;
  available_markets?: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  type: string;
  uri: string;
};

type TrackObjectSimplified = {
  artists: ArtistObjectSimplified[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: TrackLinkObject;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

type ExternalIdObject = {
  isrc?: string;
  ean?: string;
  upc?: string;
};

type TrackLinkObject = {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  type: string;
  uri: string;
};
