import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
// import LoginPage from "./pages/LoginPage";
// import FriendsPage from "./pages/FriendsPage";
// import PrivateLayout from "./pages/PrivateLayout";
// import GroundPage from "./pages/ground/GroundPage";
// import GroundPrivateLayout from "./pages/GroundPrivateLayout";
// import ProductsPage from "./pages/ground/ProductsPage";
// import ClientsPage from "./pages/ground/ClientsPage";
// import ClientPage from "./pages/ground/ClientPage";
// import ExpensesPage from "./pages/ground/ExpensesPage";
// import ExpensePage from "./pages/ground/ExpensePage";
// import GroupsPage from "./pages/GroupsPage";
// import ShareFundPage from "./pages/ShareFundPage";
// import MembersPage from "./pages/MembersPage";
// import CreditsPage from "./pages/CreditsPage";
import FlightsPage from "./pages/FlightsPage";
import CountryPage from "./pages/CountryPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <FlightsPage /> },
      { path: "home/:country/", element: <CountryPage /> },
    ],
    // children: [{ path: "login/", element: <LoginPage /> }],
  },
  // {
  //   element: <PrivateLayout />,
  //   children: [
  //     { index: true, element: <GroupsPage /> },
  //     { path: "groups/:id/", element: <ShareFundPage /> },
  //     { path: "groups/:id/members", element: <MembersPage /> },
  //     { path: "credits/:id/", element: <CreditsPage /> },

  //     { path: "friends/", element: <FriendsPage /> },
  //   ],
  // },
  // {
  //   path: "ground/",
  //   element: <GroundPrivateLayout />,
  //   children: [
  //     { index: true, element: <GroundPage /> },
  //     { path: "products/", element: <ProductsPage /> },
  //     { path: "clients/", element: <ClientsPage /> },
  //     { path: "clients/:id", element: <ClientPage /> },
  //     { path: "expenses/", element: <ExpensesPage /> },
  //     { path: "expenses/:id", element: <ExpensePage /> },

  //     // { path: "clients/", element: <FriendsPage /> },

  //     // { path: "users/:id/", element: <TransactionPage /> },
  //     // { path: "friends/", element: <FriendsPage /> },
  //     // { path: "friends/:id/", element: <FriendPage /> },
  //   ],
  // },
]);

export default routes;
