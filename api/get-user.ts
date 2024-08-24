import axiosInstance from "@/lib/axios";
import { type User } from "@clerk/nextjs/server";
export const getUsers = async (userIds: string[] | string): Promise<User[]> => {
    const { data } = await axiosInstance.post<{ users: User[] }>("/api/get-users", { userIds: typeof userIds === "string" ? [userIds] : userIds })
    return data?.users || []
}