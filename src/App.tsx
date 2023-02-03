import './App.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import Page404 from './pages/Page404/Page404';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
    return () => window.removeEventListener("resize", appHeight);
  }, []);

  const onLoad = () => {
    const loader = document.querySelector(".loader__container");
    if (loader) {
      setTimeout(() => {
        loader.classList.add("loader__container--hide");
      }, 1000);
      setTimeout(() => {
        loader.classList.add("loader__container--hidden");
        setIsLoaded(true);
      }, 2000);
    }
  };

  useEffect(() => {
    window.addEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="loader__container">
        <div className="clock-loader"></div>
      </div>
      <Page404 isLoaded={isLoaded} />
    </div>
  );
};

export default App;
