// src/redux/action/filter.ts
import customFetch from "../../utils/axios";

type Props = {
  filter_type: string; // "products" | "teams" | ...
  team_type: string; // "q" | "tag" | "playerjersey" | "search" | "club" | "national" | ...
  club: string; // value for the param; sometimes ignored (playerjersey)
};

export async function filter({ filter_type, team_type, club }: Props) {
  const url = `/${filter_type}/`;
  const params: Record<string, any> = {};

  if (filter_type === "products") {
    // ProductViewSet.get_queryset supports: q, tag, playerjersey, player_first_name, player_last_name, search, ordering
    switch (team_type) {
      case "q":
        params.q = club; // team name filter
        break;
      case "tag":
        params.tag = club; // e.g. "Best Seller"
        break;
      case "playerjersey":
        params.playerjersey = 1; // presence triggers filter; value is not used
        break;
      case "search":
        params.search = club; // DRF SearchFilter on product name
        break;
      case "player_first_name":
      case "player_last_name":
        // not typical for this action, but supported if you pass them
        params[team_type] = club;
        break;
      default:
        // fallback to keep backwards-compat if you pass other query keys
        if (team_type) params[team_type] = club;
        break;
    }
  } else if (filter_type === "teams") {
    // TeamViewSet expects: search + optional club/national flags
    params.search = club;
    if (team_type === "club") params.club = 1;
    if (team_type === "national") params.national = 1;
  } else {
    // generic fallback
    if (team_type) params[team_type] = club;
  }

  return customFetch.get(url, { params }); // DRF prefers trailing slash
}
