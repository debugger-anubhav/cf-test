import React from "react";
import NextImage from "next/image";

// const getSizes = () =>
//   `(max-width: 359) 359px,
//     (max-width: 427px) 427px,
//     (max-width: 482px) 482px,
//     (max-width: 519px) 519px,
//     (max-width: 929px) 929px,
//     (max-width: 1139px) 1139px,
//     (max-width: 1359px) 1359px,
//     (max-width: 1399px) 1399px,
//     (max-width: 1439px) 1439px,
//     (max-width: 1659px) 1659px,
//     (max-width: 1849px) 1849px,
//     (max-width: 1999px) 1999px,
//   `;

const Image = ({src, alt, priority = false, loading = "lazy", ...props}) => {
  // const sizes = getSizes();

  const formattedUrl = src?.startsWith("https:") ? src : `https:${src}`;

  // const [isLoaded, setIsLoaded] = useState(false);
  // const [height, setHeight] = useState(undefined);

  // const ref = useRef(null);

  // const handleResize = () => {
  //   setHeight(ref.current.getBoundingClientRect().height);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", () => handleResize);
  // }, []);

  // useEffect(() => {
  //   if (ref.current && ref.current.getBoundingClientRect().height > 0) {
  //     setHeight(ref.current.getBoundingClientRect().height);
  //   }
  // }, [ref.current]);

  return (
    <div>
      {priority ? <link rel="preload" as="image" href={formattedUrl} /> : null}
      <NextImage src={formattedUrl} alt={alt} priority={priority} {...props} />
    </div>
  );
};

export default Image;
