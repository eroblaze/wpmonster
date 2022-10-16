import { useRef, useEffect } from "react";
import Result from "./Result";
import Settings from "./Settings";

import gsap from "gsap";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  optimizedSelectAppState,
  setShowHighScore,
  setShowSettings,
  setShouldShowOtherContainer,
  setShowOtherContainerIfItWasShown,
} from "../features/appSlice";

let clicked = false;

const Header = () => {
  const dispatch = useAppDispatch();
  const {
    shouldShowOtherContainer,
    showOtherContainerIfItWasShown,
    showHighScore,
    showSettings,
    highScore,
  } = useAppSelector(optimizedSelectAppState);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hiderRef = useRef<SVGSVGElement | null>(null);
  const menuTlRef = useRef<gsap.core.Timeline>();
  const canStart = useRef(0);

  useEffect(() => {
    menuTlRef.current = gsap
      .timeline({ paused: true })
      .to(
        [
          hamburgerRef.current?.querySelector("span:first-child"),
          hamburgerRef.current?.querySelector("span:last-child"),
        ],
        {
          width: 10,
        }
      )
      .to(hamburgerRef.current, {
        rotate: 45,
      })
      .to(
        [
          hamburgerRef.current?.querySelector("span:first-child"),
          hamburgerRef.current?.querySelector("span:last-child"),
        ],
        {
          height: 7,
          width: 2,
        }
      );

    return () => {
      menuTlRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (hiderRef.current) {
      const { current } = hiderRef;

      if (shouldShowOtherContainer) {
        if (!canStart.current) canStart.current = 1;
        current.classList.add("hider-active");
        current.classList.remove("hider-passive");
      } else {
        if (canStart.current) {
          current.classList.remove("hider-active");
          current.classList.add("hider-passive");
        }
      }
    }
    // For the Ctrl + Enter toggle feature
    window.addEventListener("keydown", handleKeysCombination);
    return () => {
      // console.log("unmounting");
      window.removeEventListener("keydown", handleKeysCombination);
    };
  }, [shouldShowOtherContainer]);

  function handleKeysCombination(e: KeyboardEvent) {
    if (e.key === "Enter" && e.ctrlKey) {
      toggle();
    }
  }

  function toggle() {
    // shouldShowOtherContainer will only become true when the user has typed and a result is generated
    if (canStart.current) {
      dispatch(setShouldShowOtherContainer(!shouldShowOtherContainer));
      dispatch(
        setShowOtherContainerIfItWasShown(!showOtherContainerIfItWasShown)
      );

      const root = document.querySelector("#root") as HTMLElement;

      if (root.classList.contains("onlyWords")) {
        // For mobile
        const foundOrNot = document.querySelector(
          ".onlyWords__margin-bottom"
        ) as HTMLElement;
        const docRoot = document.documentElement;
        if (foundOrNot) {
          // This means the header already has margin-bottom
          docRoot.style.setProperty("--wordsDivContainer-m-top-js", "0px");
        } else {
          docRoot.style.setProperty(
            "--wordsDivContainer-m-top-js",
            "var(--wordsDivContainer-m-top)"
          );
        }
      }

      root.classList.toggle("onlyWords");
    }
  }

  const animationEnd = () => {
    // check if menu was toggled quickly
    if (!menuRef.current?.classList.contains("fadeIn")) {
      menuRef.current?.classList.remove("menu__visible");
      menuRef.current?.classList.add("menu__invisible");
    }
  };

  const handleMenuClicked = () => {
    switch (clicked) {
      case false:
        menuRef.current?.removeEventListener("animationend", animationEnd);

        menuTlRef.current?.timeScale(4).play();

        menuRef.current?.classList.remove("menu__invisible");
        menuRef.current?.classList.remove("fadeOut");
        menuRef.current?.classList.add("menu__visible");
        menuRef.current?.classList.add("fadeIn");
        clicked = true;
        break;

      default:
        menuTlRef.current?.timeScale(4).reverse();

        menuRef.current?.classList.remove("fadeIn");
        menuRef.current?.classList.add("fadeOut");

        menuRef.current?.addEventListener("animationend", animationEnd, {
          once: true,
        });
        clicked = false;
    }
  };

  const handleHighScoreClicked = () => {
    if (highScore.WPM) dispatch(setShowHighScore(!showHighScore));
    else {
      // If this is the user's first time and he/she is trying to access the personal record modal
      toast.warn("No high score yet!", {
        progressClassName: "toastify-progress-height",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      toast.clearWaitingQueue();
    }
  };

  return (
    <header className="container">
      <nav className="header">
        <h1
          onClick={toggle}
          className={
            canStart.current || shouldShowOtherContainer
              ? "clickable anchor icon__hover logo"
              : "anchor logo"
          }
        >
          <p>
            <span className="header--green site-title invisible">w</span>
            <span className="header--green site-title invisible">p</span>
            <span className="header--green site-title invisible">m</span>
            <span className="site-title invisible">o</span>
            <span className="site-title invisible">n</span>
            <span className="site-title invisible">s</span>
            <span className="site-title invisible">t</span>
            <span className="site-title invisible">e</span>
            <span className="site-title invisible">r</span>
          </p>
          <svg
            ref={hiderRef}
            className="site-title invisible header__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
          >
            <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z" />
          </svg>
        </h1>
        <div className="menu" ref={menuRef}>
          <span
            className="invisible clickable icon__hover"
            onClick={handleHighScoreClicked}
          >
            <svg
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_23_140"
                //   style={{ "mask-type": "alpha" }}
                maskUnits="userSpaceOnUse"
                x="1"
                y="2"
                width="22"
                height="21"
              >
                <path
                  d="M6.5 21.568H17.5L20.5 11.068L15.5 13.568L12 6.56799L8.5 13.568L3.5 11.068L6.5 21.568Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 11.068C4.32843 11.068 5 10.3964 5 9.56799C5 8.73957 4.32843 8.06799 3.5 8.06799C2.67157 8.06799 2 8.73957 2 9.56799C2 10.3964 2.67157 11.068 3.5 11.068Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M12 6.56799C12.8284 6.56799 13.5 5.89642 13.5 5.06799C13.5 4.23957 12.8284 3.56799 12 3.56799C11.1716 3.56799 10.5 4.23957 10.5 5.06799C10.5 5.89642 11.1716 6.56799 12 6.56799Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M20.5 11.068C21.3284 11.068 22 10.3964 22 9.56799C22 8.73957 21.3284 8.06799 20.5 8.06799C19.6716 8.06799 19 8.73957 19 9.56799C19 10.3964 19.6716 11.068 20.5 11.068Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
              </mask>
              <g mask="url(#mask0_23_140)">
                <path d="M0 0.567993H24V24.568H0V0.567993Z" />
              </g>
            </svg>
            <p className="menu-logo-label">highscore</p>
          </span>

          <span
            className="invisible clickable icon__hover"
            onClick={() => dispatch(setShowSettings(!showSettings))}
          >
            <svg
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.43 13.548C19.47 13.228 19.5 12.908 19.5 12.568C19.5 12.228 19.47 11.908 19.43 11.588L21.54 9.93799C21.73 9.78799 21.78 9.51799 21.66 9.29799L19.66 5.83799C19.54 5.61799 19.27 5.53799 19.05 5.61799L16.56 6.61799C16.04 6.21799 15.48 5.88799 14.87 5.63799L14.49 2.98799C14.46 2.74799 14.25 2.56799 14 2.56799H10C9.75002 2.56799 9.54002 2.74799 9.51002 2.98799L9.13002 5.63799C8.52002 5.88799 7.96002 6.22799 7.44002 6.61799L4.95002 5.61799C4.72002 5.52799 4.46002 5.61799 4.34002 5.83799L2.34002 9.29799C2.21002 9.51799 2.27002 9.78799 2.46002 9.93799L4.57002 11.588C4.53002 11.908 4.50002 12.238 4.50002 12.568C4.50002 12.898 4.53002 13.228 4.57002 13.548L2.46002 15.198C2.27002 15.348 2.22002 15.618 2.34002 15.838L4.34002 19.298C4.46002 19.518 4.73002 19.598 4.95002 19.518L7.44002 18.518C7.96002 18.918 8.52002 19.248 9.13002 19.498L9.51002 22.148C9.54002 22.388 9.75002 22.568 10 22.568H14C14.25 22.568 14.46 22.388 14.49 22.148L14.87 19.498C15.48 19.248 16.04 18.908 16.56 18.518L19.05 19.518C19.28 19.608 19.54 19.518 19.66 19.298L21.66 15.838C21.78 15.618 21.73 15.348 21.54 15.198L19.43 13.548ZM12 16.068C10.07 16.068 8.50002 14.498 8.50002 12.568C8.50002 10.638 10.07 9.06799 12 9.06799C13.93 9.06799 15.5 10.638 15.5 12.568C15.5 14.498 13.93 16.068 12 16.068Z" />
            </svg>
            <p className="menu-logo-label">settings</p>
          </span>
        </div>
        <button
          className="invisible menu__hamburger clickable"
          aria-label="Menu toggle"
          aria-controls="menu"
          onClick={handleMenuClicked}
          ref={hamburgerRef}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {showHighScore && (
        <Result isHighscore={true} handleMenuClicked={handleMenuClicked} />
      )}
      {showSettings && <Settings handleMenuClicked={handleMenuClicked} />}
    </header>
  );
};

export default Header;
