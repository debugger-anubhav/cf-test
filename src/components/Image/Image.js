import React, {useEffect, useRef, useState} from "react";
import NextImage from "next/image";

const getSizes = () =>
  `(max-width: 359) 359px,
    (max-width: 427px) 427px,
    (max-width: 482px) 482px,
    (max-width: 519px) 519px,
    (max-width: 929px) 929px,
    (max-width: 1139px) 1139px,
    (max-width: 1359px) 1359px,
    (max-width: 1399px) 1399px,
    (max-width: 1439px) 1439px,
    (max-width: 1659px) 1659px,
    (max-width: 1849px) 1849px,
    (max-width: 1999px) 1999px,
  `;

const Image = ({src, alt, priority = true, ...props}) => {
  const sizes = getSizes();

  const formattedUrl = src?.startsWith("https:") ? src : `https:${src}`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [height, setHeight] = useState(undefined);

  const ref = useRef(null);

  const handleResize = () => {
    setHeight(ref.current.getBoundingClientRect().height);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", () => handleResize);
  }, []);

  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().height > 0) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref.current]);

  return (
    <div
      style={{
        width: "100%",
        height,
      }}>
      <link rel="preload" as="image" href={src} />

      <div style={{position: "relative", width: "100%", height: "100%"}}>
        <NextImage
          {...props}
          src={formattedUrl}
          alt={alt}
          fill
          ref={ref}
          sizes={sizes}
          loading="eager"
          loader={({src, width}) => `${src}?w=${width}&q=50`}
          onLoadingComplete={({naturalHeight}) => {
            setHeight(naturalHeight);
          }}
          onLoad={() => {
            setIsLoaded(true);
          }}
          priority={priority}
          style={{
            width: undefined,
            height: undefined,
            display: isLoaded ? "block" : "none",
          }}
        />
      </div>
    </div>
  );
};

export default Image;
