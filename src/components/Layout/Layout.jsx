import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Toaster For Pop Of Notified */}
      <div className="absolute z-[99999]">
        <Toaster />
      </div>
      {/* Header */}

      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full h-full bg-gray-50 relative flex items-center justify-center">
        {children}
      </main>
      {/* Footer */}

      <Footer />
    </div>
  );
}

export default Layout;
