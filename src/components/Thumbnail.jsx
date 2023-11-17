import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Thumbnail = ({ restBase, featuredImage }) => {
  const restPath = restBase + "posts?_embed";
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
          {restData.map((post) => (
            <article key={post.id} id={`post-${post.id}`}>
              {post.featured_media !== 0 && post._embedded && (
                <figure
                  className="featured-image"
                  dangerouslySetInnerHTML={featuredImage(
                    post?._embedded["wp:featuredmedia"][0]
                  )}
                ></figure>
              )}
              <Link to={`/works/${post.slug}`}>
                <h2>{post?.title?.rendered}</h2>
              </Link>
            </article>
          ))}
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default Thumbnail;
