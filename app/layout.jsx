import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "../components/Footer";
import AuthProvider from "@/components/AuthProvider";
import React from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rental, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
