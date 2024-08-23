import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
  <AuthProvider>
    <div className="font-primary">
      <App />
    </div>
  </AuthProvider>
);
