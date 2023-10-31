import React, { useState, useEffect, Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homespace from "./components/HomeSpace";
import { Canvas, axesHelper } from "@react-three/fiber";
import TestSam from "./components/TestSam";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  //home position [-2, 4, 10]
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/">
            <Suspense>
              {/* <directionalLight position={[8, 7, 1]} ref={dirLight} color={"#005F00"} castShadow intensity={20} shadow-mapSize={2048} shadow-bias={-0.001}/> */}
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/login">
                <LoginFormPage />
              </Route>
              <Canvas dpr={[1, 2]} shadows>
                {/* <directionalLightHelper light={dirLight.current}/> */}
                {/* <axesHelper args={[2]}/>
              <gridHelper /> */}
                <color attach="background" args={["#213547"]} />
                {/* <fog attach="fog" args={["#213547", 10, 20]} /> */}
                <Homespace />
              </Canvas>
            </Suspense>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
