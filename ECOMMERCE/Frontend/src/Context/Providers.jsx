import { LoginModalProvider } from './LoginPopContext';
import { ContextAltaBajaProvider } from './AltaModProductContext';

import { ContextProductProvider } from './productDetailContext';
import { AuthProvider } from './authContext';
import { SearchProvider } from './searchContext';


export const AppContextProviders = ({ children }) => (
  <AuthProvider>
    <LoginModalProvider>
      <SearchProvider>
        <ContextProductProvider>
          <ContextAltaBajaProvider>
            {children}
          </ContextAltaBajaProvider>
        </ContextProductProvider>
      </SearchProvider>
    </LoginModalProvider>
  </AuthProvider>
);

