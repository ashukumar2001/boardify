import { useAuth } from "@clerk/nextjs";

export default function useAuthenticatedFetch() {
    const { getToken } = useAuth();

    const authenticatedFetch = async (input: string | RequestInfo | URL, init?: RequestInit) => {
        return fetch(input, {
            ...(init || {}),
            headers: {
                "Authorization": `Bearer ${await getToken()}`,
                "Content-Type": "application/json",
                ...(init?.headers || {}),
            }
        })
    }

    return { authenticatedFetch };
}