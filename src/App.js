import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { updateUser } from "./redux/slide/userSlide";
import Loading from "./components/LoadingComponent/Loading";

function App() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoder } = handleDecodeToken();
    if (decoder?.id) {
      handleGetDetailUser(decoder?.id, storageData).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
    // setup axios interceptor once
    UserService.axiosJWT.interceptors.request.use(async (config) => {
      const currentTime = new Date();
      const { decoder } = handleDecodeToken();
      if (decoder?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    });
  }, []);

  const handleDecodeToken = () => {
    const storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData) {
      decoded = jwtDecode(storageData); // bỏ kiểm tra isJsonString
    }
    return { storageData, decoder: decoded };
  };
  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    console.log("📦 getDetailUser response:", res); // <-- thêm dòng này
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.component;
              const ischeckAuth = !route.isPrivate || user?.isAdmin;
              const Layout = route.isShowHeader
                ? DefaultComponent
                : React.Fragment;

              return (
                <Route
                  path={route.path}
                  element={
                    ischeckAuth ? (
                      <Layout>
                        <Page />
                      </Layout>
                    ) : (
                      <div>Không có quyền truy cập</div>
                    )
                  }
                  key={route.path}
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
