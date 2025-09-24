import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

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
    path: "*",
    component: NotFoundPage,
  },
];

export default routes;
