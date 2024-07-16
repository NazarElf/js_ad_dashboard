import { AdInfo, AdType, PriceMap } from "../interfaces/types";
import { DataRow, TableType } from "../components/Chart";


type StatsType = {
    month: string;
    values: { [K in AdType]: number; };
}[]

function leadingZeros(num: number) {
    var s = "0" + num;
    return s.substring(s.length - 2);
}

function sortFunc<T, K extends keyof T>(key: K) {
    return (a: T, b: T) => {
        const valueA = a[key];
        const valueB = b[key];
        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }

        // names must be equal
        return 0;
    }
}

function getAndInsertPricePerClick(input: TableType, price: PriceMap, resTable: Array<Array<string | number>>, index: 2 | 4 | 6 | 8, type: AdType) {
    //console.log(input, price, resTable, index, type, price[type], input.length, input[1])
    if (price[type]) {
        resTable[0].push(type)
        for (let i = 1; i < input.length; i++) {
            const row = input[i] as DataRow;
            // @ts-ignore
            resTable[i].push(row[index] / price[type])
        }
    }
}

function insert(data: StatsType, info: AdInfo, month: string, condition?: (info: AdInfo) => boolean) {
    let viewsMonth = data.find(view => view.month === month)
    if (viewsMonth && (condition ? condition(info) : true)) {
        viewsMonth.values[info.type] += 1
    }
    else {
        let values: { [K in AdType]: number } = { FACEBOOK: 0, GOOGLE: 0, INSTAGRAM: 0, X: 0 };
        values[info.type] = 1;
        data.push({ month: month, values: values })
    }
}

export const getClicksAndViews = (input: Array<AdInfo>, dateFrom = new Date(2024, 0), dateTo = new Date()): TableType => {
    let views: StatsType = []
    let clicks: StatsType = []
    input.forEach(info => {
        if (info.shownDate >= dateFrom && info.shownDate <= dateTo) {
            let month = `${info.shownDate.getFullYear()}.${leadingZeros(info.shownDate.getMonth())}`
            insert(views, info, month);
            insert(clicks, info, month, (i) => i.isClicked)
        }
    }
    )

    let sortedViews = views.sort(sortFunc("month"))
    let sortedClicks = clicks.sort(sortFunc("month"))

    let resTable: TableType = [["Month", "X", "", "INSTAGRAM", "", "GOOGLE", "", "FACEBOOK", ""]]

    for (let i = 0; i < sortedViews.length; i++) {
        let view = sortedViews[i]
        let click = sortedClicks.find(c => c.month === view.month)
        if (click) {
            resTable.push([view.month,
            view.values.X, click.values.X,
            view.values.INSTAGRAM, click.values.INSTAGRAM,
            view.values.GOOGLE, click.values.GOOGLE,
            view.values.FACEBOOK, click.values.FACEBOOK])
        }
        else {
            resTable.push([view.month,
            view.values.X, 0,
            view.values.INSTAGRAM, 0,
            view.values.GOOGLE, 0,
            view.values.FACEBOOK, 0])
        }
    }


    return resTable;
}

export const getPercentOfClicked = (input: TableType): TableType => {
    let resTable: TableType = [["Month", "X", "INSTAGRAM", "GOOGLE", "FACEBOOK"]]
    for (let i = 1; i < input.length; i++) {
        let row = input[i] as DataRow
        resTable.push([row[0], row[2] / row[1], row[4] / row[3], row[6] / row[5], row[8] / row[7]])
    }
    return resTable;
}

export const getPricePerClick = (input: TableType, price: PriceMap): TableType => {
    let resTable: any = []
    input.forEach((row) => {
        resTable.push([row[0]])
    })
    getAndInsertPricePerClick(input, price, resTable, 2, "X");
    getAndInsertPricePerClick(input, price, resTable, 4, "INSTAGRAM");
    getAndInsertPricePerClick(input, price, resTable, 6, "GOOGLE");
    getAndInsertPricePerClick(input, price, resTable, 8, "FACEBOOK");
    return resTable;
}