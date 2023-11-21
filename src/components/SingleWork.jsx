import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleWork = ({ restBase }) => {
  const { slug } = useParams();
  const restPath = restBase + `posts/?slug=${slug}&_embed&acf_format=standard`;
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
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
            <h2>{restData.acf.roles_heading}</h2>
            <p>{restData.acf.roles_body}</p>
            <h2>{restData.acf.toolkit_heading}</h2>
            <p>{restData.acf.toolkit_body}</p>
            {restData.acf.link.map((external_link) => (
              <>
                <a href={external_link.external_link}>View PDF Report</a>
              </>
            ))}
            {restData.acf.project_details.map((project_details) => (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: restData.acf?.project_details,
                  }}
                ></div>
              </>
            ))}
          </article>
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default SingleWork;
