import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

import { NavbarDemo } from '../../components/navbar/navbar-menu';
import VerticalLinearStepper from '../../components/stepper';
import { Button } from '../../components/ui/button';
import StarWarsButton from '../../components/ui/startwar-btn';
import { events } from '../Events';

const getEventDetails = (id: string) => {
    return events.find((event) => event.slug === id);
};

export default function EventPage() {
    const [em, setEm] = useState(false);
    const [isUserInRange, setIsUserInRange] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const params = useParams();
    const eventId = params.eventId as string;
    const event = getEventDetails(eventId);
    if (!event) {
        return <div>Event not found</div>;
    }

    const handleVerification = () => {
        toast.dismiss();
        toast.loading('Verifying email');
        toast.success('Email verified');
        setEm(true);
        setActiveStep(1);
    };

    return (
        <div className="relative min-h-screen">
            <NavbarDemo />
            <div className="fixed inset-0 w-full h-full z-0">
                <img
                    className="w-full h-full object-cover opacity-10"
                    src="https://ethglobal.b-cdn.net/events/taipei/images/5ifhr/default.jpg"
                    alt="bg"
                />
            </div>
            <div className="relative z-10 min-h-screen bg-transparent text-black p-4 sm:p-8 mt-3">
                <div className="max-w-4xl mx-auto">
                    <Link to={'/events'}>
                        <Button variant="ghost" className="mb-4 relative z-10">
                            ← Back to Events
                        </Button>
                    </Link>
                    <div className="w-full h-full">
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-lg mb-5 shadow-2xl"
                        />
                    </div>
                    <h1 className="text-3xl font-semibold mb-4">
                        {event.title}
                    </h1>
                    <div className="bg-gray-50 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 group">
                        <p className="text-lg mb-2">
                            <span className="font-medium">Date:</span>{' '}
                            {event.date}
                        </p>
                        <p className="text-lg mb-2">
                            <span className="font-medium">Time:</span>{' '}
                            {event.time}
                        </p>
                        {event.location && (
                            <p className="text-lg mb-2">
                                <span className="font-medium">Location:</span>{' '}
                                {event.location}
                            </p>
                        )}
                        {event.platform && (
                            <p className="text-lg mb-2">
                                <span className="font-medium">Platform:</span>{' '}
                                {event.platform}
                            </p>
                        )}
                        {event.description && (
                            <p className="text-lg mb-2">
                                <span className="font-medium">
                                    About the event:
                                </span>{' '}
                                {event.description}
                            </p>
                        )}
                    </div>

                    <StarWarsButton
                        title={' Verify for Event'}
                        onClick={handleVerification}
                    />

                    <VerticalLinearStepper
                        event={event}
                        isUserInRange={isUserInRange}
                        setIsUserInRange={setIsUserInRange}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        em={em}
                    />
                </div>
            </div>
        </div>
    );
}
