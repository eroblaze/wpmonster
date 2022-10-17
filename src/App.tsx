import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";

import { useAppSelector } from "./app/hooks";
import { selectAppState } from "./features/appSlice";

function App() {
  const { shouldShowOtherContainer } = useAppSelector(selectAppState);

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

    // Incase it is loaded first on landscape mode on mobile
    onWindowHeightResize();

    return () => {
      // This is needed in development because of double rendering
      gsap.set(
        [".site-title", ".menu>span", ".menu__hamburger", ".wordsDivContainer"],
        { opacity: 1, scale: 1, y: 0 }
      );
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onWindowHeightResize);
    return () => {
      window.removeEventListener("resize", onWindowHeightResize);
    };
  }, [shouldShowOtherContainer]);

  const onWindowHeightResize = useCallback(() => {
    // On mobile, when the keyboard comes, the viewport height becomes smaller
    const header = document.querySelector("header") as HTMLHeadingElement;
    const footer = document.querySelector("footer") as HTMLElement;
    const wordsContainer = document.querySelector(
      ".wordsDivContainer"
    ) as HTMLElement;
    const wordsDivMarginTop = 32;

    if (
      window.innerHeight <=
        header.offsetHeight +
          footer.offsetHeight +
          wordsContainer.offsetHeight +
          wordsDivMarginTop &&
      !shouldShowOtherContainer
    ) {
      header.classList.add("onlyWords__margin-bottom");
    } else {
      // This is necessary since I am removing the margin-top from the wordDivContainer if this class exists
      if (!shouldShowOtherContainer)
        header.classList.remove("onlyWords__margin-bottom");
    }
  }, [shouldShowOtherContainer]);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default App;
