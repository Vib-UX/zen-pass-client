import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { ContractData } from '../../pages/MyEvents';

type Props = {
    items: {
        from: string;
        to: string;
        value: string;
        timestamp: string;
    }[];
};

type MyModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    contract: ContractData;
    tokenId: string;
    chain: string;
};

export default function MyModal({
    isOpen,
    setIsOpen,
    contract,
    tokenId,
    chain,
}: MyModalProps) {
    const { address } = useAccount();

    const fetchNFTHistory = async ({
        chain,
        network,
        contractAddress,
        tokenId,
    }: {
        chain: 'polygon' | 'base';
        network: 'amoy' | 'sepolia';
        contractAddress: string;
        tokenId: string | number;
    }): Promise<Props> => {
        const url = `https://web3.nodit.io/v1/${chain}/${network}/nft/getNftTransfersByTokenId`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-API-KEY': 'iKoqMCqN3rGxn4CIcAeG0NJP2nKjrlLs',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contractAddress, tokenId }),
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return response.json();
    };

    const { data, isLoading, isError } = useQuery<Props>({
        queryKey: ['nftHistory'],
        queryFn: () =>
            fetchNFTHistory({
                chain: chain === 'polygon' ? 'polygon' : 'base',
                network: chain === 'polygon' ? 'amoy' : 'sepolia',
                contractAddress: contract.address,
                tokenId,
            }),
        enabled: !!address && isOpen,
    });

    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => setIsOpen(false)}
        >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="mt-24 w-full max-w-xl rounded-2xl bg-white/90 p-6 shadow-xl ring-1 ring-black/10 backdrop-blur-xl overflow-y-auto max-h-[90vh]">
                        <DialogTitle className="text-xl font-semibold text-black mb-4">
                            NFT Transfer History
                        </DialogTitle>

                        {isLoading && (
                            <p className="text-sm text-gray-500 text-center">
                                Loading transfer history...
                            </p>
                        )}

                        {isError && (
                            <p className="text-sm text-red-500 text-center">
                                Failed to fetch transfer history.
                            </p>
                        )}

                        {data?.items.length === 0 && (
                            <p className="text-sm text-gray-500 text-center">
                                No transfer history found.
                            </p>
                        )}

                        {data?.items.map((transfer, index) => {
                            const date = new Date(
                                parseInt(transfer.timestamp) * 1000
                            );
                            return (
                                <div
                                    key={index}
                                    className="mb-4 rounded-lg border border-gray-200 bg-white p-4"
                                >
                                    <DialogTitle
                                        as="h4"
                                        className="text-base font-medium text-black"
                                    >
                                        From:
                                        <span className="ml-1 font-mono text-blue-600">
                                            {transfer.from}
                                        </span>
                                    </DialogTitle>

                                    <p className="text-sm text-black">
                                        To:
                                        <span className="ml-1 font-mono text-green-600">
                                            {transfer.to}
                                        </span>
                                    </p>

                                    <p className="text-sm text-gray-700">
                                        Value:
                                        <span className="ml-1 font-semibold">
                                            {transfer.value}
                                        </span>
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Date:
                                        <span className="ml-1">
                                            {date.toUTCString()}
                                        </span>
                                    </p>
                                </div>
                            );
                        })}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
