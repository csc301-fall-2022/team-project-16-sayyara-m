import { createContext } from 'react';

interface TokenContextType {
    accessToken: string | null,
    setAccessToken: (accessToken: string) => void
}

export const AccessTokenContext = createContext<TokenContextType>({accessToken: null, setAccessToken: () => {}});