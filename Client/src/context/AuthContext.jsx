import { createContext, useReducer } from 'react';
import { useEffect } from 'react';

const AuthReducer = (CurrentState, Action) => {

    switch(Action.type){
  
      case "LOGIN_START":
        return {
          user: null,
          loading: true,
          error: null
        }
  
      case "LOGIN_SUCCESS":
        return {
          user: Action.payload,
          loading: false,
          error: null
        }
  
      case "LOGIN_ERROR":
        return {
          user: null,
          loading: false,
          error: true
        }
  
      case "LOG_OUT":
        return {
          user: null,
          loading: false,
          error: null
        }
    }
}

const InitialState = {
  user: JSON.parse(localStorage.getItem('token')) || null,
  loading: false,
  error: null
}

export const AuthContext = createContext(InitialState);


export const AuthContextProvider = ({ children }) => {

  const [authState, authDispatch] = useReducer(AuthReducer,InitialState);

  useEffect(() => {
    
    localStorage.setItem('token', JSON.stringify(authState.user));
  },[authState.user])

  return (
    
    <AuthContext.Provider
    value={{
      user: authState.user,
      loading: authState.loading,
      error: authState.error,
      authDispatch
    }}
    >
      {children}
    </AuthContext.Provider>
  )

}