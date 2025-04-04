import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { NavbarDemo } from '../../components/navbar/navbar-menu';
import Details from './Details';
import React from 'react';
import StarWarsButton from '../../components/ui/startwar-btn';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
export type ContractData = {
    name: string;
    symbol: string;
    address: string;
};
type NFTData = {
    items: Array<{
        contract: ContractData;
        tokenId: string;
    }>;
};
const MyEvents = () => {
    const { address } = useAccount();

    const fetchNFTs = async (): Promise<NFTData> => {
        const response = await fetch(
            'https://web3.nodit.io/v1/base/sepolia/nft/getNftsOwnedByAccount',
            {
                method: 'POST',
                headers: {
                    'X-API-KEY': 'iKoqMCqN3rGxn4CIcAeG0NJP2nKjrlLs',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountAddress: address,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    };

    const myEvents = useQuery<NFTData>({
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

            {/* <div className="min-h-screen bg-white text-black p-4 sm:p-8 mt-28 md:mt-36">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-0">
                            My Events
                        </h1>
                    </div>
                    <div className="space-y-6 sm:space-y-8">
                        {myEvents.isSuccess
                            ? myEvents.data?.items.map((elem, index) => (
                                  <React.Fragment key={index}>
                                      <Details {...elem} />
                                  </React.Fragment>
                              ))
                            : 'loading'}
                    </div>
                </div>
            </div> */}
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
