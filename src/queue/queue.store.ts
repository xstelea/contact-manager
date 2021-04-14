import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QueueItem {
  action: Action;
  listenFor: string[];
}
interface State {
  current: QueueItem | null;
  items: QueueItem[];
}
const initialState: State = { items: [], current: null };

export const { reducer: queueReducer, actions: queueAction } = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<QueueItem[]>) => ({
      ...state,
      items: [...state.items, ...action.payload],
    }),
    run: (state) => ({
      ...state,
      current: state.items[0],
      items: state.items.slice(1),
    }),
  },
});
