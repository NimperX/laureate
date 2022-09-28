import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import SidePanel from "../components/SidePanel";
import TweetCard from "../components/TweetCard";
import { usePanStore } from "../store";
import ExportButton from "../components/ExportButton";
import Arrow from "../components/Arrow";

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const rootRef = useRef();

  const spaceDown = usePanStore((state: any) => state.spaceDown);
  const changeSpaceDown = usePanStore((state: any) => state.changeSpaceDown);
  const [mouseDown, setMouseDown] = useState(false);
  const [moveBy, setMoveBy] = useState({ X: 0, Y: 0 });

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 32) {
        changeSpaceDown(true);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) {
        changeSpaceDown(false);
      }
    });
  }, []);

  function mouseDownHandler() {
    setMouseDown(true);
  }
  function mouseUpHandler() {
    setMouseDown(false);
  }
  function mouseMoveHandler(e: any) {
    if (mouseDown && spaceDown) {
      setMoveBy((s) => ({ X: s.X + e.movementX, Y: s.Y + e.movementY }));
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        <Arrow />
        <div className="relative z-10 flex h-screen flex-col overflow-hidden">
          <Header setIsPanelOpen={setIsPanelOpen} />
          <SidePanel isPanelOpen={isPanelOpen} />
          <div className="absolute inset-0 z-[-10] flex items-center justify-center">
            <div
              onMouseDown={mouseDownHandler}
              onMouseUp={mouseUpHandler}
              onMouseMove={mouseMoveHandler}
              style={{
                transform: `translate(${moveBy.X}px, ${moveBy.Y}px)`,
              }}
              className={`${
                spaceDown ? (mouseDown ? "cursor-grabbing" : "cursor-grab") : ""
              }`}
            >
              <TweetCard rootRef={rootRef} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <ExportButton rootRef={rootRef} />
        </div>
      </div>
    </div>
  );
}
