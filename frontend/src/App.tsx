import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./components/pages/Home";

import Demo from "./components/pages/Demo";
import ThemeProvider from "./providers/ThemeProvider";
import Layout from "./components/layouts/Layout";
import ApolloProvider from "./providers/ApolloProvider";

const PublicRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
  );
  return (
    <ApolloProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
