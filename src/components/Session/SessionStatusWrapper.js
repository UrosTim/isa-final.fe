'use client'

import {useSession} from "next-auth/react";
import {Row, Spinner} from "reactstrap";
import storageKey from "@/core/storageKey";

export default function SessionStatusWrapper({children}) {
    const {data: session, status} = useSession();

    if (session && session.user) {
        sessionStorage.setItem(storageKey.TOKEN, session.user?.token);
        sessionStorage.setItem(storageKey.REFRESH_TOKEN, session.user?.refreshToken);
    }

    return (
        <>
            {status === "loading" ?
                <Row className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
                    <Spinner/>
                </Row> :
                <>
                    {children}
                </>
            }
        </>
    );
}