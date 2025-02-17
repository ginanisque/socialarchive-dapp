import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/home-page/home-page";
import UploadPage from "./components/upload-page/upload-page";
import BrowsePage from "./components/browse-page/browse-page";
import ArchivePage from "./components/archive-page/archive-page";
import CookiesPage from "./components/cookies-page/cookies-page";
import Authentication from "./components/auth/auth";
import SearchBox from "./components/search/SearchBox";
import SearchPage from "./components/search/SearchPage";
import ArchiveDownload from "./components/archive-download/archive-download";
import Footer from "./components/footer/footer";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { StoreProvider } from "./utils/store";
import { CookieConsentProvider } from "./components/cookie-consent/cookie-consent";

const APP_TITLE = "Social Archive";

function App() {
  const activeLink = (pathname: string, startsWith?: boolean) => {
    let isActive =
      (startsWith && window.location.pathname.startsWith(pathname)) ||
      window.location.pathname === pathname;
    return "menu-link menu-item " + (isActive ? "active" : "");
  };

  return (
    <div className="wrapper">
      <CookieConsentProvider>
        <HelmetProvider>
          <Helmet>
            <title>Social Archive</title>
            <meta name="description" content="Twitter back-up on the blockchain" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
          </Helmet>
          <header className="App-header">
            <a className="header-logo-link" href="/">
              <img
                className="header-logo"
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt={APP_TITLE}
              />
            </a>
            <div className="menu">
              <a className={activeLink("/upload")} href="/upload">
                Upload
              </a>
              <a className={activeLink("/browse", true)} href="/browse">
                Browse
              </a>
              <Authentication />

              <SearchBox />
            </div>
            <title>{APP_TITLE}</title>
          </header>
          <StoreProvider>
            <BrowserRouter>
              <div className="main-container">
                <Routes>
                  <Route path="/browse" element={<BrowsePage />}>
                    <Route path=":section" element={<BrowsePage />} />
                  </Route>
                  <Route path="/archive" element={<ArchivePage />}>
                    <Route path=":user/:section" element={<ArchivePage />} />
                  </Route>
                  <Route path="/archive/:id" element={<ArchiveDownload />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/search" element={<SearchPage />} />
                </Routes>
              </div>
              <Footer />
            </BrowserRouter>
          </StoreProvider>
        </HelmetProvider>
      </CookieConsentProvider>
    </div>
  );
}

export default App;
