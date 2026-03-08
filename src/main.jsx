import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Import your global styles
import './styles/globals.css'; 

// 2. Import Amplify and the new Gen 2 outputs file
import { Amplify } from 'aws-amplify';
// Notice the '../../' to go up two folders to the project root!
import outputs from './amplify_outputs.json';
// 3. Configure Amplify
Amplify.configure(outputs);

// 4. Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);