import { motion } from 'framer-motion';
import { useState } from 'react';

export const tabs = ['Events', 'Leaderboard'];

interface TabProps {
    text: string;
    selected: boolean;
    setSelected: (text: string) => void;
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
    return (
        <button
            onClick={() => setSelected(text)}
            className={`${
                selected
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
            } relative rounded-md p-2 text-sm font-medium transition-colors`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-md bg-red-500"
                ></motion.span>
            )}
        </button>
    );
};

const ButtonShapeTabs = ({
    selected,
    setSelected,
}: {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <div className="mb-8 flex flex-wrap items-center gap-2">
            {tabs.map((tab, index) => (
                <Tab
                    text={tab}
                    selected={selected === tab}
                    setSelected={setSelected}
                    key={tab}
                />
            ))}
        </div>
    );
};

export default ButtonShapeTabs;
