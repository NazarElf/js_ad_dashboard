import React, { Fragment, MouseEvent, useRef } from "react";

export type GroupedType = Array<{
    xAxisName: any,
    yAxisValues: Array<{
        yAxisName: any,
        zAxisValues: number,
        zAxisValues2?: number
    }>
}>

export type StringConvertible = number | string;
export type HeaderRow = Array<StringConvertible>
export type DataRow = [StringConvertible, ...number[]];

export type TableType = [HeaderRow, ...DataRow[]]


function generateColor(value: number, maxValue: number, darker: boolean = false) {
    const max = darker ? 150 : 160;
    const min = darker ? 50 : 90;
    let step = 360 / maxValue;
    let hue = step * value;
    let rgb = hue % 60;
    let v1 = max;
    let v2 = min;
    let v3 = ((hue % 120) === rgb) ? min + rgb / 60 * (max - min) : max - rgb / 60 * (max - min);
    let r, g, b;
    if (hue < 60) {
        r = v1.toString(16).padStart(2, "0")
        g = Math.floor(v3).toString(16).padStart(2, "0")
        b = v2.toString(16).padStart(2, "0")
    }
    else if (hue < 120) {
        r = Math.floor(v3).toString(16).padStart(2, "0")
        g = v1.toString(16).padStart(2, "0")
        b = v2.toString(16).padStart(2, "0")
    }
    else if (hue < 180) {
        r = v2.toString(16).padStart(2, "0")
        g = v1.toString(16).padStart(2, "0")
        b = Math.floor(v3).toString(16).padStart(2, "0")
    }
    else if (hue < 240) {
        r = v2.toString(16).padStart(2, "0")
        g = Math.floor(v3).toString(16).padStart(2, "0")
        b = v1.toString(16).padStart(2, "0")
    }
    else if (hue < 300) {
        r = Math.floor(v3).toString(16).padStart(2, "0")
        g = v2.toString(16).padStart(2, "0")
        b = v1.toString(16).padStart(2, "0")
    }
    else if (hue < 360) {
        r = v1.toString(16).padStart(2, "0")
        g = v2.toString(16).padStart(2, "0")
        b = Math.floor(v3).toString(16).padStart(2, "0")
    }
    return `#${r}${g}${b}`
}

let calcFunc = (input: number) => {
    let pow = Math.ceil(Math.log10(input));
    return (input > (10 ** pow) / 2) ? 10 ** (pow - 1) : (input > (10 ** pow) / 5) ? 10 ** (pow - 1) / 2 : 10 ** (pow - 1) / 5
}

let checkTable = (inputTable: TableType): boolean => {
    let cols = inputTable[0].length
    return inputTable.reduce((prev, curr) => prev && curr.length === cols, true)
}

