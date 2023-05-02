import { createContext } from 'react';


interface ContextProps {
    isMenuOpen: boolean;

    // Methods
    //le digo que es una funcion
    toggleSideMenu: () => void;
}


export const UiContext = createContext({} as ContextProps);