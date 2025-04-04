export function calculateDistance({
    lat1,
    lon1,
    lat2,
    lon2,
}: {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
}) {
    const toRadians = (degree: any) => (degree * Math.PI) / 180;

    const R = 6371000; // Earth's radius in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
}
export function extractCoordinates(input: string) {
    const regex = /[-+]?\d*\.\d+/g; // Regular expression to match floating-point numbers
    const matches = input.match(regex); // Extract all matches

    if (matches && matches.length >= 2) {
        const latitude = parseFloat(matches[0]); // First number is latitude
        const longitude = parseFloat(matches[1]); // Second number is longitude
        return { latitude, longitude };
    } else {
        console.error('Invalid input, could not extract coordinates.');
        return null;
    }
}
interface UserLocation {
    latitude: number;
    longitude: number;
}

export const getUserLocation = () => {
    return new Promise<UserLocation>((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    reject(error);
                }
            );
        } else {
            const error = new Error(
                'Geolocation is not supported by this browser.'
            );
            console.error(error.message);
            reject(error);
        }
    });
};
