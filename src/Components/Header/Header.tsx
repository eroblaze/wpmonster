import { useState, useContext, useEffect, useRef } from "react";
import { AppCont } from "../../App";
import PopUpMenu from "../Menu/PopUpMenu";
// For the warning notification
import { toast } from "react-toastify";

const Header = () => {
  const {
    shouldShowResultSection,
    setShouldShowResultSection,
    setShowSectionToggle,
    setShowHighScore,
    highScore,
    startTime,
    onTimeChange,
  } = useContext(AppCont);

  const [showMenu, setShowMenu] = useState(false);
  const hiderRef = useRef<SVGSVGElement | null>(null);
  const canStart = useRef(0);

  useEffect(() => {
    if (hiderRef.current) {
      const { current } = hiderRef;
      if (shouldShowResultSection) {
        if (!canStart.current) canStart.current = 1;
        current.classList.add("hider-active");
        current.classList.remove("hider-deactivate");
      } else {
        if (canStart.current) {
          current.classList.remove("hider-active");
          current.classList.add("hider-deactivate");
        }
      }
    }
    // For the Ctrl + Enter toggle feature
    window.addEventListener("keydown", handleKeysCombination);
    return () => {
      window.removeEventListener("keydown", handleKeysCombination);
    };
  }, [shouldShowResultSection]);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function handleKeysCombination(e: KeyboardEvent) {
    if (e.key === "Enter" && e.ctrlKey) handleHiderClick();
  }

  function handleHiderClick() {
    if (canStart.current) {
      setShouldShowResultSection(!shouldShowResultSection);
      setShowSectionToggle((former) => !former);
    }
  }

  const handleHighScore = () => {
    if (highScore.WPM) setShowHighScore((former) => !former);
    else {
      // If this is the user's first time and he/she is trying to access the personal record modal
      toast.warn("No High Score yet!", {
        progressClassName: "toastify-progress-height",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <span id="wpm-green">wpm</span>onster{" "}
          <span>
            <svg
              id="typing-box-2-hider-svg"
              className={
                canStart.current || shouldShowResultSection ? "hoverable" : ""
              }
              ref={hiderRef}
              onClick={handleHiderClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z" />
            </svg>
          </span>
        </h1>
      </div>
      <nav>
        <ul>
          <li title="High Score 🎉">
            <svg
              id="crown"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={handleHighScore}
            >
              <path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              id="menu-icon"
              onClick={toggleMenu}
            >
              <path d="M512 448H64c-35.35 0-64-28.65-64-64V128c0-35.35 28.65-64 64-64h448c35.35 0 64 28.65 64 64v256C576 419.3 547.3 448 512 448zM128 180v-40C128 133.4 122.6 128 116 128h-40C69.38 128 64 133.4 64 140v40C64 186.6 69.38 192 76 192h40C122.6 192 128 186.6 128 180zM224 180v-40C224 133.4 218.6 128 212 128h-40C165.4 128 160 133.4 160 140v40C160 186.6 165.4 192 172 192h40C218.6 192 224 186.6 224 180zM320 180v-40C320 133.4 314.6 128 308 128h-40C261.4 128 256 133.4 256 140v40C256 186.6 261.4 192 268 192h40C314.6 192 320 186.6 320 180zM416 180v-40C416 133.4 410.6 128 404 128h-40C357.4 128 352 133.4 352 140v40C352 186.6 357.4 192 364 192h40C410.6 192 416 186.6 416 180zM512 180v-40C512 133.4 506.6 128 500 128h-40C453.4 128 448 133.4 448 140v40C448 186.6 453.4 192 460 192h40C506.6 192 512 186.6 512 180zM128 276v-40C128 229.4 122.6 224 116 224h-40C69.38 224 64 229.4 64 236v40C64 282.6 69.38 288 76 288h40C122.6 288 128 282.6 128 276zM224 276v-40C224 229.4 218.6 224 212 224h-40C165.4 224 160 229.4 160 236v40C160 282.6 165.4 288 172 288h40C218.6 288 224 282.6 224 276zM320 276v-40C320 229.4 314.6 224 308 224h-40C261.4 224 256 229.4 256 236v40C256 282.6 261.4 288 268 288h40C314.6 288 320 282.6 320 276zM416 276v-40C416 229.4 410.6 224 404 224h-40C357.4 224 352 229.4 352 236v40C352 282.6 357.4 288 364 288h40C410.6 288 416 282.6 416 276zM512 276v-40C512 229.4 506.6 224 500 224h-40C453.4 224 448 229.4 448 236v40C448 282.6 453.4 288 460 288h40C506.6 288 512 282.6 512 276zM128 372v-40C128 325.4 122.6 320 116 320h-40C69.38 320 64 325.4 64 332v40C64 378.6 69.38 384 76 384h40C122.6 384 128 378.6 128 372zM416 372v-40C416 325.4 410.6 320 404 320h-232C165.4 320 160 325.4 160 332v40C160 378.6 165.4 384 172 384h232C410.6 384 416 378.6 416 372zM512 372v-40C512 325.4 506.6 320 500 320h-40C453.4 320 448 325.4 448 332v40C448 378.6 453.4 384 460 384h40C506.6 384 512 378.6 512 372z" />
            </svg>
          </li>
        </ul>

        {showMenu ? <PopUpMenu closeMenu={toggleMenu} /> : ""}
      </nav>
    </header>
  );
};

export default Header;
