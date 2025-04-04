import { useRef } from 'react';
import useGlobalStorage from '../../store';

const Leaderboard = () => {
    const { name } = useGlobalStorage();
    const wheelRef = useRef(null);

    // Sample data for top 10 players
    const players = [
        { rank: 1, username: 'EcoWarrior', points: 12450, badges: 8 },
        { rank: 2, username: 'GreenThumb', points: 11320, badges: 7 },
        { rank: 3, username: name, points: 10890, badges: 9 },
        { rank: 4, username: 'EarthDefender', points: 9750, badges: 6 },
        { rank: 5, username: 'ClimateHero', points: 8960, badges: 8 },
        { rank: 6, username: 'PlanetSaver', points: 8540, badges: 5 },
        { rank: 7, username: 'RegenRanger', points: 7980, badges: 7 },
        { rank: 8, username: 'EcoChampion', points: 7650, badges: 6 },
        { rank: 9, username: 'GreenInnovator', points: 7320, badges: 5 },
        { rank: 10, username: 'NatureGuardian', points: 6980, badges: 7 },
    ];

    // Spin wheel prizes
    const prizes = [
        '100 Points',
        '200 Points',
        '50 Points',
        '500 Points',
        'Mystery Badge',
        'Extra Task',
        '20% Bonus',
        'Try Again',
    ];

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Top Players
                </h2>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        This Week
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        This Month
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200">
                        All Time
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Rank
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Player
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Points
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Badges
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {players.map((player) => (
                            <tr
                                key={player.rank}
                                className={
                                    player.rank <= 3 ? 'bg-orange-50' : ''
                                }
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div
                                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                            player.rank === 1
                                                ? 'bg-yellow-400'
                                                : player.rank === 2
                                                ? 'bg-gray-300'
                                                : player.rank === 3
                                                ? 'bg-amber-600'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        <span
                                            className={`text-sm font-medium ${
                                                player.rank <= 3
                                                    ? 'text-gray-800'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {player.rank}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-orange-100 flex items-center justify-center">
                                            <span className="text-orange-800 font-medium">
                                                {player.username.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {player.username}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {player.rank === 1
                                                    ? 'Champion'
                                                    : player.rank <= 3
                                                    ? 'Top Contributor'
                                                    : 'Active Member'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 font-medium">
                                        {player.points.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        ZEN Points
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex -space-x-1">
                                            {[
                                                ...Array(
                                                    Math.min(3, player.badges)
                                                ),
                                            ].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-6 h-6 rounded-full bg-[#cbf101] border-2 border-white flex items-center justify-center"
                                                >
                                                    <span className="text-white text-xs">
                                                        ★
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="ml-2 text-sm text-gray-500">
                                            {player.badges}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700">
                    View All Rankings
                </button>
                <div className="text-sm text-gray-500">Updated 2 hours ago</div>
            </div>
        </div>
    );
};

export default Leaderboard;
