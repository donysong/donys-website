export default function Demo() {
  return (
    <section id="demo" className="mx-auto max-w-5xl px-6 py-28">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          See it in action
        </h2>
        <p className="text-neutral-400">
          Watch how Dony's speeds up your After Effects workflow.
        </p>
      </div>

      {/* Video embed placeholder */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] glow">
        <div className="relative aspect-video w-full">
          {/* TODO: Replace with YouTube embed or video */}
          {/* <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /> */}
          <div className="flex h-full items-center justify-center text-neutral-600">
            <div className="text-center">
              <div className="mb-3 text-5xl">▶</div>
              <p className="text-sm">Demo Video Here</p>
              <p className="mt-1 text-xs text-neutral-700">YouTube embed or .mp4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature GIF grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {['Text Presets', 'Graph Editor', 'Gradient Library'].map((label) => (
          <div
            key={label}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
          >
            <div className="flex h-48 items-center justify-center text-neutral-600">
              {/* TODO: Replace with GIF */}
              <p className="text-xs">{label} GIF</p>
            </div>
            <div className="border-t border-[var(--border)] px-4 py-3">
              <p className="text-sm font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
