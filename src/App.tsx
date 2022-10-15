import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";

function App() {
  const tl = useRef<GSAPTimeline>();

  useEffect(() => {
    // on page load animation :)
    tl.current = gsap
      .timeline()
      .from(".site-title", {
        duration: 0.5,
        stagger: 0.15,
        scale: -1,
        autoAlpha: 0,
      })
      .addLabel("fade-in")
      .from(
        [".menu>span", ".menu__hamburger"],
        {
          duration: 0.5,
          autoAlpha: 0,
        },
        "fade-in"
      )
      .from(
        ".wordsDivContainer",
        {
          duration: 0.5,
          y: -10,
          autoAlpha: 0,
          onComplete: () => {
            // Give the main input field focus
            const input = document.querySelector(
              ".input-div>input"
            ) as HTMLInputElement;
            if (input) input.focus();
          },
        },
        "fade-in"
      );

    return () => {
      // This is needed in development because of double rendering
      gsap.set(
        [".site-title", ".menu>span", ".menu__hamburger", ".wordsDivContainer"],
        { opacity: 1, scale: 1, y: 0 }
      );
    };
  }, []);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default App;
