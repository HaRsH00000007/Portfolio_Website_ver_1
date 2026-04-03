import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current!;
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });
    
    let isHoveringIcon = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isHoveringIcon) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (target.dataset.cursor === "icons") {
        const rect = target.getBoundingClientRect();
        cursor.classList.add("cursor-icons");
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        isHoveringIcon = true;
      }
      if (target.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      isHoveringIcon = false;
    };

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseover", onMouseOver as EventListener);
      element.addEventListener("mouseout", onMouseOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll("[data-cursor]").forEach((item) => {
        const element = item as HTMLElement;
        element.removeEventListener("mouseover", onMouseOver as EventListener);
        element.removeEventListener("mouseout", onMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
