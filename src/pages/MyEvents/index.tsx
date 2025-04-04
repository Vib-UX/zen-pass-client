import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { NavbarDemo } from '../../components/navbar/navbar-menu';
import Details from './Details';
import React from 'react';
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
                    'X-API-KEY': process.env.NODIT_API_KEY as string,
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
        <div className="relative">
            <img
                src="https://ethglobal.b-cdn.net/events/taipei/images/5ifhr/default.jpg"
                alt="g"
                className="h-full absolute top-0 opacity-10"
            />

            <div className="min-h-screen bg-white text-black p-4 sm:p-8 mt-28 md:mt-36">
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
            </div>
        </div>
    );
};

export default MyEvents;
