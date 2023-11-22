import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ restBase }) => {
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
      {isLoaded ? (
        <article className="wrapper" id={`post-${restData.id}`}>
          <h1>{restData.title.rendered}</h1>
          <section>
            <h2>{restData.acf.info}</h2>
            <p>{restData.acf.quote}</p>

            <Link className="cta" to="/works">
              View Works
            </Link>
            <Link className="cta" to="/about">
              About Me
            </Link>
          </section>
          
        </article>
      ) : null}
    </>
  );
};

export default Home;
