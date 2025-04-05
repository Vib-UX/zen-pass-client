import { Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
    {
        id: 1,
        title: 'Team Learn Online sent a message',
        course: 'Generative AI & LLMs for Beginners',
        date: '21 Jan',
        message:
            '📌 Unlock the Power of AI with Gemini 2.0 – Before Everyone Else!',
        image: '/thumbnail.jpg',
    },
    {
        id: 2,
        title: 'Team Learn Online sent a message',
        course: 'Generative AI & LLMs for Beginners',
        date: '15 Jan',
        message: '🧠 Build AI Agents Before They Take Over the Workforce!',
        image: '/thumbnail.jpg',
    },
    {
        id: 3,
        title: 'Team Learn Online sent a message',
        course: 'Generative AI & LLMs for Beginners',
        date: '28 Dec 2024',
        message: 'AI is not taking your job (maybe)',
        image: '/thumbnail.jpg',
    },
];

export default function NotificationPanel() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 ml-5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
            >
                <Bell className="w-5 h-5" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-[360px] bg-gray-50 shadow-xl rounded-xl overflow-hidden z-50 border border-gray-200"
                    >
                        <div className="p-4 text-sm font-semibold border-b">
                            Notifications
                        </div>
                        <div className="divide-y">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="flex items-start gap-4 p-4 hover:bg-gray-50 transition"
                                >
                                    <img
                                        src={notif.image}
                                        alt="notif"
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-800">
                                            <span className="font-semibold">
                                                {notif.title}
                                            </span>{' '}
                                            to{' '}
                                            <span className="font-medium text-blue-600">
                                                {notif.course}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {notif.date}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-2">
                                            {notif.message}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
