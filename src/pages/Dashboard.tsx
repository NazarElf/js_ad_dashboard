import React from "react";
import { fetchAds, fetchPrices } from "../api";
import { useLoaderData } from "react-router-dom";
import { AdInfo, PriceMap } from "../interfaces/types";

export async function loader() {
    const data = await fetchAds()
    const prices = await fetchPrices()
    return { ads: data, prices }
}

function Dashboard() {
    const { ads, prices } = useLoaderData() as { ads: AdInfo[], prices: PriceMap }
    console.log(ads)
    return (
        <div className="container mx-auto mt-10 shadow-3xl p-10 bg-slate-950/50 rounded-xl">
            <p>Dashboard</p>
            {ads.map(d =>
                <>
                    <h6 className="mt-3">{d.type}</h6>
                    <p>{d.shownDate.toString()}</p>
                    <div className={`w-[10px] h-[10px] ${d.isClicked? "bg-green-600": "bg-red-600"}`}></div>
                </>
            )}
        </div>
    )
}

export default Dashboard;