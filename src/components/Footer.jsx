import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Footer = ({ restBase }) => {
  const restPath = restBase + "pages/8?_embed?&1=2";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);
  return (
    <>
      {isLoaded && (
        <>
          
          <footer className="social-icons">

          <section>
            <ul>
              {restData.acf.social_media.map((socialMediaItem, index) => (
                <li key={index}>
                  <a
                    href={socialMediaItem.social_media_link.url}
                    target={socialMediaItem.social_media_link.target}
                    rel="noopener noreferrer"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: socialMediaItem.social_media_text,
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
            </section>
            </footer>
            <footer className="copyright-footer">
            <p className="copyright">© 2024 Sally Leung</p>
          </footer>
        </>
      )}
    </>
  );
};

export default Footer;
