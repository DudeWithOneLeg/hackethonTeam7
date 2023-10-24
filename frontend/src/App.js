import React, { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homespace from "./components/HomeSpace";
import { Canvas, axesHelper } from "@react-three/fiber";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/">
            <Suspense>

            <Canvas dpr={[1, 2]} >
              {/* <axesHelper args={[2]}/>
              <gridHelper /> */}
              {/* <color attach="background" args={["#213547"]} />
              <fog attach="fog" args={["#213547", 10, 20]} /> */}
              <Homespace />
            </Canvas>
            </Suspense>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
