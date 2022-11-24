import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

/*
    This hook returns a function that is used EXACTLY as a `fetch` call.

    `authFetch` is the function returned, and it does 2 things:
        1. It adds the Authorization header to the request with the access_token
        2. It refreshes the token and calls fetch again if the request fails with a 401 error

    ======= Usage =======
    const { authFetch } = useAuthFetch();

    authFetch("https://example.com/api/v1/endpoint", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    Return type is the same as the fetch call, so can be used with either `await` or `.then()`
 */
const useAuthFetch = () => {
    let { auth: token } = useAuth();
    const refresh = useRefreshToken();

    const authFetch = async (url: string, options: RequestInit = {}) => {
        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            token = await refresh?.()
            if (token !== null) {
                response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${token}`,
                    }
                })
            }
        }
        return response;
    }

    return { authFetch }
}

export default useAuthFetch;
