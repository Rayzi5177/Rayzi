import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StickyNote, 
  Plus, 
  Search, 
  Pin, 
  Trash2, 
  Edit2,
  X,
  Tag
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { GlassCard, Button, Input, Modal, EmptyState } from '../components/ui';
import { useNotes } from '../context/NotesContext';
import { Note } from '../types';

export default function Notes() {
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(note => note.pinned);
  const otherNotes = filteredNotes.filter(note => !note.pinned);

  const openCreateModal = () => {
    setEditingNote(null);
    setNoteTitle('');
    setNoteContent('');
    setNoteCategory('');
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteCategory(note.category || '');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!noteTitle.trim()) return;

    if (editingNote) {
      updateNote(editingNote.id, {
        title: noteTitle,
        content: noteContent,
        category: noteCategory,
      });
    } else {
      addNote({
        title: noteTitle,
        content: noteContent,
        user_id: '1',
        pinned: false,
        category: noteCategory,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notes</h1>
            <p className="text-white/50">Manage your thoughts and ideas</p>
          </div>
          <Button onClick={openCreateModal}>
            <Plus className="w-5 h-5 mr-2" />
            Create Note
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-card pl-12 pr-4 py-3 bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="py-4">
            <p className="text-white/50 text-sm">Total</p>
            <p className="text-2xl font-bold text-white">{notes.length}</p>
          </GlassCard>
          <GlassCard className="py-4">
            <p className="text-white/50 text-sm">Pinned</p>
            <p className="text-2xl font-bold text-white">{notes.filter(n => n.pinned).length}</p>
          </GlassCard>
          <GlassCard className="py-4">
            <p className="text-white/50 text-sm">Categories</p>
            <p className="text-2xl font-bold text-white">{new Set(notes.map(n => n.category).filter(Boolean)).size}</p>
          </GlassCard>
          <GlassCard className="py-4">
            <p className="text-white/50 text-sm">Today</p>
            <p className="text-2xl font-bold text-white">
              {notes.filter(n => new Date(n.created_at).toDateString() === new Date().toDateString()).length}
            </p>
          </GlassCard>
        </div>

        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Pin className="w-5 h-5 text-yellow-400" />
              Pinned Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={() => openEditModal(note)}
                  onDelete={() => deleteNote(note.id)}
                  onTogglePin={() => togglePin(note.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Notes */}
        <div>
          {otherNotes.length > 0 ? (
            <>
              <h2 className="text-lg font-semibold text-white mb-4">All Notes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={() => openEditModal(note)}
                    onDelete={() => deleteNote(note.id)}
                    onTogglePin={() => togglePin(note.id)}
                  />
                ))}
              </div>
            </>
          ) : pinnedNotes.length === 0 ? (
            <EmptyState
              icon={<StickyNote className="w-16 h-16" />}
              title="No notes yet"
              description="Start organizing your thoughts by creating your first note."
              action={
                <Button onClick={openCreateModal}>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Note
                </Button>
              }
            />
          ) : null}
        </div>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingNote ? 'Edit Note' : 'Create New Note'}
        >
          <div className="space-y-4">
            <Input
              label="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Enter note title..."
            />

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Content
              </label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your note here..."
                rows={6}
                className="w-full glass-card px-4 py-3 bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all resize-none"
              />
            </div>

            <Input
              label="Category (optional)"
              value={noteCategory}
              onChange={(e) => setNoteCategory(e.target.value)}
              placeholder="e.g., Work, Personal, Ideas"
            />

            <div className="flex gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1">
                {editingNote ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </DashboardLayout>
  );
}

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}

function NoteCard({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-5 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {note.pinned && <Pin className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
          <h3 className="text-white font-semibold truncate">{note.title}</h3>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onTogglePin}
            className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-yellow-400 transition-colors"
            title={note.pinned ? 'Unpin' : 'Pin'}
          >
            <Pin className="w-4 h-4" />
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-blue-400 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-white/60 text-sm line-clamp-3 mb-4">{note.content}</p>

      <div className="flex items-center justify-between">
        {note.category && (
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Tag className="w-3 h-3" />
            <span>{note.category}</span>
          </div>
        )}
        <span className="text-white/30 text-xs ml-auto">
          {new Date(note.updated_at).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
}
