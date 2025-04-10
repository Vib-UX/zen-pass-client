import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import {
    Transaction,
    TransactionButton,
    TransactionSponsor,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import toast from 'react-hot-toast';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import { ABI } from '../../abi';
import { calculateDistance, getUserLocation } from '../../lib/helper';
import Ar from '../Ar/index';
const steps = [
    { label: 'Email verification' },
    {
        label: 'You need to be within 1000m of the event location to be able to verify',
    },
    {
        label: 'NFT collected successfully from booth',
    },
    {
        label: 'All set!',
    },
];

export default function VerticalLinearStepper({
    event,
    isUserInRange,
    activeStep,
    setActiveStep,
    setIsUserInRange,
    em,
}: {
    event: any;
    isUserInRange: boolean;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    setIsUserInRange: React.Dispatch<React.SetStateAction<boolean>>;
    em: boolean;
}) {
    const [image, setImage] = React.useState<string | null>(null);
    const [ips, setIps] = React.useState<any>('');
    const [hash, setHash] = React.useState<any>('');
    const [location, setLocation] = React.useState<any>({
        latitude: 0,
        longitude: 0,
    });
    const [userImage, setUserImage] = React.useState<string | null>(null);
    const { address } = useAccount();
    const [showAR, setShowAR] = React.useState(false);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const validateUserCoordinates = async () => {
        toast.dismiss();
        toast.loading('Verifying user location...');
        const location = await getUserLocation();
        if (location) {
            const distance = calculateDistance({
                lat1: 25.044492716107946, //event
                lon1: 121.55989836222534, //event
                lat2: location.latitude,
                lon2: location.longitude,
            });
            setLocation({
                latitute: location.latitude,
                longitude: location.longitude,
            });
            if (distance <= 1000) {
                toast.dismiss();
                toast.success('You are in range of the event location');
                setIsUserInRange(true);
                handleNext();
            } else {
                toast.dismiss();
                toast.error('You are not in range of the event location');
                setIsUserInRange(false);
            }
        }
    };
    const handleARInvokation = async () => {
        setShowAR(true);
        const caller = await fetch(
            'https://nftpinataservice-production.up.railway.app/create-nft',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: Math.floor(Math.random() * 90 + 10).toString(),
                    name: 'Eth Taipei 2025 POAP',
                    description:
                        'This is a POAP for Eth Taipei 2025 sponsered by Base Sepolia',
                    image_uri:
                        'https://res.cloudinary.com/dt1dn773q/image/upload/v1743853830/ncfhrexcmfvdps1yq1dp.png',
                    attributes: [
                        { trait_type: 'Event', value: 'Eth Taipei 2025' },
                        { trait_type: 'Sponser', value: 'Polygon & NodeIt' },
                        {
                            trait_type: 'Location',
                            value: location.latitude + ',' + location.longitude,
                        },
                        { trait_type: 'Category', value: 'POAP' },
                    ],
                }),
            }
        );
        const res = await caller.json();
        if (res.success) {
            const data = res.metadataIPFSUrl.split('https://')[1];
            setIps(data);
        }
    };

    React.useEffect(() => {
        if (activeStep === 1) {
            validateUserCoordinates();
        }
        if (activeStep === 2) {
            handleARInvokation();
        }
    }, [isUserInRange, activeStep]);

    const calls = [
        {
            address: `0x48f6bf86809e0aC9E57F6c63FBB4fC31fdb903d3`,
            abi: ABI,
            functionName: 'crossChainMint',
            args: [address, ips, '16281711391670634445', 1],
        },
    ];
    const handleOnStatus = React.useCallback((status: LifecycleStatus) => {
        if (status?.statusName === 'success') {
            setHash(
                status?.statusData?.transactionReceipts[0]?.transactionHash
            );
        }
    }, []);

    return (
        <>
            <Box sx={{ maxWidth: 400 }}>
                {showAR ? (
                    <Ar
                        location={location}
                        setIsArOpen={setShowAR}
                        setImage={setImage}
                        setUserImage={setUserImage}
                    />
                ) : image ? (
                    <div className="relative">
                        <img src={image} alt="Captured Screenshot" />
                        <img
                            src={
                                'https://res.cloudinary.com/dt1dn773q/image/upload/v1743853830/ncfhrexcmfvdps1yq1dp.png'
                            }
                            alt="Overlay"
                            className="absolute top-0 right-1"
                            height={200}
                            width={200}
                        />
                    </div>
                ) : null}

                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step
                            key={step.label}
                            completed={
                                (isUserInRange && index === 1) ||
                                (em && index === 0)
                            }
                        >
                            <StepLabel>
                                <div className="text-black">{step.label}</div>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 2 && (
                    <>
                        <Transaction
                            chainId={baseSepolia.id}
                            calls={calls}
                            isSponsored
                            onStatus={handleOnStatus}
                        >
                            <TransactionButton />
                            <TransactionSponsor />
                            <TransactionStatus>
                                <TransactionStatusLabel />
                                <TransactionStatusAction />
                            </TransactionStatus>
                        </Transaction>
                        {hash && (
                            <div className="font-semibold text-lg">
                                Transaction success 🎉{' '}
                                <a
                                    href={`https://ccip.chain.link/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    (View on Chain)
                                </a>
                                {userImage && (
                                    <img
                                        src={userImage}
                                        alt="userImage"
                                        className="py-3"
                                    />
                                )}
                                <div className="w-fit  rounded-full border-2 border-[#cbf101 bg-green-100 px-3 text-sm py-1 my-2">
                                    <TwitterShareButton
                                        title="Catch the next wave at @polygon / @nodit booths! 🌊 I just snagged my POAP at Eth Taipei 2025 🚀 Let’s make history!"
                                        hashtags={[
                                            'EthTaipei2025',
                                            'POAP',
                                            'NextWave',
                                        ]}
                                        related={[
                                            '@ETHGlobal',
                                            '@NoditPlatform',
                                            '@0xPolygon',
                                        ]}
                                        url={
                                            userImage ||
                                            'https://zen-pass.vercel.app'
                                        }
                                        className="flex items-center gap-x-2"
                                    >
                                        Share on Twitter{' '}
                                        <TwitterIcon
                                            size={20}
                                            className="rounded-full"
                                        />
                                    </TwitterShareButton>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </Paper>
                )}
            </Box>
        </>
    );
}
