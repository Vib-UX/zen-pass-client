import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { NavbarDemo } from '../../components/navbar/navbar-menu';
import { Button } from '../../components/ui/button';
import Details from './Details';
export type ContractData = {
    name: string;
    symbol: string;
    address: string;
    chain: string;
};

const MyEvents = () => {
    const { address } = useAccount();
    const fetchNFTs = async (): Promise<{ items: any[] }> => {
        if (!address) throw new Error('No address provided');

        const fetchNftsByChain = async (
            chain: 'polygon' | 'base',
            network: 'amoy' | 'sepolia'
        ) => {
            const url = `https://web3.nodit.io/v1/${chain}/${network}/nft/getNftsOwnedByAccount`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-API-KEY': 'iKoqMCqN3rGxn4CIcAeG0NJP2nKjrlLs',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accountAddress: address }),
            });

            if (!response.ok) {
                throw new Error(
                    `Error fetching NFTs from ${chain}/${network}: ${response.status}`
                );
            }

            return response.json(); // Make sure it returns an object with `items` or similar key
        };

        const [polygonData, baseData] = await Promise.all([
            fetchNftsByChain('polygon', 'amoy'),
            fetchNftsByChain('base', 'sepolia'),
        ]);

        // Flatten both item arrays (assumes response has `.items` array)
        const polygonItems = polygonData?.items || [];
        const baseItems = baseData?.items || [];

        return {
            items: [
                ...polygonItems.map((item: any) => ({
                    ...item,
                    chain: 'polygon',
                    network: 'amoy',
                })),
                ...baseItems.map((item: any) => ({
                    ...item,
                    chain: 'base',
                    network: 'sepolia',
                })),
            ],
        };
    };

    const myEvents = useQuery({
        queryKey: ['nfts'],
        queryFn: fetchNFTs,
        enabled: !!address,
    });
    return (
        <div className="relative min-h-screen">
            <NavbarDemo />
            <div className="fixed inset-0 w-full h-full z-0">
                <img
                    className="w-full h-full object-cover opacity-10"
                    src="https://ethglobal.b-cdn.net/events/taipei/images/5ifhr/default.jpg"
                    alt="bg"
                />
            </div>

            <div className="relative z-10 min-h-screen bg-transparent text-black p-4 sm:p-8 mt-3">
                <div className="max-w-4xl mx-auto">
                    <Link to={'/events'}>
                        <Button variant="ghost" className="mb-4 relative z-10">
                            ← Back to Events
                        </Button>
                    </Link>

                    <h1 className="text-3xl font-semibold mb-4">My Events</h1>
                    <div className="space-y-6 sm:space-y-8 mt-5">
                        {myEvents.isSuccess ? (
                            myEvents.data?.items.map((elem, index) => (
                                <React.Fragment key={index}>
                                    <Details {...elem} />
                                </React.Fragment>
                            ))
                        ) : (
                            <>
                                <div
                                    role="status"
                                    className="flex items-center justify-center h-56 max-w-full bg-gray-300 rounded-lg animate-pulse"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div
                                    role="status"
                                    className="flex items-center justify-center h-56 max-w-full bg-gray-300 rounded-lg animate-pulse"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
