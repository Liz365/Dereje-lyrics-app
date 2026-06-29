import React, { useState } from 'react';
import { ALBUMS_DATA } from './songsData';

export default function App() {
  const [activeAlbum, setActiveAlbum] = useState(ALBUMS_DATA[7]); // Defaults to Volume 8
  const [activeSong, setActiveSong] = useState(ALBUMS_DATA[7].songs[5]); // Defaults to Track 6

  const handleAlbumChange = (album) => {
    setActiveAlbum(album);
    setActiveSong(album.songs && album.songs.length > 0 ? album.songs[0] : null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-6 px-4 shadow-md text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Dr. Dereje Kebede Archive</h1>
        <p className="text-blue-200 mt-1 text-xs md:text-sm font-medium">Volumes 1 - 10 Lyrics Library</p>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Album Selector Panel */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b">Albums</h2>
          <div className="space-y-1 max-h-[300px] md:max-h-none overflow-y-auto">
            {ALBUMS_DATA.map((album) => (
              <button
                key={album.id}
                onClick={() => handleAlbumChange(album)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm font-semibold ${
                  activeAlbum.id === album.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {album.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tracklist Panel */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b">
            Tracks ({activeAlbum.songs.length})
          </h2>
          {activeAlbum.songs.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm italic">
              No track entries added yet for this volume.
            </div>
          ) : (
            <div className="space-y-1">
              {activeAlbum.songs.map((song) => (
                <button
                  key={song.track}
                  onClick={() => setActiveSong(song)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSong?.title === song.title
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="inline-block w-5 text-slate-400 font-mono text-xs">{song.track}.</span>
                  {song.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lyrics & Link Viewer */}
        <div className="md:col-span-2 bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
          {activeSong ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                    Track {activeSong.track}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">{activeSong.title}</h2>
                </div>
                
                <a
                  href={activeSong.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-3.5 py-2 rounded-lg hover:bg-red-700 text-xs font-semibold shadow-sm transition-colors self-start sm:self-center"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch Video
                </a>
              </div>

              <div 
                className="bg-slate-50/60 p-5 rounded-xl border border-slate-100 leading-relaxed text-base md:text-lg text-slate-800 font-normal overflow-y-auto max-h-[450px] shadow-inner"
                style={{ direction: 'rtl', textAlign: 'right', whiteSpace: 'pre-line' }}
              >
                {activeSong.lyrics}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-64 text-slate-400">
              <p className="text-sm italic">Select a track from the side menu to view lyrics.</p>
            </div>
          )}
          
          <footer className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-center text-slate-400 font-mono tracking-wider">
            LOCAL ENGINE V1.0 • DATA LOADED NATIVELY
          </footer>
        </div>

      </div>
    </div>
  );
}