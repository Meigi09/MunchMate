import { Outlet } from "react-router";


function Layout() {
  return (
    <main className="App">
      <Outlet/>
    </main>
  );
}

export default Layout;