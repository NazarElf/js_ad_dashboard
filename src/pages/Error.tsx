import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
    let error = useRouteError() as { status?: number, statusText?: string, message?: string, data?: { message?: string } }

    return (
        <>
            <h2 className="text-center pt-5">Oops!</h2>
            <p className="text-center pt-4">
                Something went wrong <br />
                {error.status && <>{error.status}<br /></>}
                {error.statusText && <>{error.statusText}<br /></>}
                {error.message && <>{error.message}<br /></>}
                {error.data?.message && error.data.message}
            </p>
        </>
    )
}

export default Error