import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import WhirlpoolLoader from '../ui/WhirlpoolLoader';

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
                height: '90%',
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
    const { scene } = useGLTF('/nft.glb'); // Load the 3D model

    // Adjust position dynamically based on screen size
    const scale = window.innerWidth < 768 ? [3, 3, 3] : [1, 1, 1]; // Scale for mobile vs desktop

    // Rotate the model for some animation
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01; // Adjust rotation speed
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={scale}
            position={[3, 1, 0]} // Position at top right
        />
    );
};

const ArComponent = ({
    location,
    setImage,
    setIsArOpen,
}: {
    location: any;
    setImage: (image: string | null) => void;
    setIsArOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
                                    location.latitude.toString(),
                                    location.longitude.toString(),
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
                    }, 'image/png'); // Specify PNG format
                })
                .catch((err) =>
                    console.error('Error capturing screenshot:', err)
                );
        }
    };

    useEffect(() => {
        const timeout = setTimeout(generateImageFromApi, 4000); // Delay to ensure everything is rendered
        return () => clearTimeout(timeout); // Cleanup on component unmount
    }, []);

    return (
        <div
            style={{
                overflow: 'hidden',
                position: 'relative',
            }}
            id="capture-area"
            className="relative"
        >
            {/* Webcam background */}
            <WebcamBackground />

            {/* 3D Model Canvas */}

            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 5, 5]} intensity={1} />
                {isNftEnabled && <NFTModel />}
                <OrbitControls />
            </Canvas>

            {isNftLoading ? (
                <div
                    style={{ position: 'absolute', bottom: '30%', left: '20%' }}
                >
                    <WhirlpoolLoader />
                </div>
            ) : (
                <button
                    onClick={captureScreenshot}
                    className="absolute left-40 bottom-0 bg-white size-10 rounded-full"
                />
            )}
        </div>
    );
};

const Ar = ({
    location,
    setIsArOpen,
    setImage,
}: {
    location: any;
    setIsArOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setImage: (image: string | null) => void;
}) => {
    return (
        <div className="z-10 relative">
            <ArComponent
                location={location}
                setImage={setImage}
                setIsArOpen={setIsArOpen}
            />
        </div>
    );
};

export default Ar;
