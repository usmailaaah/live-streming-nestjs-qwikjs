import { component$, useVisibleTask$ } from "@builder.io/qwik";
import Hls from "hls.js";
export const LiveStream = component$(() => {
  useVisibleTask$(() => {
    const video = document.getElementById("live-video") as HTMLVideoElement;

    if (Hls.isSupported() && video) {
      const hls = new Hls();
      hls.loadSource("http://localhost:8080/hls/stream.m3u8");
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari
      video.src = "http://localhost:8080/hls/stream.m3u8";
    }
  });

  return (
    <div class="mx-auto mt-10 w-full max-w-3xl rounded-xl bg-black p-4 shadow-xl">
      <h2 class="mb-4 text-2xl font-semibold text-white">📡 البث المباشر</h2>

      <div class="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
        <video
          id="live"
          class="h-full w-full rounded-lg"
          controls
          muted
          playsInline
        />
      </div>

      <div class="mt-4 flex justify-between text-white">
        <button
          onClick$={() => {
            const video = document.getElementById("live") as HTMLVideoElement;
            video.currentTime -= 10;
          }}
          class="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600"
        >
          ⏪ -10s
        </button>
        <button
          onClick$={() => {
            const video = document.getElementById("live") as HTMLVideoElement;
            video.paused ? video.play() : video.pause();
          }}
          class="rounded bg-blue-600 px-6 py-2 font-bold hover:bg-blue-500"
        >
          ▶️/⏸
        </button>
        <button
          onClick$={() => {
            const video = document.getElementById("live") as HTMLVideoElement;
            video.currentTime += 10;
          }}
          class="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600"
        >
          ⏩ +10s
        </button>
      </div>
    </div>
  );
});
