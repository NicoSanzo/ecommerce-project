import { LoginModalProvider } from './LoginPopContext';

import { ContexModProvider } from './ModProductContext';
import { ContextProductProvider } from './productDetailContext';
import { AuthProvider } from './authContext';
import { SearchProvider } from './searchContext';


export const AppContextProviders = ({ children }) => (
  <AuthProvider>
    <LoginModalProvider>
      <SearchProvider>
        <ContextProductProvider>
          <ContexModProvider>
            {children}
            </ContexModProvider>
        </ContextProductProvider>
      </SearchProvider>
    </LoginModalProvider>
  </AuthProvider>
);