function Chart({ data2, groupSize = 1, groupNames, className, prefix = "" }: {
    data2: TableType,
    groupSize?: number,
    groupNames?: string[],
    className?: string,
    prefix?: string
}
) {
    const rectRef = useRef<HTMLDivElement>(null)

    if (!checkTable(data2))
        return (<><h1>Invalid input data for chart.</h1><p>Not every row has same length as header row</p></>)

    const margins = 5;
    const marginLeft = 50;
    const textSpace = 100;
    const height = 400;
    const width2 = (data2.length - 1) <= 4 ? 400 : (data2.length - 1) * 100;
    const groupWidth2 = (width2 - margins - marginLeft) / (data2.length - 1);
    const barsInGroup2 = (data2[0].length - 1) / groupSize;
    const barWidth2 = groupWidth2 * 0.8 / barsInGroup2;
    const highest2 = (data2.slice(1) as DataRow[]).reduce((acc, curr) => {
        let rowHighest = (curr.slice(1) as number[]).reduce((acc2, curr2) => acc2 > curr2 ? acc2 : curr2, 0)
        return acc > rowHighest ? acc : rowHighest
    }, 0);
    const step2 = calcFunc(highest2);
    const needPrecision = step2 > 1000 || step2 < 1;



    let mouseEnter = (i: number, j: number) => (e: MouseEvent<SVGGElement>) => {
        let parent = {
            top: e.currentTarget.parentElement?.getBoundingClientRect().top ?? 0,
            left: e.currentTarget.parentElement?.getBoundingClientRect().left ?? 0,
        }
        let curr = {
            top: e.currentTarget.getBoundingClientRect().top,
            left: e.currentTarget.getBoundingClientRect().left + e.currentTarget.getBoundingClientRect().width / 2,
            height: (rectRef.current?.getBoundingClientRect().height ?? 0)
        }

        let res = {
            top: curr.top - parent.top - curr.height,
            left: curr.left - parent.left
        }
        if (rectRef.current) {
            rectRef.current.style.top = (res.top).toString() + "px"
            rectRef.current.style.left = res.left.toString() + "px"
            rectRef.current.classList.replace("invisible", "visible")
            let inner = document.createElement("p")
            inner.classList.add("text-slate-800")
            inner.classList.add("text-sm")
            rectRef.current.innerHTML = ""
            inner.innerHTML = "<b>" + data2[0][Math.floor((j - 1) / groupSize) * groupSize + 1].toString() + "</b><br/>"
            if (groupSize !== 1 && groupNames) {
                for (let k = 0; k < Math.min(groupNames.length, groupSize); k++) {
                    inner.innerHTML += (groupNames[k] + ": " + data2[i][Math.floor((j - 1) / groupSize) * groupSize + 1 + k] + "<br/>")
                }
            }
            else {

                inner.innerHTML += data2[i][j].toString().length > 5 ? (data2[i][j] as number).toPrecision(3) : data2[i][j].toString();
            }
            rectRef.current.appendChild(inner)
        }

    }
    function mouseLeave(e: MouseEvent<SVGGElement>) {
        if (rectRef.current) {
            rectRef.current.classList.replace("visible", "invisible")
        }
    }

    return (
        <>
            <div className={"relative" + (className ? (" " + className) : "")}>
                <div className="overflow-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0,0,${width2},${height}`} className="max-h-[80vh] min-w-[400px]">
                        { /* lines */}
                        <line x1={marginLeft} x2={marginLeft} y1={margins} y2={height - margins - textSpace} className="stroke-slate-300" />
                        <line x1={marginLeft} x2={width2 - margins} y1={height - margins - textSpace} y2={height - margins - textSpace} className="stroke-slate-300" />
                        {Array(Math.ceil(highest2 / step2)).fill(1).map((v, i) => (
                            <Fragment key={i}>
                                <text
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    x={marginLeft - margins}
                                    y={height - textSpace - i * step2 / highest2 * (height - margins - textSpace) - margins}
                                    className="fill-slate-500/50 sticky"
                                >{needPrecision ? (i * step2).toPrecision(1) : (i * step2)}</text>
                                <line
                                    x1={marginLeft}
                                    x2={width2 - margins}
                                    y1={height - textSpace - i * step2 / highest2 * (height - margins - textSpace) - margins}
                                    y2={height - textSpace - i * step2 / highest2 * (height - margins - textSpace) - margins}
                                    className="stroke-slate-500/50"
                                />
                            </Fragment>
                        ))}
                        {/* data */}
                        {data2.map((row, i) =>
                            (i !== 0) &&
                            <Fragment key={i}>
                                <text
                                    textAnchor="middle"
                                    x={margins + marginLeft + groupWidth2 * (i - 1) + groupWidth2 / 2}
                                    y={height - margins}
                                    className="fill-slate-300 text-sm">{row[0]}</text>
                                {data2[0].map((col0, j) =>
                                    (j !== 0) && (((j - 1) % groupSize) === 0) && <Fragment key={j}>
                                        <path
                                            id={`${prefix}x${(i)}y${(j)}`}
                                            d={`M ${margins + marginLeft + groupWidth2 * 0.1 + barWidth2 * (j - 1) / groupSize + groupWidth2 * (i - 1) + barWidth2 * .5},` +
                                                `${height} ` +
                                                `L ${margins + marginLeft + groupWidth2 * 0.1 + barWidth2 * (j - 1) / groupSize + groupWidth2 * (i - 1) + barWidth2 * .5},` +
                                                `${height - textSpace}`} />
                                        <text
                                            className="fill-slate-300 text-xs"
                                            dominantBaseline="middle"
                                            textAnchor="end"
                                        ><textPath href={`#${prefix}x${(i)}y${(j)}`} startOffset={100}>{col0}</textPath></text>
                                    </Fragment>
                                )}
                                {row.map((col, j) =>
                                    (j !== 0) &&
                                    <rect onMouseEnter={mouseEnter(i, j)} onMouseLeave={mouseLeave} key={j}
                                        //className="group-hover:stroke-1 group-hover:stroke-black/50"
                                        width={barWidth2}
                                        height={(col as number) / highest2 * (height - margins - textSpace)}
                                        x={margins + marginLeft + groupWidth2 * 0.1 + barWidth2 * (Math.floor((j - 1) / groupSize)) + groupWidth2 * (i - 1)}
                                        y={height - textSpace - (col as number) / highest2 * (height - margins - textSpace) - margins}
                                        fill={generateColor((Math.floor((j - 1) / groupSize)), barsInGroup2, !!((j - 1) % 2))} />
                                )}
                            </Fragment>
                        )}
                    </svg >
                </div >
                <div className={`absolute px-3 py-1 bg-slate-300 ` +
                    `top-0 left-0 invisible hover:visible rounded-md ` +
                    `border-yellow-800 border-2 -translate-x-[50%] -translate-y-2 after:absolute after:left-[50%] ` +
                    `after:border-yellow-800 after:border-t-transparent after:border-r-transparent after:border-4 ` +
                    `after:-translate-x-[50%] after:-rotate-45`} ref={rectRef}>
                </div>
            </div>
        </>
    )
}

export default Chart;