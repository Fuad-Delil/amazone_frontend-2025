import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./component/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
