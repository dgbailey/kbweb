//initial thought find index of last "-" using hashtable
import { formatUuid } from "./formatUuid";

export const parseUriIntoFormattedUuid = (uriString) => {
  let indexOfLastHyphen = uriString.lastIndexOf("-");
  let unformattedBoardUuid = uriString.slice(indexOfLastHyphen + 1);
  return formatUuid(unformattedBoardUuid);
};
