import rolexLogo from "../assets/logo-rolex.png";
// export function convertCode(name) {
//   if (name.startsWith("SUB")) {
//     return name.replace("SUB", "AD");
//   } else if (name.startsWith("AD")) {
//     return name.replace("AD", "ADM");
//   }
//   return name;
// }

export function convertCode(name) {
  if (name?.startsWith("AD")) {
    return name?.replace("AD", "ADM");
  } else if (name?.startsWith("SUB")) {
    return name?.replace("SUB", "AD");
  } else if (name?.startsWith("M")) {
    return name?.replace("M", "MA");
  }
  return name;
}

export function convertCodeReverse(name) {
  if (name?.startsWith("ADM")) {
    return name?.replace("ADM", "AD");
  } else if (name?.startsWith("AD")) {
    return name?.replace("AD", "SUB");
  } else if (name?.startsWith("MA")) {
    return name?.replace("MA", "M");
  }
  return name;
}

// // ant 
export const baseUrl = import.meta.env.VITE_BASE_URL;
export const imgUrl = rolexLogo;

//  KohinoorBase 
// export const baseUrl = import.meta.env.VITE_BASE_URL_KHO;
// export const imgUrl = "/img/logo.png";

// nsgBaseUrl
// export const baseUrl = import.meta.env.VITE_BASE_URL_NSG;
// export const imgUrl = "/img/logo-nsg.png";

export const oddsApi = import.meta.env.VITE_ODDS_API;
export const themeName = import.meta.env.VITE_GET_THEME_NAME;
export const isNsg = import.meta.env.VITE_IS_NSG === "true";
