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
        <Thumbnail restBase={restBase} featuredImage={featuredImage} />
      ) : null}
    </>
  );
};

export default Works;
