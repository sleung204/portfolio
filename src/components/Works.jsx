import { useState, useEffect } from "react";
import Thumbnail from "./Thumbnail";

const Works = ({ restBase, featuredImage }) => {
  const restPath = restBase + "pages/11?_embed?&1=2";
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
        <article className="wrapper" id={`post-${restData.id}`}>
           <h2>{restData.title.rendered}</h2>
          <Thumbnail restBase={restBase} featuredImage={featuredImage} />
        </article>
      ) : null}
    </>
  );
};

export default Works;
