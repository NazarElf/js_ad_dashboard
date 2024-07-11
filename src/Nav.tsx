import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Nav() {
    return (
        <>
            <ul>
                <NavLink className={({isActive, isPending}) => isActive ? "text-slate-400" : isPending ? "text-slate-400" : ""} to="/">Home</NavLink>
                <NavLink className={({isActive, isPending}) => isActive ? "text-slate-400" : isPending ? "text-slate-400" : ""} to="/dashboard">Dashboard</NavLink>
                <NavLink className={({isActive, isPending}) => isActive ? "text-slate-400" : isPending ? "text-slate-400" : ""} to="/about">About</NavLink>
            </ul>
            <Outlet />
        </>
    )
}

export default Nav;