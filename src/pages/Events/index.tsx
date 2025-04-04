'use client';

import { MapPin, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import Leaderboard from '../../components/Leaderboard';

import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/cards';
import StarWarsButton from '../../components/ui/startwar-btn';
import { NavbarDemo } from '../../components/navbar/navbar-menu';
interface Host {
    name: string;
    avatar: string;
}

interface Event {
    slug: string;
    date: string;
    dayOfWeek: string;
    time: string;
    title: string;
    isLive?: boolean;
    hosts: Host[];
    location?: string;
    platform?: string;
    status?: string;
    thumbnail: string;
    description: string;
}

export const events: Event[] = [
    {
        slug: 'eth-taipei-2025',
        date: 'APR 4',
        dayOfWeek: 'Sunday',
        time: '20:00 PM',
        title: 'Eth Taipei',
        isLive: true,
        hosts: [{ name: 'ETH Global', avatar: '/placeholder.svg' }],
        platform: 'Offline',
        description:
            'ETHTAIPEI is a world renowned gathering place where developers, creators, and visionaries come together to address critical challenges and bring groundbreaking ideas to life in the fields of blockchain and distributed computing',
        thumbnail:
            'https://ethglobal.b-cdn.net/events/taipei/images/etxbp/default.jpg',
    },
    {
        slug: 'eth-taipei-2025',
        date: 'APR 4',
        dayOfWeek: 'Sunday',
        time: '20:00 PM',
        title: 'Eth Taipei',
        isLive: true,
        hosts: [{ name: 'ETH Global', avatar: '/placeholder.svg' }],
        platform: 'Offline',
        description:
            'ETHTAIPEI is a world renowned gathering place where developers, creators, and visionaries come together to address critical challenges and bring groundbreaking ideas to life in the fields of blockchain and distributed computing',
        thumbnail:
            'https://ethglobal.b-cdn.net/events/taipei/images/etxbp/default.jpg',
    },
];

export default function EventsListing() {
    const navigate = useNavigate();
    const handleCheckoutEvent = (eventId: string) => {
        navigate(`/events/${eventId}`);
    };
    const [activeStep, setActiveStep] = useState(0);
    return (
        <div className="relative min-h-screen">
            <NavbarDemo />

            {/* Fixed background image that covers the entire page */}
            <div className="fixed inset-0 w-full h-full z-0">
                <img
                    className="w-full h-full object-cover opacity-10"
                    src="https://ethglobal.b-cdn.net/events/taipei/images/5ifhr/default.jpg"
                    alt="bg"
                />
            </div>

            <div className="relative z-10 min-h-screen bg-transparent text-black p-4 sm:p-8 mt-3">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-0">
                            {activeStep === 0 ? 'Events' : 'Leaderboard'}
                        </h1>
                        <div className="bg-[#0c162c] rounded-lg p-1 w-fit ml-auto sm:w-auto">
                            <Button
                                onClick={() => setActiveStep(0)}
                                variant="ghost"
                                className="text-white w-1/2 sm:w-auto cursor-pointer relative z-10"
                            >
                                Events
                            </Button>
                            <Button
                                onClick={() => setActiveStep(1)}
                                variant="ghost"
                                className="text-white w-1/2 sm:w-auto cursor-pointer relative z-10"
                            >
                                Leaderboard
                            </Button>
                        </div>
                    </div>

                    {/* Events container with timeline */}
                    <div className="space-y-6 sm:space-y-8">
                        {activeStep === 0 ? (
                            <div className="relative">
                                {/* Timeline line - positioned to align with dots */}
                                <div className="absolute left-3 sm:left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#9640ff] via-[#9640ff]/50 to-transparent h-full"></div>

                                {/* Events list */}
                                <div className="space-y-6 sm:space-y-8">
                                    {events.map((event, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col sm:flex-row gap-4 sm:gap-8 pl-8 sm:pl-10 relative"
                                        >
                                            {/* Timeline dot - positioned to align with the line */}
                                            <div className="absolute left-0 top-3 sm:top-3 w-6 h-6 rounded-full bg-[#9640ff] border-2 border-white z-10"></div>

                                            {/* Date Column */}
                                            <div className="flex sm:flex-col items-center sm:items-start sm:w-24">
                                                <div className="text-lg font-medium mr-2 sm:mr-0">
                                                    {event.date}
                                                </div>
                                                <div className="text-sm text-zinc-600">
                                                    {event.dayOfWeek}
                                                </div>
                                            </div>

                                            <Card className="flex-1 border-zinc-800">
                                                <CardContent className="p-2 sm:p-6">
                                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                                        <div className="flex-1">
                                                            {/* Time and Status */}
                                                            <div className="flex items-center gap-2 mb-2">
                                                                {event.isLive && (
                                                                    <span className="text-[#9640ff] text-sm font-medium">
                                                                        LIVE
                                                                    </span>
                                                                )}
                                                                <span className="text-black">
                                                                    {event.time}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-2xl sm:text-xl font-medium mb-3 sm:mb-4 text-black">
                                                                {event.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="text-black text-sm">
                                                                    By
                                                                </span>
                                                                <span className="text-black text-sm">
                                                                    {event.hosts
                                                                        .map(
                                                                            (
                                                                                h
                                                                            ) =>
                                                                                h.name
                                                                        )
                                                                        .join(
                                                                            ', '
                                                                        )}
                                                                </span>
                                                            </div>
                                                            {event.location && (
                                                                <div className="flex items-center gap-2 text-black text-sm">
                                                                    <MapPin className="w-4 h-4" />
                                                                    {
                                                                        event.location
                                                                    }
                                                                </div>
                                                            )}
                                                            {event.platform && (
                                                                <div className="flex items-center gap-2 text-black text-sm">
                                                                    <Video className="w-4 h-4" />
                                                                    {
                                                                        event.platform
                                                                    }
                                                                </div>
                                                            )}
                                                            <div className="mt-4">
                                                                {event.status ? (
                                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-500/10 text-[#9640ff]">
                                                                        {
                                                                            event.status
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <StarWarsButton
                                                                        title={
                                                                            'Checkout event'
                                                                        }
                                                                        onClick={() =>
                                                                            handleCheckoutEvent(
                                                                                event.slug
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <img
                                                            src={
                                                                event.thumbnail ||
                                                                '/placeholder.svg' ||
                                                                '/placeholder.svg'
                                                            }
                                                            alt={event.title}
                                                            className="object-contain rounded-lg w-full h-full"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Leaderboard />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
