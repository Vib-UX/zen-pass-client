import { Bell, Calendar, Compass, Search, Sparkles } from 'lucide-react';

import {
    Address,
    Avatar,
    EthBalance,
    Identity,
    Name,
} from '@coinbase/onchainkit/identity';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownDisconnect,
    WalletDropdownFundLink,
    WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { Button } from '../ui/button';
import useGlobalStorage from '../../store';
export default function Navbar() {
    const { name } = useGlobalStorage();
    return (
        <nav className="flex h-14 items-center justify-between px-4 bg-[#0c162c] border-b border-zinc-800">
            {/* Left section */}

            <div className="container mx-auto flex items-center justify-between py-2">
                <div
                    className="flex items-center space-x-2"
                    onClick={() => (window.location.href = '/')}
                >
                    <Sparkles className="h-6 w-6 text-purple-400" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        ZenPass
                    </span>
                </div>

                {/* Center section */}
                <div className="hidden md:block">
                    <div className="flex items-center space-x-8">
                        <Button
                            variant="ghost"
                            className=" text-white bg-zinc-800"
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            Events
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white hover:text-white hover:bg-zinc-800"
                        >
                            <Compass className="mr-2 h-4 w-4" />
                            Discover
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:block text-white hover:text-white  hover:bg-zinc-800"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:block text-white hover:text-white hover:bg-zinc-800"
                        >
                            <Bell className="h-5 w-5" />
                        </Button>
                        <div className="relative z-10">
                            <Wallet>
                                <ConnectWallet>
                                    <Avatar className="h-6 w-6" />
                                    <Name />
                                </ConnectWallet>
                                <WalletDropdown>
                                    <Identity
                                        className="px-4 pt-3 pb-2"
                                        hasCopyAddressOnClick
                                    >
                                        <Avatar />
                                        <Name />
                                        <Address />
                                        <EthBalance />
                                    </Identity>
                                    <WalletDropdownBasename />
                                    <WalletDropdownLink
                                        icon="wallet"
                                        href="https://keys.coinbase.com"
                                    >
                                        Wallet
                                    </WalletDropdownLink>
                                    <WalletDropdownFundLink />
                                    <WalletDropdownDisconnect />
                                </WalletDropdown>
                            </Wallet>
                        </div>
                        <div className="text-white font-semibold">{name}</div>
                        {/* {window.location.pathname !== '/' && (
                        <HoverBorderGradientDemo title={address} />
                    )} */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
