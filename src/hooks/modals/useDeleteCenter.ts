import { create } from 'zustand';


interface AddNewVehicleModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (id: string) => void;
  data: any;
  setData(data: any): void; 

}

const useDeleteCenter = create<AddNewVehicleModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  id: "",
  setId: (id) => set({id: id}),
  data: {},
  setData: (data) => set({ data: {data}}),
  
}));


export default useDeleteCenter;
