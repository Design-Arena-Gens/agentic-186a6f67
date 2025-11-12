export const metadata = { title: 'Pricing ? Creator AI' };

const tiers = [
  { name: 'Free', price: '$0', features: ['10 generations/day', 'Basic dashboard', 'Community support'] },
  { name: 'Pro', price: '$19/mo', features: ['Unlimited generations', 'HD downloads', 'Priority support'] },
  { name: 'Team', price: '$49/mo', features: ['Seats & collaboration', 'Brand templates', 'Export presets'] },
];

export default function PricingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Simple, transparent pricing</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div key={t.name} className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-3xl font-bold mt-2">{t.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {t.features.map((f)=> (<li key={f}>? {f}</li>))}
              </ul>
              <a href="/auth" className="btn btn-primary w-full mt-6">Get started</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
