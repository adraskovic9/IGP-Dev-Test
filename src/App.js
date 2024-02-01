import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import messages_en from './locales/en.json';
import messages_me from './locales/me.json'; // Your Montenegrin messages
import FormContainer from './components/form/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import './style/main.scss';
import 'react-toastify/dist/ReactToastify.css';
const messages = {
  'en': messages_en,
  'me': messages_me,
};

function App() {
  const defaultLang = navigator.language.split(/[-_]/)[0];
  const [language, setLanguage] = useState(defaultLang);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="App">
      <IntlProvider locale={language} messages={messages[language]}>
        <nav className="app-bar">
          {/* Add other navigation items here as needed */}
          <div className="language-switcher">
            <select value={language} onChange={handleLanguageChange}>
              <option value="en">EN</option>
              <option value="me">ME</option>
            </select>
          </div>
        </nav>
        <FormContainer />
        <ToastContainer/>
      </IntlProvider>
    </div>
  );
}

export default App;
