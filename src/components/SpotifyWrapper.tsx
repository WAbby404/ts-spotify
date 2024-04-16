import { SpotifyParams, UserData } from "./types";

export const SpotifyAPI = {
  fetchUserData: async function (
    profileParams: SpotifyParams,
    profileId: string
  ): Promise<UserData> {
    let userObj: UserData = {
      name: "",
      img: "",
    };
    await fetch("https://api.spotify.com/v1/me", profileParams)
      .then((result) => {
        if (!result.ok) {
          // error popup?
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then((data) => {
        // use spotify type here
        userObj = {
          name: data.display_name,
          img: data.images[0].url,
        };
        profileId = data.id;
        console.log(userObj);
        return userObj;
      })
      .catch((error) => {
        // error popup?
        console.log(error);
      });
    return userObj;
  },

  fetchPlaylistData: function (): string {
    return "string";
  },
};

//   fetchUserData: async function (
//     profileParams: SpotifyParams,
//     profileId: string
//   ): Promise<UserData> {
//     let userObj: UserData = {
//       name: "",
//       img: "",
//     };
//     try {
//       const response = await fetch(
//         "https://api.spotify.com/v1/me",
//         profileParams
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       userObj = {
//         name: data.display_name,
//         img: data.images[0].url,
//       };
//       profileId = data.id;
//       console.log(userObj);
//     } catch (e) {
//       console.log(e);
//     }
//     return userObj;
//   },

// fetchUserData: function (
//   profileParams: SpotifyParams,
//   profileId: string
// ): UserData | void {
//   fetch("https://api.spotify.com/v1/me", profileParams)
//     .then((result) => {
//       if (!result.ok) {
//         // change this into an error popup?
//         throw new Error("Network response was not ok");
//       }
//       return result.json();
//     })
//     .then((data) => {
//       //  need to use spotify type here?
//       // console.log(data);
//       const userObj = {
//         name: data.display_name,
//         img: data.images[0].url,
//       };
//       profileId = data.id;
//       console.log(userObj);
//       return userObj;
//     })
//     .catch((error) => {
//       console.log(error);
//       return null;
//     });
// },
