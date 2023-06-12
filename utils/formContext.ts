import { createContext } from 'react';

type RegisterContextType = {
    register: any; // Replace with the actual type of the register function
};

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export default RegisterContext;
