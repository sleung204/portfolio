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
          <article className="wrapper" id={`post-${restData.id}`}>
            <h1>{restData.title.rendered}</h1>
            <h2>{restData.acf.overview_heading}</h2>
            <p>{restData.acf.overview_body}</p>
            <h2>{restData.acf.roles_heading}</h2>
            <p>{restData.acf.roles_body}</p>
            <h2>{restData.acf.toolkit_heading}</h2>
            <p>{restData.acf.toolkit_body}</p>
            {restData.acf.link &&
              restData.acf.link.map((link_single, i) => (
                <a key={link_single[i]} href={link_single.external_link}>
                  {link_single.link_title}
                </a>
              ))}
            {restData.acf.project_details.map((project_details, i) => (
              <>
                <p
                  key={project_details[i]}
                  dangerouslySetInnerHTML={{ __html: project_details.details }}
                ></p>
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
