import { useState } from "react";
import AddEdit from "../userform/AddEdit";
import ModalComponent from "./ModalComponent";

const CreateModal = () => {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <div className="p-10 flex justify-center w-full">
      <button
        className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white"
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
