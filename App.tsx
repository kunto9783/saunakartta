
import React, { useState, useEffect, useCallback } from 'react';
import { Sauna } from './types';
import Header from './components/Header';
import SaunaMap from './components/SaunaMap';
import SaunaDetails from './components/SaunaDetails';
import AddSaunaForm from './components/AddSaunaForm';
import { fetchInitialSaunas } from './services/geminiService';

const App: React.FC = () => {
    const [saunas, setSaunas] = useState<Sauna[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [selectedSauna, setSelectedSauna] = useState<Sauna | null>(null);
    const [addingLocation, setAddingLocation] = useState<{ lat: number; lon: number } | null>(null);
    
    const loadSaunas = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const initialSaunas = await fetchInitialSaunas();
            setSaunas(initialSaunas);
        } catch (e) {
            setError('Failed to load saunas. Please try again later.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        loadSaunas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoginToggle = () => {
        setIsLoggedIn(prev => !prev);
    };

    const handleSelectSauna = (sauna: Sauna) => {
        setSelectedSauna(sauna);
    };

    const handleCloseDetails = () => {
        setSelectedSauna(null);
    };

    const handleMapClick = (coords: { lat: number; lon: number }) => {
        if (isLoggedIn) {
            setAddingLocation(coords);
        }
    };

    const handleCancelAdd = () => {
        setAddingLocation(null);
    };

    const handleAddSauna = (newSaunaData: Omit<Sauna, 'id'>) => {
        const newSauna: Sauna = {
            ...newSaunaData,
            id: `${newSaunaData.latitude}-${newSaunaData.longitude}-${Date.now()}`
        };
        setSaunas(prevSaunas => [...prevSaunas, newSauna]);
        setAddingLocation(null);
    };

    return (
        <div className="h-screen w-screen bg-gray-900 text-white flex flex-col font-sans overflow-hidden">
            <Header isLoggedIn={isLoggedIn} onLoginToggle={handleLoginToggle} />
            <main className="flex-grow pt-[72px] relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 z-20 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
                        <p className="mt-4 text-xl">Loading Saunas...</p>
                    </div>
                )}
                {error && (
                     <div className="absolute inset-0 bg-red-900/80 z-20 flex flex-col items-center justify-center text-center p-4">
                        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
                        <p className="mb-4">{error}</p>
                        <button onClick={loadSaunas} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
                            Try Again
                        </button>
                    </div>
                )}
                <SaunaMap 
                    saunas={saunas} 
                    onSaunaClick={handleSelectSauna}
                    onMapClick={handleMapClick}
                    isLoggedIn={isLoggedIn}
                />
            </main>
            {selectedSauna && <SaunaDetails sauna={selectedSauna} onClose={handleCloseDetails} />}
            {addingLocation && <AddSaunaForm location={addingLocation} onAdd={handleAddSauna} onCancel={handleCancelAdd} />}
        </div>
    );
};

export default App;
