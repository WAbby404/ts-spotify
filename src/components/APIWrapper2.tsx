import {
  SpotifyParams,
  UserData,
  UserObjectPublic,
  PlaylistData,
  ListOfUsersPlaylistsResponse,
  MultipleArtistsResponse,
} from "./types";
import { useState, useEffect } from "react";

export function useMusicAPI() {
  //   const [userData, setUserData] = useState<UserData | null>(null);
  //   const [loading, setLoading] = useState<boolean>(true);
  //   useEffect(() => {
  //     fetchPlaylist().then((newUserData) => {
  //       setUserData(newUserData);
  //       setLoading(false);
  //     });
  //   }, []);
  //   function fetchUserData2(
  //     profileParams: SpotifyParams,
  //     profileId: string
  //   ): Promise<UserData | void> {
  //     let userObj: UserData = {
  //       name: "",
  //       img: "",
  //       id: "",
  //     };
  //     return fetch("https://api.spotify.com/v1/me", profileParams)
  //       .then((response) => {
  //         if (!response.ok) {
  //           // error popup?
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.json();
  //       })
  //       .then((data: UserObjectPublic) => {
  //         if (data.display_name && data.images) {
  //           userObj = {
  //             name: data.display_name,
  //             img: data.images[0].url,
  //             id: data.id,
  //           };
  //         }
  //         //else give them a temporary name & image?
  //         profileId = data.id;
  //         console.log(data);
  //         // console.log(userObj);
  //         return userObj;
  //       })
  //       .catch((error) => {
  //         // error popup?
  //         console.log(error);
  //       });
  //   }
}
