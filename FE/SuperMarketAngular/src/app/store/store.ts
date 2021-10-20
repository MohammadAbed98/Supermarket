import { Action } from "@ngrx/store";


export interface StoreInterface{
    loggedIn: Login,
}
export interface Login{
    loggedIn: boolean,

}
// interface UserInfo{
//     type: string,
//     LevelAllowsAaccess: string
// }

export interface InChart
{
    isInChart: Boolean
}

let initState = {
    loggedIn: false

}

export function LoginReducer( state = initState , action: Action)
{

    switch(action.type){
        case 'login':
            return {
            loggedIn: true,
            // LevelAllowsAaccess: action.LevelAllowsAaccess
            }
        case 'logout':
            return {
                loggedIn: false
            }
        default:    
            return state

    }    
}

export function InChart(){
    
}