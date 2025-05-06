import { API_URL, TOKEN } from "@/config/config";
import { UserProp } from "@/types/user.prop";
import axios from "axios";

export async function getUsers(): Promise<UserProp[]> {
    try {
        const res = await axios.get(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        console.log(res.data)
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getUser(id: string): Promise<UserProp> {
    try {
        const res = await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createUser(data: UserProp) : Promise<UserProp>
{
    try {
        const res = await axios.post(`${API_URL}`, data, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function editUser(data: UserProp, id: string) : Promise<void>
{
    try {
        await axios.put(`${API_URL}/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function deleteUser(id: string) : Promise<void>
{
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
