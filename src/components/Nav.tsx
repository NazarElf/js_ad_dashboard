import React, { useState } from "react";
import { NavLink, NavLinkProps, Outlet } from "react-router-dom";

type StyledNavLinkProps = Omit<NavLinkProps, 'className'>

function StyledNavLink(props: StyledNavLinkProps) {
    return <NavLink className={
        ({ isActive, isPending }) =>
            ((isActive ? "text-slate-400" : isPending ? "text-slate-400" : "hover:text-slate-300") + " text-xl")
    } {...props} />
}

function Nav() {
    const [shown, setShown] = useState<boolean>(true);
    function toggle() {
        setShown(state => !state)
    }
    return (
        <>
            <div className={`fixed w-full h-full transition-all bg-black md:hidden ${shown ? "opacity-0 -z-10" : "opacity-50 z-10"}`}></div>

            <div className={`sticky top-0 w-full bg-black py-3 md:mb-0 transition-all ${shown ? "" : "-mb-[100px]"} z-50`} onClick={toggle}>
                <div className={`md:hidden text-center transition-all select-none cursor-pointer ${shown ? "rotate-180" : ""}`}>V</div>
                <ul className={`flex flex-col md:flex-row gap-2 md:gap-5 justify-center items-center md:h-auto overflow-hidden transition-all ${shown ? "h-0" : "h-[100px]"}`}>
                    <StyledNavLink to="/">Home</StyledNavLink>
                    <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
                    <StyledNavLink to="/about">About</StyledNavLink>
                </ul>
            </div>
            <Outlet />
        </>
    )
}

export default Nav;