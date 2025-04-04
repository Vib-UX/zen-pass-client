import { useState } from 'react';
import { ContractData } from '.';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/cards';
import MyModal from '../../components/ui/Modal';

const Details = ({
    contract,

    tokenId,
}: {
    contract: ContractData;

    tokenId: string;
}) => {
    let [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <MyModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                contract={contract}
                tokenId={tokenId}
            />
            <Card className="flex-1 border-zinc-800">
                <CardContent className="p-2 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl sm:text-xl font-medium mb-3 sm:mb-4 text-black">
                                {contract.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-black text-sm">
                                    {contract.symbol}
                                </span>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            View transaction history of the NFT
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Details;
