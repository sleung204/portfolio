import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Works from "./components/Works";
import SingleWork from "./components/SingleWork";

function App() {
  const restBase = "https://sallyleungdev.com/portfolio/wp-json/wp/v2/";

  const featuredImage = (featuredImageObject) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${imgURL} ${imgWidth}w,
        ${
          featuredImageObject.media_details.sizes.large
            ? featuredImageObject.media_details.sizes.large.source_url +
              " 1024w,"
            : ""
        }
        ${
          featuredImageObject.media_details.sizes.medium_large
            ? featuredImageObject.media_details.sizes.medium_large.source_url +
              " 768w,"
            : ""
        }
        ${
          featuredImageObject.media_details.sizes.medium
            ? featuredImageObject.media_details.sizes.medium.source_url +
              " 300w"
            : ""
        }"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return { __html: img };
  };

  return (
    <Router>
      <header id="masthead" className="site-header">
        <div className="site-branding">
          <p className="site-title">Portfolio</p>
        </div>
        <nav className="site-navigation">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/works">Works</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Home restBase={restBase} />} />
          <Route path="/about" element={<About restBase={restBase} />} />
          <Route
            path="/works"
            element={
              <Works restBase={restBase} featuredImage={featuredImage} />
            }
          />
          <Route
            path="/works/:slug"
            element={
              <SingleWork restBase={restBase} featuredImage={featuredImage} />
            }
          />
        </Routes>
      </main>
      <footer>
        <p className="copyright">
          Created by{" "}
          <a
            href="https://sallyleungdev.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sally Leung
          </a>
          .
        </p>
      </footer>
    </Router>
  );
}

export default App;
