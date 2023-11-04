import React, { useState, useEffect, Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homespace from "./components/HomeSpace";
import { Canvas, axesHelper } from "@react-three/fiber";
import OrderPage from "./components/OrderPage";
<<<<<<< HEAD
import ReviewPage from "./components/ReviewPage";
import ProductsPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
=======
import CartPage from "./components/CartPage";
import TestSam from "./components/TestSam"
import TestSam2 from "./components/TestSam2";
>>>>>>> routes-2-sam

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  //home position [-2, 4, 10]
  return (
    <>
<<<<<<< HEAD
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
              <Route path="/orders">
                <OrderPage />
              </Route>
              <Route path="/reviews">
                <ReviewPage />
              </Route>
              <Route path="/products">
                <ProductsPage />
              </Route>
              <Route path="/cart">
                <CartPage />
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
=======
      <TestSam />
>>>>>>> routes-2-sam
    </>
    // <>
    //   <Navigation isLoaded={isLoaded} />
    //   {isLoaded && (
    //     <Switch>
    //       <Route path="/">
    //         <Suspense>
    //           {/* <directionalLight position={[8, 7, 1]} ref={dirLight} color={"#005F00"} castShadow intensity={20} shadow-mapSize={2048} shadow-bias={-0.001}/> */}
    //           <Route path="/signup">
    //             <SignupFormPage />
    //           </Route>
    //           <Route path="/login">
    //             <LoginFormPage />
    //           </Route>
    //           <Route path="/orders">
    //             <OrderPage />
    //           </Route>
    //           <Route path="/cart">
    //             <CartPage />
    //           </Route>
    //           <Canvas dpr={[1, 2]} shadows>
    //             {/* <directionalLightHelper light={dirLight.current}/> */}
    //             {/* <axesHelper args={[2]}/>
    //           <gridHelper /> */}
    //             <color attach="background" args={["#213547"]} />
    //             {/* <fog attach="fog" args={["#213547", 10, 20]} /> */}
    //             <Homespace />
    //           </Canvas>
    //         </Suspense>
    //       </Route>
    //     </Switch>
    //   )}
    // </>
  );
}

export default App;
