export default function AmongUs() {
  return (
    <div className="py-16">
      {/*fullscreen video of rickroll */}
      <div className="relative h-[calc(100vh-6rem)]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&loop=1&playlist=dQw4w9WgXcQ"
          title="Rickroll"
          allow="autoplay"
        />
      </div>
    </div>
  );
}
