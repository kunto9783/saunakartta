
import React from 'react';
import { SaunaIcon } from './Icons';

interface HeaderProps {
    isLoggedIn: boolean;
    onLoginToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginToggle }) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-sm text-white p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
                <SaunaIcon className="w-8 h-8 text-orange-300" />
                <h1 className="text-2xl font-bold tracking-wider font-serif">Saunakartta</h1>
            </div>
            <button
                onClick={onLoginToggle}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-md"
            >
                {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
        </header>
    );
};

export default Header;
