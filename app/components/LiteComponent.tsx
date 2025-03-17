"use client";
import { useEffect } from "react";

export default function Video({ videoid }: { videoid: string }) {
  useEffect(() => {
    import("@justinribeiro/lite-youtube");
  }, []);

  //@ts-expect-error jsx no detected the web component
  return <lite-youtube videoid={videoid}></lite-youtube>;
}