import { useState } from "react";
import AddEdit from "../userform/AddEdit";
import ModalComponent from "./ModalComponent";
import '../userform/AddEdit.css'

const CreateModal = () => {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <div className="p-10 flex justify-center w-full">
      <button
        className="bg-[#3498db] text-white px-4 py-2 border-none rounded text-base font-medium cursor-pointer transition duration-300 ease-in-out hover:bg-[#2980b9] hover:scale-105 active:bg-[#1c5980] active:scale-90"
        onClick={() => setOpen(true)}
      >
        Create user
      </button>
      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <AddEdit closeModal={() => setOpen(false)} isAddMode="adding"/>
      </ModalComponent>
    </div>
  );
};

export default CreateModal;
