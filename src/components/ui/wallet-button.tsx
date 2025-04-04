import { HoverBorderGradient } from './hover-border-gradient';

export function HoverBorderGradientDemo({ title }: { title: string }) {
    return (
        <div className="m-40 flex justify-center text-center">
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black  text-white flex items-center space-x-2"
            >
                <span>{title.slice(0, 6) + '...' + title.slice(-6)}</span>
            </HoverBorderGradient>
        </div>
    );
}
