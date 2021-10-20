import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { AuthState } from "./reducer";

export const selectFeature = (state: AppState) => state.auth;

export const selectAuthState = createFeatureSelector<AuthState>("auth") ;

export const isLoggedIn = createSelector(
    // selectFeature ,  // OR:
    selectAuthState,
   (auth) => Object.keys(auth.user).length>0
) ;

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
) ;