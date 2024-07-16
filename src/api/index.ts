import axios, { AxiosResponse } from "axios";
import { AdInfoDTO } from "../interfaces/dtos";
import { AdInfo, PriceMap } from "../interfaces/types";

const url = "http://192.168.0.111:8080"
const ads = '/ads'
const prices = '/price'

export const fetchAds = () => {
    return  axios.get<AdInfoDTO[]>(url + ads).then(res => res.data.map<AdInfo>(ad => { return { ...ad, shownDate: new Date(ad.shownDate) } }))
}

export const fetchPrices = () => {
    return axios.get<PriceMap>(url + prices)
}