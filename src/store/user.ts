import { create } from 'zustand'
import { UserProp } from '@/types/user.prop'
import { createUser, deleteUser, editUser, getUser, getUsers } from '@/services/apiFunctions'

interface State {
  users: UserProp[] | null
  user: UserProp | null
  page: number
  itemsPerPage: number
  totalPages: number | null
  getAllUsers: () => Promise<void>
  getUser: (id: string) => Promise<void>
  createUser: (data: UserProp) => Promise<void>
  editUser: (data: UserProp, id: string) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  goNextPage: () => void
  goPreviousPage: () => void
}

export const useUserStore = create<State>((set, get) => ({
  users: null,
    user: null,
    page: 1,
    itemsPerPage: 5,
    totalPages: null,
    getAllUsers: async () => {
      const { page, itemsPerPage } = get()

      const users = await getUsers()
      const start = (page - 1) * itemsPerPage
      const end = start + itemsPerPage
      const paginatedUsers = users.slice(start, end)

      set({
         users: paginatedUsers,
         totalPages: Math.ceil(users.length / itemsPerPage)
      })
    },
    getUser: async (id: string) => {
        const user = await getUser(id)
        set({user})
    },
    createUser: async (data: UserProp) => {
      await createUser(data);
      await get().getAllUsers();
    },
    editUser: async (data: UserProp, id: string) => {
        await editUser(data, id);
        await get().getAllUsers();

    },
    deleteUser: async (id: string) => {
        await deleteUser(id);
        await get().getAllUsers();
    },
    
    goNextPage: async () => {
      const { page, totalPages } = get()
      if (totalPages && page < totalPages) {
        set({ page: page + 1 })
        await get().getAllUsers()
      }
    },

    goPreviousPage: async () => {
      const { page } = get()
      if (page > 1) {
        set({ page: page - 1 })
        await get().getAllUsers()
      }
    },
}));