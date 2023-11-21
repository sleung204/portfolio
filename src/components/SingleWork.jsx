import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleWork = ({ restBase }) => {
  const { slug } = useParams();
  const restPath = restBase + `posts/?slug=${slug}&_embed`;
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
        <>
          <article id={`post-${restData.id}`}>
            <h1>{restData.title.rendered}</h1>
            <h2>{restData.acf.overview_heading}</h2>
            <p>{restData.acf.overview_body}</p>
          </article>
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default SingleWork;
