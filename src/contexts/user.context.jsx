import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//actual value that we want to access, we provide default here
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//The actual component that we wrap around to provide the value
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    console.log("working");
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/*<UserProvider><app/><UserProvider/>*/
//we need to access current value and ability to set value for our children down the tree
