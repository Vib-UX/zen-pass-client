import type React from 'react';

import { useState } from 'react';
import { MapPin, User, Zap, Camera, ArrowRight } from 'lucide-react';

interface FeatureProps {
    icon: React.ReactNode;
    number: string;
    title: string;
    description: React.ReactNode;
}

const Feature = ({ icon, number, title, description }: FeatureProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 flex gap-2">
                <span>{number}</span>
                {title}
            </h3>
            <div className="space-y-4 text-gray-700">{description}</div>
        </div>
    );
};

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-start gap-2">
        <div className="min-w-2 min-h-2 w-2 h-2 rounded-full bg-gray-400 mt-2.5"></div>
        <p>{children}</p>
    </div>
);

export default function KeyFeatures() {
    const [activeTab, setActiveTab] = useState<string>('features');

    const features = [
        {
            icon: <User className="w-8 h-8 text-gray-700" />,
            number: '1.',
            title: 'Seamless User Onboarding',
            description: (
                <>
                    <BulletPoint>
                        <strong>Effortless Sign-Up:</strong> Register quickly
                        using your favorite social media platforms.
                    </BulletPoint>
                    <BulletPoint>
                        <strong>Automatic On-Chain Wallet Creation:</strong> Get
                        an on-chain wallet set up instantly to store your unique
                        rewards—NFTs, tokens, and more.
                    </BulletPoint>
                </>
            ),
        },
        {
            icon: <MapPin className="w-8 h-8 text-gray-700" />,
            number: '2.',
            title: 'Geo-Located AR Experiences',
            description: (
                <>
                    <BulletPoint>
                        <strong>Smart GPS Navigation:</strong> Use geo-fencing
                        to guide you to designated event zones, ensuring you
                        never miss a key interaction.
                    </BulletPoint>
                    <BulletPoint>
                        <strong>Immersive AR Triggers:</strong> Activate your
                        camera to scan banners, logos, and other visual cues,
                        unlocking augmented reality experiences that bring
                        events to life.
                    </BulletPoint>
                </>
            ),
        },
        {
            icon: <Zap className="w-8 h-8 text-gray-700" />,
            number: '3.',
            title: 'Real-Time Engagement',
            description: (
                <>
                    <BulletPoint>
                        <strong>Live Interaction:</strong> Participate in
                        real-time polls, Q&A sessions, and interactive
                        challenges during events.
                    </BulletPoint>
                    <BulletPoint>
                        <strong>Community Connection:</strong> Network with
                        other attendees through our integrated messaging
                        platform.
                    </BulletPoint>
                </>
            ),
        },
        {
            icon: <Camera className="w-8 h-8 text-gray-700" />,
            number: '4.',
            title: 'Digital Collectibles',
            description: (
                <>
                    <BulletPoint>
                        <strong>Event Memorabilia:</strong> Collect digital
                        souvenirs from each event you attend, building your
                        personal event portfolio.
                    </BulletPoint>
                    <BulletPoint>
                        <strong>Exclusive Access:</strong> Unlock special
                        content and areas based on your digital collection and
                        participation history.
                    </BulletPoint>
                </>
            ),
        },
    ];

    const events = [
        {
            title: 'ETHGlobal Taipei Happy Hour',
            date: 'April 3, 2025',
            logo: '/placeholder.svg?height=80&width=80',
            link: '#',
        },
        {
            title: 'Taipei Pack',
            date: 'April 5, 2025',
            logo: '/placeholder.svg?height=80&width=80',
            link: '#',
            background:
                'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-03%20at%201.41.31%E2%80%AFPM-KXPgUEvxxRLwOvD2F7y1k0K1cEWXxU.png',
        },
    ];

    return (
        <div className="w-full bg-gray-50 py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block bg-gray-200 text-gray-800 px-6 py-2 rounded-full mb-4">
                        What We Offer
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                        Key Features
                    </h2>

                    {/* Tab Selector */}
                    <div className="flex justify-center gap-4 mb-12">
                        <button
                            onClick={() => setActiveTab('features')}
                            className={`px-6 py-3 rounded-full transition-all ${
                                activeTab === 'features'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                        >
                            Features
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-6 py-3 rounded-full transition-all ${
                                activeTab === 'events'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                        >
                            Upcoming Events
                        </button>
                    </div>
                </div>

                {activeTab === 'features' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <Feature
                                key={index}
                                icon={feature.icon}
                                number={feature.number}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                                Check out our city guide{' '}
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                                Check out our side events{' '}
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl overflow-hidden border border-gray-200 ${
                                        event.background ? 'p-0' : 'p-6'
                                    }`}
                                >
                                    {event.background ? (
                                        <div className="relative h-80">
                                            <img
                                                src={
                                                    event.background ||
                                                    '/placeholder.svg'
                                                }
                                                alt={event.title}
                                                className="object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                                                <h3 className="text-xl font-bold text-white">
                                                    {event.title}
                                                </h3>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-white/80">
                                                        {event.date}
                                                    </span>
                                                    <button className="text-white">
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex justify-center mb-4">
                                                <img
                                                    src={
                                                        event.logo ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={event.title}
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold text-center mb-2">
                                                {event.title}
                                            </h3>
                                            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 text-center text-sm mb-6 w-fit mx-auto">
                                                {event.date}
                                            </div>
                                            <div className="block bg-black text-white text-center py-3 rounded-xl hover:bg-gray-800 transition-colors">
                                                Signup to attend
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition-colors">
                                Access more events
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
