import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

/*
    This hook returns a function that is basically a modified fetch.
    Use the returned function the same way you would use fetch.

    authFetch adds some additional functionality such as passing in the access token as a header and
    refreshing the token to call the api again if you get a 401 response.

    ======= Usage =======
    const { authFetch } = useAuthFetch();

    authFetch("https://example.com/api/v1/endpoint", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

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
        if (response.status == 401) {
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
