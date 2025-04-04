import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useAccount } from 'wagmi';
import { ContractData } from '../../pages/MyEvents';
import { useQuery } from '@tanstack/react-query';
type Props = {
    items: {
        from: string;
        to: string;
        value: string;
        timestamp: string;
    }[];
};
export default function MyModal({
    isOpen,
    setIsOpen,
    contract,
    tokenId,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    contract: ContractData;
    tokenId: string;
}) {
    function close() {
        setIsOpen(false);
    }
    const { address } = useAccount();
    const fetchNFTHistory = async (): Promise<Props> => {
        const response = await fetch(
            'https://web3.nodit.io/v1/base/sepolia/nft/getNftTransfersByTokenId',
            {
                method: 'POST',
                headers: {
                    'X-API-KEY': process.env.NODIT_API_KEY as string,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contractAddress: contract.address,
                    tokenId: tokenId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    };

    const nftHistory = useQuery<Props>({
        queryKey: ['nftHistory'],
        queryFn: fetchNFTHistory,
        enabled: !!address && isOpen,
    });
    return (
        <>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="mt-32 w-full max-w-xl h-[500px] overflow-y-auto rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            {nftHistory.isSuccess
                                ? nftHistory.data.items.map((elem, index) => {
                                      const date = new Date(
                                          parseInt(elem.timestamp) * 1000
                                      );

                                      return (
                                          <div key={index}>
                                              <DialogTitle
                                                  as="h3"
                                                  className="text-base/7 font-medium text-black"
                                              >
                                                  From {elem.from} to {elem.to}
                                              </DialogTitle>
                                              <p className="mt-2 text-sm/6 text-black/50">
                                                  Value : {elem.value}
                                              </p>
                                              <p className="mt-2 text-sm/6 text-black/50">
                                                  Date : {date.toUTCString()}
                                              </p>{' '}
                                          </div>
                                      );
                                  })
                                : 'loading'}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
