
import React, { useState } from 'react';
import { Sauna, SaunaType } from '../types';
import { CloseIcon } from './Icons';

interface AddSaunaFormProps {
  location: { lat: number; lon: number };
  onAdd: (sauna: Omit<Sauna, 'id'>) => void;
  onCancel: () => void;
}

const AddSaunaForm: React.FC<AddSaunaFormProps> = ({ location, onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<SaunaType>('wood');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      name,
      description,
      type,
      latitude: location.lat,
      longitude: location.lon,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4 animate-fade-in" onClick={onCancel}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative text-gray-800 p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 font-serif">Add a New Sauna</h2>
        <p className="text-sm text-gray-500 mb-6">Adding at Latitude: {location.lat.toFixed(4)}, Longitude: {location.lon.toFixed(4)}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Sauna Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" rows={3}></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Sauna Type</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value as SaunaType)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="wood">Wood Fired</option>
              <option value="electric">Electric</option>
              <option value="smoke">Smoke</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors">Cancel</button>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors">Add Sauna</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSaunaForm;
