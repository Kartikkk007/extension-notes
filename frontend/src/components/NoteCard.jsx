// src/components/NoteCard.jsx
import React from 'react';
import './NoteCard.css';



const NoteCard = ({ title, note, url, onDelete }) => {
  return (
    <div className="note-card">
      <h4 className="note-title">{title}</h4>
      <p className="note-text">{note}</p>
      <a className="note-url" href={url} target="_blank" rel="noreferrer">{url}</a>
      <button className="delete-button" onClick={onDelete}>🗑️ Delete</button>
    </div>
  );
};

export default NoteCard;
