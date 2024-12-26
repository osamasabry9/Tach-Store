import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categories from "./categories/categoriesSlice";
import products from "./products/productSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";

/* 1 - persist config selected reducers and type of storage and key
const rootPersistConfig = {
  key: 'root',
  storage,
  // list of reducers use when we want to persist save state
  whitelist: ['cart'],
  // black list of reducers  use when we don't want to persist save state
 // blacklist: ['products', 'categories'],
}
 */

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};
const wishlistPersistConfig = {
  key:"wishlist",
  storage,
  whitelist:["itemsId"]
}

// 2 - create root reducer
const rootReducer = combineReducers({
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: persistReducer(wishlistPersistConfig, wishlist),
});

// 3 - create persisted reducer
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// 4 - create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// 5 - create persistor
const persistor = persistStore(store);

// 6 - export
export { store, persistor };
