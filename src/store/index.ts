import { create } from 'zustand';

type Store = {
    address: string;
    setAddress: (address: string) => void;
    email: string;
    setEmail: (email: string) => void;
    name: string;
    setName: (name: string) => void;
};

type InitialState = Pick<Store, any>;

const initialState: InitialState = {
    address: '',
    email: '',
    name: '',
};

const useGlobalStorage = create<Store>((set) => ({
    address: initialState.address,
    setAddress: (address: string) => set({ address }),
    email: initialState.email,
    setEmail: (email: string) => set({ email }),
    name: initialState.name,
    setName: (name: string) => set({ name }),
}));

export default useGlobalStorage;
