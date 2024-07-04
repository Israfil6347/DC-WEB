import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { useSessionStorage } from 'global_shared/hooks/useStorage';
import { createContext, useState } from 'react';

export type AuthUserContextType = {
  authUser: IAuthUserModel;
  storeAuthUserData: (currentUser: IAuthUserModel) => void;
  clearAuthUserData: () => void;
  updateAuthUserData: (currentUser: IAuthUserModel) => void;
};

const AuthUserContext = createContext<AuthUserContextType | null>(null);

export const AuthUserContextProvider = ({ children }: any) => {
  const [user, setUser, removeUser] = useSessionStorage('user', null);
  const [authUser, setAuthUser] = useState(user);

  const storeAuthUserData = (userData: any) => {
    setUser(userData);
    setAuthUser(userData);
  };

  const clearAuthUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rolePermissionIds');
    setAuthUser(null);
    removeUser();
  };
  const updateAuthUserData = (userData: any) => {
    storeAuthUserData(userData);
  };

  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        storeAuthUserData,
        clearAuthUserData,
        updateAuthUserData,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContext;
