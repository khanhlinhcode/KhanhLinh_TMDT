import HomePage from "../pages/HomePage/HomePage";
import ProductDetailPage from "../pages/HomePage/ProductDetailsPage/ProductDetailsPage";
import SignInPage from "../pages/HomePage/SignInPage/SignInPage";
import SignUpPage from "../pages/HomePage/SignUpPage /SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage.jsx";
import ProfilePage from "../pages/Profile/ProfilePage.jsx";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

const routes = [
  {
    path: "/",
    component: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    component: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/product",
    component: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/:type",
    component: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    component: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    component: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/product-details",
    component: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/profile-user",
    component: ProfilePage,
    isShowHeader: true,
  },

  {
    path: "*",
    component: NotFoundPage,
  },
];

export default routes;
