import { useEffect, useState } from 'react';
import NoteCard from './components/noteCard';
import './styles/App.css';


const App = () => {
  const [groupedNotes, setGroupedNotes] = useState({});

  useEffect(() => {
    chrome.storage.local.get(['notes'], (result) => {
      const notes = result.notes || [];

      // Group notes by website hostname
      const grouped = {};
      notes.forEach(note => {
        try {
          const hostname = new URL(note.url).hostname;
          if (!grouped[hostname]) grouped[hostname] = [];
          grouped[hostname].push(note);
        } catch (e) {
          console.error("Invalid URL in note:", note.url);
        }
      });

      setGroupedNotes(grouped);
    });
  }, []);

  const handleDelete = (idToDelete) => {
    const updatedGrouped = {};
    const updatedNotes = [];

    Object.entries(groupedNotes).forEach(([host, notes]) => {
      const filtered = notes.filter(note => note.id !== idToDelete);
      if (filtered.length) {
        updatedGrouped[host] = filtered;
        updatedNotes.push(...filtered);
      }
    });

    setGroupedNotes(updatedGrouped);
    chrome.storage.local.set({ notes: updatedNotes });
  };

  return (
    <div className="app-container" style={{ padding: '10px', maxHeight: '400px', overflowY: 'auto' }}>
      {Object.keys(groupedNotes).length > 0 ? (
        Object.entries(groupedNotes).map(([host, notes]) => (
          <div key={host} style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '8px', color: '#444' }}>{host}</h3>
            {notes.map(note => (
              <NoteCard
                key={note.id}
                title={note.title}
                note={note.note}
                url={note.url}
                onDelete={() => handleDelete(note.id)}
              />
            ))}
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No notes yet. Highlight some text to get started!</p>
      )}
    </div>
  );
};

export default App;
