import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Amplify } from "aws-amplify";
import awsExport from "../aws-exports.js";

Amplify.configure(awsExport);

export const metadata = {
  title: "Eric's AWS Practice",
  description: "AWS Practice",
};
import { RefreshProvider } from "../context/RefreshContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RefreshProvider>
        <body>
          <NavBar />
          {children}
          <Footer />
        </body>
      </RefreshProvider>
    </html>
  );
}
