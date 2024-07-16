import React, { useMemo } from "react";
import { fetchAds, fetchPrices } from "../api";
import { useLoaderData } from "react-router-dom";
import { AdInfo, PriceMap } from "../interfaces/types";
import Chart from "../components/Chart";
import { getClicksAndViews, getPercentOfClicked, getPricePerClick } from "../functions/ChartTransform";
import PriceList from "../components/PriceList";

export async function loader() {
    const data = await fetchAds()
    const prices = await fetchPrices()
    return { ads: data, prices: prices.data }
}

function Dashboard() {
    const { ads, prices } = useLoaderData() as { ads: AdInfo[], prices: PriceMap }
    const sorted = useMemo(() => ads.sort((a, b) => a.shownDate.getTime() - b.shownDate.getTime()), [ads])

    const viewAndClickStats = useMemo(() => getClicksAndViews(sorted), [sorted]);
    const percentClickedStats = useMemo(() => getPercentOfClicked(viewAndClickStats), [viewAndClickStats])
    const pricePerClickStats = useMemo(() => getPricePerClick(viewAndClickStats, prices), [viewAndClickStats, prices])

    return (
        <div className="container mx-auto mt-10 shadow-3xl p-10 bg-slate-950/50 rounded-xl overflow-hidden">
            <p>Dashboard</p>
            <div className="flex flex-col md:flex-row justify-stretch">
                <div className="w-full md:w-[50%]" >
                    <h4 className="text-center py-3">Clicks and Views</h4>
                    <Chart data2={viewAndClickStats} groupSize={2} groupNames={["Views", "Clicks"]} prefix="aaa" />
                </div>
                <div className="w-full md:w-[50%]" >
                    <h4 className="text-center py-3">% of clicked</h4>
                    <Chart data2={percentClickedStats} groupSize={1} groupNames={["Percent clicked"]} prefix="bbb" />
                </div>
            </div>
            <div className="pt-5 flex flex-col-reverse md:flex-row justify-stretch">
                <div className="w-full md:w-[50%]">
                    <h4 className="text-center py-3">Price List per month</h4>
                    <PriceList priceList={prices} />
                </div>
                <div className="w-full md:w-[50%]">
                    <h4 className="text-center py-3">Cost per click ($)</h4>
                    <Chart data2={pricePerClickStats} groupNames={[]} prefix="ccc" />
                </div>
            </div>
            {/* <Chart
                array={ads}
                getZ={(ad) => ad.type}
                getX={(ad) => `${ad.shownDate.getFullYear()} ${ad.shownDate.getMonth()}`}
                getGroupedY={(ad) => 1}
                getGroupedY2={(ad) => ad.isClicked ? 1 : 0} />
            <Chart
                array={ads}
                getX={(ad) => `${ad.shownDate.getFullYear()} ${ad.shownDate.getMonth()}`}
                getZ={(ad) => ad.type}
                getGroupedY={(ad, i) => i === 0 ? ad.isClicked ? 1 : 0 : ad.isClicked ? }
            /> */}


            {/* {sorted.map(d =>
                <>
                    <h6 className="mt-3">{d.type}</h6>
                    <p>{d.shownDate.toString()}</p>
                    <div className={`w-[10px] h-[10px] ${d.isClicked? "bg-green-600": "bg-red-600"}`}></div>
                </>
            )} */}
        </div>
    )
}

export default Dashboard;