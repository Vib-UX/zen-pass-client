import { useEffect, useState } from 'react';
import { ContractData } from '.';
import { Card, CardContent } from '../../components/ui/cards';
import MyModal from '../../components/ui/Modal';
import StarWarsButton from '../../components/ui/startwar-btn';
import { useQuery } from '@tanstack/react-query';

const Details = ({
    contract,
    chain,
    tokenId,
    tokenUri,
}: {
    contract: ContractData;
    chain: string;
    tokenId: string;
    tokenUri: string;
}) => {
    let [isOpen, setIsOpen] = useState(false);

    const fetchIpfsMetadata = async (tokenUri: string) => {
        const url = tokenUri.startsWith('http')
            ? tokenUri
            : `https://${tokenUri}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.status}`);
        }
        return response.json();
    };
    const fetchNFTs = async () => {
        const res = await fetchIpfsMetadata(tokenUri);
        return res;
    };

    const eventDetails = useQuery({
        queryKey: ['nftInfo'],
        queryFn: fetchNFTs,
    });
    return (
        <>
            {eventDetails.isSuccess ? (
                <>
                    <MyModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        contract={contract}
                        tokenId={tokenId}
                        chain={chain}
                    />
                    <Card className="flex-1 border-zinc-800">
                        <CardContent className="p-2 sm:p-6">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-x-2">
                                        <img
                                            src={eventDetails.data.image}
                                            alt="nft"
                                            className="size-20"
                                        />
                                        <h3 className="text-2xl sm:text-xl font-medium mb-3 sm:mb-4 text-black">
                                            {eventDetails.data.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-black text-sm">
                                            {eventDetails.data.description}
                                        </span>
                                    </div>
                                    {eventDetails.data.attributes.length >
                                        0 && (
                                        <div className="flex flex-col gap-2 mb-2">
                                            {eventDetails.data.attributes.map(
                                                (elem: any) => (
                                                    <span className="text-black text-sm">
                                                        {elem.trait_type} :{' '}
                                                        {elem.value}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                <StarWarsButton
                                    title={
                                        'View transaction history of the NFT'
                                    }
                                    onClick={() => setIsOpen(true)}
                                    className="w-full"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </>
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
        </>
    );
};

export default Details;
