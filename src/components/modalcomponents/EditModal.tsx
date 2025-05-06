"use client";
import { useState } from "react";
import AddEdit from "../userform/AddEdit";
import EditIcon from "@mui/icons-material/Edit";
import ModalComponent from "./ModalComponent";
import { UserProp } from "@/types/user.prop";

type EditModalProp = {
  user: UserProp;
};

const EditModal = ({ user }: EditModalProp) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <EditIcon />
      </button>
      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <AddEdit
          closeModal={() => setOpen(false)}
          user={user}
          isAddMode="editing"
        />
      </ModalComponent>
    </>
  );
};

export default EditModal;
