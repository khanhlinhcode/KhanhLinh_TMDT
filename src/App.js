import React from "react";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function App() {
  // const fetchapi = async () => {
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/product/get-all`
  //   );
  //   return res.data;
  // };
  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchapi });
  // console.log(query.data);

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.component;
            const Layout = route.isShowHeader
              ? DefaultComponent
              : React.Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                key={route.path}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
