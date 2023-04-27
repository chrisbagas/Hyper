import { type NextPage } from "next";
import { useState } from "react";
import { api } from "../../utils/api";
import { useEffect } from "react";
import { jwtHelper } from "../../components/jwtHelper";
import { useRouter } from "next/router";


const AdminLogin: NextPage = () => {
    const router =useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const adminMutation = api.admin.login.useMutation()

    useEffect(()=>{
        if(jwtHelper.jwtCheck()){
            router.push('/admin/dashboard')
        }
    },[])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        console.log(value)
        if (event.target.id == 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }
    async function handleSubmit() {
        try {
            const res = await adminMutation.mutateAsync(
                {
                    usernameInput: username as string,
                    passwordInput: password as string
                }
            )
            localStorage.setItem('token', res)
            router.push('/admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="p-16 flex flex-col items-center justify-center mx-auto md:h-screen">
                <img src="/white-logo-only.svg" className="h-20 items-center my-4" />
                <h1 className="text-4xl text-neutral-0">Welcome to Hyper Admin Dashboard</h1>
                <label className="label">
                    <span className="label-text-alt text-base-4">Please connect with your admin account</span>
                </label>
                <div className="form-control w-1/4 px-16 my-8">
                    <label className="label">
                        <span className="label-text text-neutral-0">Username</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        className="input input-bordered w-full bg-base-2 border-base-3 placeholder:text-base-4 text-neutral-0"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control w-1/4 px-16">
                    <label className="label">
                        <span className="label-text text-neutral-0">Password</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="input input-bordered w-full bg-base-2 border-base-3 placeholder:text-base-4 text-neutral-0"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn bg-primary-main text-white mt-8" onClick={(e) => handleSubmit()}>Login as Admin</button>
            </div>
        </>
    );
};

export default AdminLogin;