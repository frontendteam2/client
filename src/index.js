import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import View from './pages/View';
import { legacy_createStore as createStore } from 'redux'; //스토어 라이브러리
import { Provider } from 'react-redux';
import reducer from "./modules/reducer";

/** 스토어 생성 */
const store = createStore(reducer)
console.log(store.getState());
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement:<NotFound ></NotFound>,
    children: [
      { index: true, path: "/", element: <Home></Home> },
      { path: '/view/:url', element: <View /> },
      { path: "/input", element: <Form /> }
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
