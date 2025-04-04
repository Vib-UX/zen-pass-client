import { OnchainKitProvider } from '@coinbase/onchainkit';
import '@coinbase/onchainkit/styles.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'onchainkit',
        }),
    ],
    ssr: true,
    transports: {
        [baseSepolia.id]: http(),
    },
});
const queryClient = new QueryClient();
const Provider = ({ children }: { children: any }) => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                    },
                }}
            />
            <GoogleOAuthProvider
                clientId={
                    '463039578314-qv4tu52n5hh6g2qnpkqojebkt9uks5a1.apps.googleusercontent.com'
                }
            >
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        <OnchainKitProvider
                            apiKey={'oryHb9oVzGeBxtxLOdpHrXsPcOjCiJlU'}
                            chain={baseSepolia}
                        >
                            {children}
                        </OnchainKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
};

export default Provider;
