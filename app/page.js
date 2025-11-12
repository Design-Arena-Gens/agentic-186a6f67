export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Grow your YouTube channel with AI
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate scroll-stopping thumbnails, viral titles, and engaging descriptions in seconds.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="/auth" className="btn btn-primary">Get started</a>
          <a href="/pricing" className="btn btn-outline">See pricing</a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[{
          title: 'AI Thumbnail Generator',
          desc: 'Describe your video, get a beautiful thumbnail. Regenerate until perfect.'
        },{
          title: 'Title & Description',
          desc: 'Fresh, catchy titles and SEO-friendly descriptions tailored to your topic.'
        },{
          title: 'Creator Dashboard',
          desc: 'Save, organize, and download your best assets anytime.'
        }].map((f) => (
          <div className="card" key={f.title}>
            <div className="card-body">
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="card">
        <div className="card-body">
          <h2 className="text-xl font-semibold">Try it now</h2>
          <p className="text-gray-600">Open the dashboard to generate thumbnails, titles, and descriptions.</p>
          <div className="mt-4 flex gap-3">
            <a href="/dashboard" className="btn btn-primary">Open dashboard</a>
            <a href="/auth" className="btn btn-outline">Login</a>
          </div>
        </div>
      </section>
    </div>
  );
}
