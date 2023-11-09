import { useState, useEffect } from "react";

const About = ({ restBase }) => {
  const restPath = restBase + "pages/13?_embed?&1=2";
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
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{ __html: restData.content?.rendered }}
          ></div>
          <div
            className="skills"
            dangerouslySetInnerHTML={{ __html: restData.acf?.skills }}
          ></div>
        </article>
      ) : (
        <>Meh</>
      )}
    </>
  );
};

export default About;
