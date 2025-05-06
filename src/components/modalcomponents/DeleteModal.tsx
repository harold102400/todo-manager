import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteUser from "../deleteuser/DeleteUser";
import ModalComponent from "./ModalComponent";
import { UserProp } from "@/types/user.prop";

type DeleteModalProp = {
  user: UserProp;
};

const DeleteModal = ({ user }: DeleteModalProp) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <DeleteForeverIcon />
      </button>
      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <DeleteUser closeModal={() => setOpen(false)} user={user} />
      </ModalComponent>
    </>
  );
};

export default DeleteModal;
