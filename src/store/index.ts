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
import auth from "./auth/authSlice";
import orders from "./orders/ordersSlice";
import toasts from "./toasts/toastsSlice";

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

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};


// const wishlistPersistConfig = {
//   key:"wishlist",
//   storage,
//   whitelist:["itemsId"]
// }

// 2 - create root reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  products,
  orders,
  toasts,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
});

// 3 - create persisted reducer
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
// 4 - create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "toasts/addToast",
        ],
        ignoredPaths: [/^toasts\.records\.\d+\.onCloseToast$/],
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
