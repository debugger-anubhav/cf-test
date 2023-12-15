import React, {useState} from "react";
import styles from "./demo.module.css";

function Demo() {
  const [curSlide, setCurSlide] = useState(1);
  const slides = [
    "https://source.unsplash.com/random?landscape,mountain",
    "https://source.unsplash.com/random?landscape,cars",
    "https://source.unsplash.com/random?landscape,night",
    "https://source.unsplash.com/random?landscape,city",
    "https://source.unsplash.com/random?landscape,night",
    "https://source.unsplash.com/random?landscape,city",
  ];

  // Duplicate slides for infinite scrolling
  const duplicatedSlides = [...slides, ...slides, ...slides];

  //   const nextSlide = () => {
  //     setCurSlide(prevSlide =>
  //       prevSlide === duplicatedSlides.length - 1 ? 0 : prevSlide + 1,
  //     );
  //   };

  //   const prevSlide = () => {
  //     setCurSlide(prevSlide =>
  //       prevSlide === 0 ? duplicatedSlides.length - 1 : prevSlide - 1,
  //     );
  //   };

  const nextSlide = () => {
    setCurSlide(prevSlide =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1,
    );
  };

  const prevSlide = () => {
    setCurSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.slider}>
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === curSlide ? styles.active : ""
            }`}
            style={{
              transform: `translateX(${100 * (index - curSlide)}%)`,
              transformOrigin: index === curSlide ? "center" : "",
              // scale: index === curSlide ? 1.2 : 1,
            }}>
            <img src={slide} alt={`image-${index}`} />
            <div className={styles.showContent}>
              <p>dfh sdjgjs sdjgjsd sdjgs dgsui etywicd sdfsuef sdgsdus</p>
              <p>dfh sdjgjs sdjgjsd sdjgs dgsui etywicd sdfsuef sdgsdus</p>
              <p>dfh sdjgjs sdjgjsd sdjgs dgsui etywicd sdfsuef sdgsdus</p>
              <p>dfh sdjgjs sdjgjsd sdjgs dgsui etywicd sdfsuef sdgsdus</p>
            </div>
          </div>
        ))}

        {/* Control buttons */}
        <button
          className={`${styles.btn} ${styles.next}`}
          onClick={nextSlide}></button>
        <button
          className={`${styles.btn} ${styles.prev}`}
          onClick={prevSlide}></button>
      </div>
    </div>
  );
}

export default Demo;
