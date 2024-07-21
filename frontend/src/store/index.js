import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createLoadingSlice } from "./slices/loading-slice";
import { createChatSlice } from "./slices/chat-slice";

export const useAppStore = create()((...a)=>({
  ...createAuthSlice(...a),
  ...createLoadingSlice(...a),
  ...createChatSlice(...a),
}));