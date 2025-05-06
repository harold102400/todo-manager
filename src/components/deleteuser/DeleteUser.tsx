import { useUserStore } from '@/store/user';
import { UserProp } from '@/types/user.prop';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type DeleteUserProps = {
    closeModal: () => void;
    user: UserProp
  };
const DeleteUser = ({ closeModal, user }: DeleteUserProps) => {

const {deleteUser} = useUserStore()
const handleDelete = async () => {
    await deleteUser(user.id)
    closeModal();
}

return (
    <div style={{minWidth: 275}}>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: "left", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
        Are you sure you want to delete user {user.name}?
      </Typography>
    </CardContent>
    <CardActions>
      <button onClick={handleDelete} className='border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-red-500 hover:bg-red-600 text-white'>Delete</button>
      <button onClick={closeModal} className='border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white'>Cancel action</button>
    </CardActions>
  </div>
  )
}

export default DeleteUser