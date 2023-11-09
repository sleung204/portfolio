import { useState, useEffect } from "react";

const Home = ({ restBase }) => {
  const restPath = restBase + "pages/8";
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
      {isLoaded ? (
        <article id={`post-${restData.id}`}>
          <h1>{restData.title.rendered}</h1>
          <section>
            <h2>{restData.acf.info}</h2>
            <p>{restData.acf.quote}</p>
            <a
              href={restData.acf.view_works_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restData.acf.view_works}
            </a>
          </section>
          <section>
            <h2>Social Media</h2>
            <ul>
              {restData.acf.social_media.map((socialMediaItem, index) => (
                <li key={index}>
                  <a
                    href={socialMediaItem.social_media_link.url}
                    target={socialMediaItem.social_media_link.target}
                    rel="noopener noreferrer"
                  >
                    {socialMediaItem.social_media_text}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      ) : (
        <>Meh</>
      )}
    </>
  );
};

export default Home;
