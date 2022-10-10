import { useRef, useEffect, FC } from "react";

interface ModalBackgroundI {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleMenuClicked: () => void;
  closeAllSettings?: () => void;
  childRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

const ModalBackground: FC<ModalBackgroundI> = ({
  toggleModal,
  handleMenuClicked,
  closeAllSettings,
  childRef,
  children,
}) => {
  const ModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ModalRef.current) {
      ModalRef.current.addEventListener("click", handleClick);
    }
  }, []);

  function handleClick(e: MouseEvent) {
    const element = e.target as HTMLElement;
    const elementClass = element.getAttribute("class");

    if (elementClass === "modal-bg" && typeof toggleModal === "function") {
      if (ModalRef.current) {
        // For small devices
        if (handleMenuClicked) handleMenuClicked();
        // Close the opened settings menu first
        if (closeAllSettings) closeAllSettings();

        ModalRef.current.classList.add("fade-out");
        ModalRef.current.addEventListener(
          "animationend",
          () => {
            // cleanup
            ModalRef.current?.removeEventListener("click", handleClick);
            toggleModal(false);
          },
          { once: true }
        );
      } else {
        if (handleMenuClicked) handleMenuClicked();
        toggleModal(false);
      }
    } else {
      // The user clicked on the modal itself, not the background
      // Check if the active parts of the settings modal were clicked
      if (
        elementClass !== "section-bg" &&
        elementClass !== "background" &&
        elementClass !== "ignore" &&
        !elementClass?.includes("settings--selected") &&
        !elementClass?.includes("settings__heading") &&
        !elementClass?.includes("thin__caret") &&
        !elementClass?.includes("block__caret")
      ) {
        childRef.current?.classList.remove("wrong-click");
        childRef.current?.classList.add("wrong-click");

        const onAnimationEnd = () => {
          childRef.current?.classList.remove("wrong-click");
          childRef.current?.removeEventListener("animationend", onAnimationEnd);
        };
        childRef.current?.addEventListener("animationend", onAnimationEnd);
      }
    }
  }

  return (
    <>
      <div className="modal-bg" ref={ModalRef}>
        {children}
      </div>
    </>
  );
};

export default ModalBackground;
