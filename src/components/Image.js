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

  return (
    <>
      {priority ? <link rel="preload" as="image" href={formattedUrl} /> : null}
      <NextImage
        src={formattedUrl}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        // sizes={sizes}
        priority={priority}
        {...props}
      />
    </>
    // <div
    //   style={{
    //     width: "100%",
    //     height,
    //   }}>
    //   <link rel="preload" as="image" href={src} />

    //   <div style={{position: "relative", width: "100%"}}>
    //     <NextImage
    //       {...props}
    //       src={formattedUrl}
    //       alt={alt}
    //       fill
    //       ref={ref}
    //       // sizes={sizes}
    //       loading={loading}
    //       loader={({src, width}) => `${src}?w=${width}&q=50`}
    //       onLoadingComplete={({naturalHeight}) => {
    //         console.log("natural height", naturalHeight);
    //         setHeight(naturalHeight);
    //       }}
    //       onLoad={() => {
    //         console.log("loaded how");
    //         setIsLoaded(true);
    //       }}
    //       priority={loading === "eager" ? priority : false}
    //       style={{
    //         width: undefined,
    //         height: undefined,
    //         display: isLoaded ? "block" : "none",
    //       }}
    //     />
    //   </div>
    // </div>
  );
};

export default Image;
