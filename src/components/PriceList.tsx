import React from "react";
import { AdType, PriceMap } from "../interfaces/types";

export default function PriceList({ priceList }: { priceList: PriceMap }) {
    let priceArray: [string, number][] = [];
    for (const line in priceList) {
        let ln: AdType = line as AdType;
        priceArray.push([line, priceList[ln] ?? 0])
    }
    return (
        <>
            <table className="mx-auto">
                <thead>
                    <tr className="border-b-2 border-slate-300">
                        <th className="p-2 text-lg">Resource</th>
                        <th className="p-2 text-lg">Cost per month ($)</th>
                    </tr>
                </thead>
                <tbody className="text-end">
                    {
                        priceArray.map(line => (
                            <tr className="odd:bg-slate-800/50 hover:bg-slate-700 transition-colors">
                                <td className="p-2 text-lg">
                                    {line[0]}
                                </td>
                                <td className="p-2 text-lg">
                                    {line[1]}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}