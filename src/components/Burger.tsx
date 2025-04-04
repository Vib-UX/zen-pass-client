import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function BurgerMenu({ name }: { name: string }) {
    return (
        <div className="ml-4">
            <Menu>
                <div className="flex items-center gap-x-2">
                    <MenuButton className="inline-flex items-center rounded-full size-12 bg-gray-800 pl-1 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        {name}
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 rounded-xl mt-2 z-40 border-2 border-[#cbf101] bg-gray-50 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        <Link
                            to={'/myEvents'}
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                        >
                            My Events
                        </Link>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}
