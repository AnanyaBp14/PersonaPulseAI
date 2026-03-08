import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  ThemeProvider,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import LeftSidebar from "./components/builder/LeftSidebar";
import RightCanvas from "./components/dashboard/RightCanvas";
import { CampaignProvider } from "./context/CampaignContext";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const myTheme = {
  name: "personapulse-theme",
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: "#fff7ed" },
          60: { value: "#f97316" },
          80: { value: "#ea580c" },
          90: { value: "#c2410c" },
        },
      },
    },
  },
};

function MainLayout() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [showLogin, setShowLogin] = useState(false);

  // Initialize dark mode based on localStorage or OS preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark mode class to the HTML root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

return (
    <ThemeProvider theme={myTheme} colorMode={darkMode ? "dark" : "light"}>
      <div className="flex h-screen w-full bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        
        {/* SIDEBAR */}
        <LeftSidebar onOpenLogin={() => setShowLogin(true)} />

        {/* MAIN CANVAS - Floating button removed, props passed here instead! */}
        <RightCanvas darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* LOGIN MODAL */}
        {showLogin && !user && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            {/* ... rest of your modal code ... */}
            <div className="relative animate-[pop_0.2s_ease-out]">
              <button
                onClick={() => setShowLogin(false)}
                className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 dark:text-white shadow hover:bg-gray-200 dark:hover:bg-gray-700 z-10 transition-colors"
              >
                ✕
              </button>

              <Authenticator
                initialState="signIn"
                components={{
                  Header() {
                    return (
                      <div className="text-center mb-4 mt-2">
                        <h2 className="text-xl font-bold dark:text-white">
                          Welcome to PersonaPulse
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Sign in to save campaigns
                        </p>
                      </div>
                    );
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <CampaignProvider>
        <MainLayout />
      </CampaignProvider>
    </Authenticator.Provider>
  );
}

export default App;