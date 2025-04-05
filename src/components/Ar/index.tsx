import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import WhirlpoolLoader from '../ui/WhirlpoolLoader';
import { blobToFile } from '../../lib/helper';

const WebcamBackground = () => {
    return (
        <video
            autoPlay
            playsInline
            muted
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
            }}
            ref={(video) => {
                if (video) {
                    navigator.mediaDevices
                        .getUserMedia({ video: true })
                        .then((stream) => {
                            video.srcObject = stream;
                        })
                        .catch((err) => console.error('Camera Error:', err));
                }
            }}
        />
    );
};

// 3D Model Component
const NFTModel = () => {
    const modelRef: any = useRef();
    const { scene } = useGLTF('/nft.glb');
    const [speed, setSpeed] = useState(0.01);

    const scale = window.innerWidth < 768 ? [1.5, 1.5, 1.5] : [1.5, 1.5, 1.5];
    const position = window.innerWidth < 768 ? [1, 2, 0] : [3, 2, 0];

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += speed;
        }
    });

    const handleClick = () => {
        setSpeed(0.2); // Increase speed
        setTimeout(() => setSpeed(0.01), 1000); // Reset after 1s
    };

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={scale}
            position={position}
            onClick={handleClick}
        />
    );
};

const ArComponent = ({
    location,
    setImage,
    setIsArOpen,
    setUserImage,
}: {
    location: any;
    setImage: (image: string | null) => void;
    setIsArOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUserImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const [isNftEnabled, setIsNftEnabled] = useState(false);
    const [isNftLoading, setIsNftLoading] = useState(false);

    const captureScreenshot = () => {
        const element = document.getElementById('capture-area');
        if (element) {
            html2canvas(element)
                .then((canvas) => {
                    canvas.toBlob(async (blob) => {
                        if (blob) {
                            const imageUrl = URL.createObjectURL(blob);
                            setImage(imageUrl);
                            setIsArOpen(false);
                            toast.dismiss('Physical footprints pushed onchain');
                            // const d = new Blob([blob], {
                            //     type: 'image/png',
                            // });
                            // const file = blobToFile(d, 'image.png');
                            // const formData = new FormData();
                            // formData.append('file', file);
                            // const res = await fetch(
                            //     'https://aiprocessor-production.up.railway.app/analyze-image-pixel-art',
                            //     {
                            //         method: 'POST',
                            //         body: formData,
                            //     }
                            // );
                            // const data = await res.json();
                            // setUserImage(data.result);
                        }
                    });
                })
                .catch((err) =>
                    console.error('Error capturing screenshot:', err)
                );
        }
    };

    const generateImageFromApi = () => {
        const element = document.getElementById('capture-area');
        if (element) {
            html2canvas(element)
                .then((canvas) => {
                    canvas.toBlob(async (blob) => {
                        if (blob) {
                            const formData = new FormData();
                            formData.append('image', blob, 'screenshot.png');
                            formData.append(
                                'location_coordinates',
                                JSON.stringify([
                                    location.latitude,
                                    location.longitude,
                                ])
                            );

                            try {
                                setIsNftLoading(true);
                                setTimeout(() => {
                                    setIsNftLoading(false);
                                    setIsNftEnabled(true);
                                }, 6000);
                            } catch (error) {
                                console.error('Error uploading image:', error);
                            }
                        }
                    }, 'image/png');
                })
                .catch((err) =>
                    console.error('Error capturing screenshot:', err)
                );
        }
    };

    useEffect(() => {
        const timeout = setTimeout(generateImageFromApi, 4000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            style={{
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
            id="capture-area"
            className="relative"
        >
            <WebcamBackground />

            <Canvas>
                <ambientLight intensity={3} />
                <directionalLight position={[0, 5, 5]} intensity={3} />
                {isNftEnabled && <NFTModel />}
                <OrbitControls />
            </Canvas>

            {isNftLoading ? (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '30%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <WhirlpoolLoader />
                </div>
            ) : (
                <button
                    onClick={captureScreenshot}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white size-10 rounded-full"
                >
                    📸
                </button>
            )}
        </div>
    );
};

const Ar = ({
    location,
    setIsArOpen,
    setImage,
    setUserImage,
}: {
    location: any;
    setIsArOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setImage: (image: string | null) => void;
    setUserImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    return (
        <div className="z-10 relative">
            <ArComponent
                location={location}
                setImage={setImage}
                setIsArOpen={setIsArOpen}
                setUserImage={setUserImage}
            />
        </div>
    );
};

export default Ar;
