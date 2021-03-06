import { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { v4 as uuidv4 } from "uuid";

import { AppCont } from "../../App";

let showMenu: Record<string, boolean> = {
  mode: false,
  time: false,
  caret: false,
  keybinds: false,
};

let previouslyOpened: string | undefined;

const PopUpMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const {
    mode,
    setMode,
    isBlockCaret,
    startTime,
    timeArray,
    onTimeChange,
    onCaretClick,
  } = useContext(AppCont);

  const menuRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(menuRef);
  const tl = useRef<GSAPTimeline>();

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .from(".menu-div", {
        duration: 0.5,
        autoAlpha: 0,
        scale: 0,
        ease: "back",
      })
      .from(q(".background>span"), {
        duration: 1,
        x: 30,
        backgroundColor: "rgb(85, 202, 85)",
        stagger: 0.2,
        autoAlpha: 0,
        ease: "back",
      })
      .from(
        q(".menu-headings"),
        {
          duration: 1,
          y: 10,
          autoAlpha: 0,
          stagger: 0.6,
        },
        "-=2.5"
      );

    // Listen for esc being pressed in the window
    window.addEventListener("keydown", onWindowKeyDown);
    return () => {
      if (tl.current) tl.current.kill(); // kill all animations on unmount
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, []);

  function onWindowKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") handleCloseMenu();
  }

  const verifyTime = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLSpanElement;
    const time = target.getAttribute("data-timevalue");

    if (time) {
      if (+time === startTime) return;
      onTimeChange(+time);
    }
  };

  const animate = (element: string, display: boolean) => {
    if (display) {
      gsap.set(q(element), { height: "auto" });
      gsap.from(q(element), { duration: 0.5, height: 0 });
    } else {
      gsap.to(q(element), { duration: 0.5, height: 0 });
    }
  };

  const closePreviouslyOpened = (element: string) => {
    gsap.to(q(element), { duration: 0.5, height: 0 });
  };

  const handleClick = (cartegory: string) => {
    const stringEnd = cartegory.split("-")[1];
    showMenu[stringEnd] = !showMenu[stringEnd];

    if (
      showMenu[stringEnd] &&
      previouslyOpened &&
      previouslyOpened !== cartegory
    ) {
      closePreviouslyOpened(`.${previouslyOpened}`);
      const stringEnd = previouslyOpened.split("-")[1];
      showMenu[stringEnd] = !showMenu[stringEnd];
    }

    previouslyOpened = cartegory !== previouslyOpened ? cartegory : undefined;
    animate(`.${cartegory}`, showMenu[stringEnd]);
  };

  const handleCloseMenu = () => {
    if (previouslyOpened) {
      closePreviouslyOpened(`.${previouslyOpened}`);
      const stringEnd = previouslyOpened.split("-")[1];
      showMenu[stringEnd] = !showMenu[stringEnd];
      previouslyOpened = undefined;
    }

    if (tl.current) tl.current.timeScale(3).reverse();
    closeMenu();
  };

  return (
    <>
      <div className="modal-sibling on-top"></div>

      <div className="menu-div" ref={menuRef}>
        <div className="menu-close">
          <div onClick={handleCloseMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="menu-menu">
          <section>
            <div className="background">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1
              className="menu-headings"
              onClick={() => handleClick("menu-mode")}
            >
              WORDS
            </h1>
          </section>
          <div className="menu-options-div  menu-mode">
            <p
              className={mode === "common" ? "menu-selected" : ""}
              onClick={() => setMode("common")}
            >
              common
            </p>
            <p
              className={mode === "complex" ? "menu-selected" : ""}
              onClick={() => setMode("complex")}
            >
              complex
            </p>
          </div>
          <section>
            <div className="background">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1
              className="menu-headings"
              onClick={() => handleClick("menu-time")}
            >
              TIME
            </h1>
          </section>

          <div className="menu-options-div  menu-time">
            {timeArray.map((time) => (
              <p
                key={uuidv4()}
                onClick={verifyTime}
                className={startTime === time ? "menu-selected" : ""}
                data-timevalue={time}
              >
                {time}
              </p>
            ))}
          </div>

          <section>
            <div className="background">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1
              className="menu-headings"
              onClick={() => handleClick("menu-caret")}
            >
              CARET
            </h1>
          </section>
          <div className="menu-options-div  menu-caret">
            <p
              onClick={() => onCaretClick(false)}
              className={!isBlockCaret ? "menu-selected" : ""}
            >
              <span
                className={
                  !isBlockCaret
                    ? "thin-caret-span thin-caret-active"
                    : "thin-caret-span"
                }
              ></span>
            </p>
            <p
              onClick={() => onCaretClick(true)}
              className={isBlockCaret ? "menu-selected" : ""}
            >
              <span
                className={
                  isBlockCaret
                    ? "block-caret-span block-caret-active"
                    : "block-caret-span"
                }
              ></span>
            </p>
          </div>
          <section>
            <div className="background">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1
              className="menu-headings"
              onClick={() => handleClick("menu-keybinds")}
            >
              KEYBINDS
            </h1>
          </section>
          <div className="menu-options-div  menu-keybinds">
            {/* <p>15</p>
            <p className="menu-selected">30</p>
            <p>60</p> */}
            <div className="binds-div">
              <code>f5</code> - restart test
            </div>
            <div className="binds-div">
              <code>esc</code> - close modal
            </div>
            <div className="binds-div">
              <code>ctrl/cmd</code> + <code>/</code> - toggle caret
            </div>
            <div className="binds-div">
              <code>ctrl/cmd</code> + <code>enter</code> - toggle result
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpMenu;
