import { LoginModalProvider } from './LoginPopContext';
import { ContextvalidarAndComprar } from './validarComprar';
import { ContextCarritoProvider } from './addCarritoContext';
import { ContextProductProvider } from './productDetailContext';
import { AuthProvider } from './authContext';
import { SearchProvider } from './searchContext';
import { ContextCompraProvider } from './compraDetailContext';



export const AppContextProviders = ({ children }) => (
  <AuthProvider>
    <LoginModalProvider>
      <SearchProvider>
        <ContextProductProvider>
          <ContextCarritoProvider>
            <ContextvalidarAndComprar>
              <ContextCompraProvider>
              {children}
              </ContextCompraProvider>
            </ContextvalidarAndComprar>
          </ContextCarritoProvider>
        </ContextProductProvider>
      </SearchProvider>
    </LoginModalProvider>
  </AuthProvider>
);

