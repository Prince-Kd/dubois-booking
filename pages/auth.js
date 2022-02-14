import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

import AdminLogin from "./admin/login";
import Spinner from "../components/spinner";

export default function AuthPage(){
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        console.log(router.query)
        getSession().then((session) => {
            if(session){
                router.replace('/admin/dashboard');
            }else {
                setIsLoading(false)
            }
        })
    }, [router])

    if(isLoading){
        return <Spinner />
    }

    return <AdminLogin />
}