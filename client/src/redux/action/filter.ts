// src/redux/action/filter.ts
import customFetch from "../../utils/axios";

type Props = {
  filter_type: string;
  team_type: string;
  club: string;
};

export async function filter({ filter_type, team_type, club }: Props) {
  const url = `/${filter_type}/`;
  const params: Record<string, any> = {};

  if (filter_type === "products") {
    switch (team_type) {
      case "q":
        params.q = club;
        break;
      case "tag":
        params.tag = club;
        break;
      case "playerjersey":
        params.playerjersey = 1;
        break;
      case "search":
        params.search = club;
        break;
      case "player_first_name":
      case "player_last_name":
        params[team_type] = club;
        break;
      default:
        if (team_type) params[team_type] = club;
        break;
    }
  } else if (filter_type === "teams") {
    params.search = club;
    if (team_type === "club") params.club = 1;
    if (team_type === "national") params.national = 1;
  } else {
    // generic fallback
    if (team_type) params[team_type] = club;
  }

  return customFetch.get(url, { params });
}
