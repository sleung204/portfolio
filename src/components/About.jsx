import { useState, useEffect } from "react";

const About = ({ restBase }) => {
  const restPath = restBase + "pages/13?_embed&acf_format=standard&1=2";
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
          {[1, 2, 3, 4].map((index) => {
            const fieldName = `enjoyable_thing_${index}`;
            const imageData = restData.acf?.[fieldName];

            return (
              imageData && (
                <div key={index}>
                  <img
                    src={imageData}
                    alt={imageData.alt || `Image ${index}`}
                  />
                </div>
              )
            );
          })}
          <div className="skills">
            <div
              dangerouslySetInnerHTML={{
                __html: restData.acf?.skills_development,
              }}
            ></div>
          </div>{" "}
        </article>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default About;
