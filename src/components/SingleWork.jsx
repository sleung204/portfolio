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

  return <>{isLoaded ? "test" : null}</>;
};

export default SingleWork;
