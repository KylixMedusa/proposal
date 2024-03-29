import './App.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import Page404 from './pages/Page404/Page404';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderClass, setLoaderClass] = useState("loader__container");

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
    setTimeout(() => {
      setLoaderClass("loader__container loader__container--hide");
    }, 1500);
    setTimeout(() => {
      setLoaderClass(
        "loader__container loader__container--hide loader__container--hidden"
      );
    }, 2000);
    setTimeout(() => {
      setIsLoaded(true);
    }, 4000);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="App">
      <div className={loaderClass}>
        <div className="clock-loader"></div>
      </div>
      <Page404 isLoaded={isLoaded} />
    </div>
  );
};

export default App;
