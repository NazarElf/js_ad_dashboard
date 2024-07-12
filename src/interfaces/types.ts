import { AdInfoDTO } from "./dtos"

export type AdType = "GOOGLE" | "FACEBOOK" | "INSTAGRAM" | "X"

export type AdInfo = Omit<AdInfoDTO, "shownDate"> & { shownDate: Date }
export type PriceMap = {
    [K in AdType]?: number;
}