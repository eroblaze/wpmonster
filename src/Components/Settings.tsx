import { useRef } from "react";
import { gsap } from "gsap";
import ModalBackground from "./ModalBackground";

let showMenu: Record<string, boolean> = {
  mode: false,
  time: false,
  caret: false,
  keybinds: false,
};

let previouslyOpened: string | undefined;

const Settings = ({
  setShowSettings,
  handleMenuClicked,
}: {
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  handleMenuClicked: () => void;
}) => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(settingsRef);

  //   function onWindowKeyDown(e: KeyboardEvent) {
  //     if (e.key === "Escape") handleCloseMenu();
  //   }

  const animate = (element: string, display: boolean) => {
    if (display) {
      document.documentElement.style.setProperty(
        "--settings-element-height",
        `${q(element)[0].scrollHeight}px`
      );

      q(element)[0].classList.add("open");
    } else {
      q(element)[0].classList.remove("open");
    }
  };

  const closePreviouslyOpened = (element: string) => {
    q(element)[0].classList.remove("open");
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

  const handleCloseSettings = () => {
    if (previouslyOpened) {
      closePreviouslyOpened(`.${previouslyOpened}`);
      const stringEnd = previouslyOpened.split("-")[1];
      showMenu[stringEnd] = !showMenu[stringEnd];
      previouslyOpened = undefined;
    }
  };

  return (
    <ModalBackground
      childRef={settingsRef}
      toggleModal={setShowSettings}
      closeAllSettings={handleCloseSettings}
      handleMenuClicked={handleMenuClicked}
    >
      <div className="settings" ref={settingsRef}>
        <section
          className="section-bg"
          onClick={() => handleClick("settings-mode")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3">WORDS</h4>
        </section>
        <div className="settings__options-div  settings-mode">
          <p className="settings--selected">common</p>
          <p className="ignore">complex</p>
        </div>
        <section
          className="section-bg"
          onClick={() => handleClick("settings-time")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3 clickable">TIME</h4>
        </section>

        <div className="settings__options-div  settings-time">
          <p className="settings--selected">15</p>
          <p className="ignore">30</p>
          <p className="ignore">60</p>
        </div>

        <section
          className="section-bg"
          onClick={() => handleClick("settings__caret")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3 clickable">CARET</h4>
        </section>
        <div className="settings__options-div  settings__caret">
          <p className="ignore">
            <span className={"thin__caret"}></span>
          </p>
          <p className="settings--selected">
            <span className="block__caret block__caret--active"></span>
          </p>
        </div>
        <section
          className="section-bg"
          onClick={() => handleClick("settings-keybinds")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3 clickable">KEYBINDS</h4>
        </section>
        <div className="settings__options-div  settings-keybinds">
          {/* <p>15</p>
            <p className="settings--selected">30</p>
            <p>60</p> */}
          <div className="small">
            <code>f5</code> - restart test
          </div>
          <div className="small">
            <code>esc</code> - close modal
          </div>
          <div className="small">
            <code>ctrl/cmd</code> + <code>/</code> - toggle caret
          </div>
          <div className="small">
            <code>ctrl/cmd</code> + <code>enter</code> - toggle result
          </div>
        </div>
      </div>
    </ModalBackground>
  );
};

export default Settings;
