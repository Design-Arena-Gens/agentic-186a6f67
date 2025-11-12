"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '../../lib/auth';
import ThumbnailGenerator from '../../components/ThumbnailGenerator';
import TitleDescriptionGenerator from '../../components/TitleDescriptionGenerator';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.replace('/auth');
      return;
    }
    setUser(u);
    const raw = window.localStorage.getItem('creatorai_items');
    setItems(raw ? JSON.parse(raw) : []);
  }, [router]);

  const saveItem = (item) => {
    const next = [item, ...items].slice(0, 200);
    setItems(next);
    window.localStorage.setItem('creatorai_items', JSON.stringify(next));
  };

  const removeItem = (id) => {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    window.localStorage.setItem('creatorai_items', JSON.stringify(next));
  };

  const thumbnails = useMemo(() => items.filter(i => i.type === 'thumbnail'), [items]);
  const texts = useMemo(() => items.filter(i => i.type === 'text'), [items]);

  if (!user) return null;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">Create and manage your content assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/pricing" className="btn btn-outline">Upgrade</a>
          <button className="btn btn-outline" onClick={() => { logout(); router.push('/'); }}>Logout</button>
        </div>
      </div>

      <ThumbnailGenerator onSave={saveItem} />
      <TitleDescriptionGenerator onSave={saveItem} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Saved thumbnails</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {thumbnails.map((t) => (
            <div key={t.id} className="card">
              <div className="card-body space-y-3">
                <div className="aspect-video rounded-md overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.imageUrl} alt="Saved thumbnail" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{t.prompt}</p>
                <div className="flex gap-2">
                  <a className="btn btn-outline" href={t.imageUrl} download>
                    Download
                  </a>
                  <button onClick={()=>removeItem(t.id)} className="btn btn-outline">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {!thumbnails.length && <p className="text-gray-600">No thumbnails yet.</p>}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Saved titles & descriptions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {texts.map((x) => (
            <div key={x.id} className="card">
              <div className="card-body space-y-2">
                <p className="text-xs text-gray-600">Prompt: {x.prompt}</p>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {x.titles.map((t,i) => <li key={i}>{t}</li>)}
                </ul>
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{x.description}</p>
                </div>
                <button onClick={()=>removeItem(x.id)} className="btn btn-outline">Delete</button>
              </div>
            </div>
          ))}
          {!texts.length && <p className="text-gray-600">No text assets yet.</p>}
        </div>
      </section>
    </div>
  );
}
