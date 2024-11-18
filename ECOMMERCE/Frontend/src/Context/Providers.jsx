import { LoginModalProvider } from './LoginPopContext';

import { ContextCarritoProvider } from './addCarritoContext';
import { ContextProductProvider } from './productDetailContext';
import { AuthProvider } from './authContext';
import { SearchProvider } from './searchContext';


export const AppContextProviders = ({ children }) => (
  <AuthProvider>
    <LoginModalProvider>
      <SearchProvider>
        <ContextProductProvider>
          <ContextCarritoProvider>
            {children}
            </ContextCarritoProvider>
        </ContextProductProvider>
      </SearchProvider>
    </LoginModalProvider>
  </AuthProvider>
);

