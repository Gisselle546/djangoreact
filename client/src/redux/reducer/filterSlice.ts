// src/redux/reducer/filterSlice.ts
import { AppState } from "../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { filter } from "../action/filter";
import { getProduct } from "../action/getProduct";
import { playerquery } from "../action/playerquery";
import { create_review } from "../action/create_review";
import { get_avg_review } from "../action/get_avg_rating";
import { ProductSearch } from "../action/filter_search";

// ---------- helpers ----------
function getErrorMessage(err: any): string {
  // axios error? -> err.response?.data?.detail || err.message
  if (err?.response?.data) {
    const d = err.response.data;
    if (typeof d === "string") return d;
    if (d?.detail) return d.detail;
    try {
      return JSON.stringify(d);
    } catch {
      /* noop */
    }
  }
  return err?.message ?? "Request failed";
}

// ---------- state ----------
export interface FilterState {
  filter_type: string;
  team_type: string;
  player_first_name: string;
  player_last_name: string;
  club: string;

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  filter_data_general: any[] | null;
  filter_data_player: any[] | null;
  filter_product: any | null;
  avg_review_rating: any | null;
  search: any;

  // used to avoid double-fetches on the page
  currentQuery: string;
  lastUpdated: number | null;
}

const initialState: FilterState = {
  filter_type: "",
  team_type: "",
  club: "",

  status: "idle",
  error: null,

  player_first_name: "",
  player_last_name: "",
  filter_data_general: null,
  filter_data_player: null,
  filter_product: null,
  avg_review_rating: null,
  search: "",

  currentQuery: "",
  lastUpdated: null,
};

// ---------- thunks ----------
export const Search = createAsyncThunk(
  "action/filter_search",
  async ({ searchterm }: { searchterm: string }, { rejectWithValue }) => {
    try {
      const response = await ProductSearch({ searchterm });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const filterMethod = createAsyncThunk(
  "action/filter",
  async (
    {
      filter_type,
      team_type,
      club,
    }: { filter_type: string; team_type: string; club: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await filter({ filter_type, team_type, club });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const filterMethodPlayer = createAsyncThunk(
  "action/filterplayer",
  async (
    {
      filter_type,
      team_type,
      club,
    }: { filter_type: string; team_type: string; club: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await filter({ filter_type, team_type, club });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const filterProductMethod = createAsyncThunk(
  "action/getProduct",
  async (
    { filter_type, product_id }: { filter_type: string; product_id: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await getProduct({ filter_type, product_id });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const filterPlayerQuery = createAsyncThunk(
  "action/playerquery",
  async (
    {
      filter_type,
      player_first_name,
      player_last_name,
    }: {
      filter_type: string;
      player_first_name: string;
      player_last_name: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await playerquery({
        filter_type,
        player_first_name,
        player_last_name,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createReview = createAsyncThunk(
  "action/create_review",
  async (
    {
      filter_type,
      product_id,
      data,
    }: {
      filter_type: string;
      product_id: any;
      data: { rating: any; comment: any; name: any };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await create_review({ filter_type, product_id, data });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getAvgReview = createAsyncThunk(
  "action/get_avg_rating",
  async (
    { filter_type, product_id }: { filter_type: string; product_id: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await get_avg_review({ filter_type, product_id });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// ---------- slice ----------
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // optional: manual reset
    resetFilterState: () => initialState,
  },
  extraReducers: (builder) => {
    // generic helpers to reduce repetition
    const onPending = (state: FilterState) => {
      state.status = "loading";
      state.error = null;
    };
    const onRejected = (state: FilterState, action: any) => {
      state.status = "failed";
      state.error = getErrorMessage(action.payload);
    };
    const touch = (state: FilterState) => {
      state.lastUpdated = Date.now();
    };

    builder
      // products list by club/name (filterMethod)
      .addCase(filterMethod.pending, onPending)
      .addCase(filterMethod.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filter_data_general = action.payload;
        state.error = null;
        // store the last club query to de-dupe on the page
        state.currentQuery = action.meta?.arg?.club ?? state.currentQuery;
        touch(state);
      })
      .addCase(filterMethod.rejected, onRejected)

      // player filters via the same endpoint (kept for compatibility)
      .addCase(filterMethodPlayer.pending, onPending)
      .addCase(filterMethodPlayer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filter_data_player = action.payload;
        state.error = null;
        touch(state);
      })
      .addCase(filterMethodPlayer.rejected, onRejected)

      // product detail
      .addCase(filterProductMethod.pending, onPending)
      .addCase(filterProductMethod.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filter_product = action.payload;
        state.error = null;
        touch(state);
      })
      .addCase(filterProductMethod.rejected, onRejected)

      // player query (first/last name)
      .addCase(filterPlayerQuery.pending, onPending)
      .addCase(filterPlayerQuery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filter_data_player = action.payload;
        state.error = null;
        touch(state);
      })
      .addCase(filterPlayerQuery.rejected, onRejected)

      // average rating
      .addCase(getAvgReview.pending, onPending)
      .addCase(getAvgReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.avg_review_rating = action.payload;
        state.error = null;
        touch(state);
      })
      .addCase(getAvgReview.rejected, onRejected)

      // product text search
      .addCase(Search.pending, onPending)
      .addCase(Search.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.search = action.payload;
        state.error = null;
        touch(state);
      })
      .addCase(Search.rejected, onRejected);
  },
});

// ---------- selectors ----------
export const filterValue = (state: AppState) =>
  state.filter.filter_data_general;
export const filterPlayer = (state: AppState) =>
  state.filter.filter_data_player;
export const filterSearch = (state: AppState) => state.filter.search;
export const filterProduct = (state: AppState) => state.filter.filter_product;
export const avgReview = (state: AppState) => state.filter.avg_review_rating;
export const error = (state: AppState) => state.filter.error;
export const selectStatus = (state: AppState) => state.filter.status;
export const selectCurrentQuery = (state: AppState) =>
  state.filter.currentQuery;

export const { resetFilterState } = filterSlice.actions;
export default filterSlice.reducer;
