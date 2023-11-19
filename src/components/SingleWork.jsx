import { useState, useEffect } from "react";

const SingleWork = ({ restBase, featuredImage }) => {
  const restPath = restBase + "pages/13";
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

  return <>{isLoaded ? <Thumbnail /> : null}</>;
};

export default SingleWork;