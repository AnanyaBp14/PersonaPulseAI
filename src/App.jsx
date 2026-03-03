import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from './amplifyconfiguration.json'; // or ./aws-exports depending on your version

import LeftSidebar from './components/builder/LeftSidebar';
import RightCanvas from './components/dashboard/RightCanvas';
import { CampaignProvider } from './context/CampaignContext';
import { Sparkles } from 'lucide-react';

Amplify.configure(amplifyconfig);

// The actual dashboard once logged in
function DashboardLayout() {
  const { signOut, user } = useAuthenticator((context) => [context.user]);
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <LeftSidebar user={user} signOut={signOut} />
      <RightCanvas />
    </div>
  );
}

// The Split-Screen Auth Wrapper
function AuthWrapper() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === 'configuring') return null;

  if (authStatus !== 'authenticated') {
    return (
      <div className="flex h-screen w-full bg-white font-sans">
        {/* Left Side - PersonaPulse Indigo Branding */}
        <div className="hidden lg:flex w-1/2 bg-indigo-600 flex-col justify-center p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={36} className="text-indigo-200" />
              <h1 className="text-3xl font-bold tracking-tight">PersonaPulse</h1>
            </div>
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">Manage your campaigns efficiently.</h2>
            <p className="text-xl text-indigo-100 font-medium leading-relaxed">
              Track engagement, generate AI content, and distribute across platforms all in one place.
            </p>
          </div>
          {/* Subtle background gradients for depth */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-indigo-700 opacity-50 blur-3xl"></div>
        </div>

        {/* Right Side - Clean Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
          <div className="w-full max-w-md">
            <Authenticator
              components={{
                SignIn: {
                  Header() {
                    return (
                      <div className="mb-6 text-center lg:text-left">
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h3>
                        <p className="text-slate-500 font-medium text-sm">Enter your email and password to access your dashboard.</p>
                      </div>
                    );
                  }
                },
                SignUp: {
                  Header() {
                    return (
                      <div className="mb-6 text-center lg:text-left">
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h3>
                        <p className="text-slate-500 font-medium text-sm">Get started with PersonaPulse today.</p>
                      </div>
                    );
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return <DashboardLayout />;
}

export default function App() {
  return (
    <Authenticator.Provider>
      <CampaignProvider>
        <AuthWrapper />
      </CampaignProvider>
    </Authenticator.Provider>
  );
}