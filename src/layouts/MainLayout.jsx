import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
