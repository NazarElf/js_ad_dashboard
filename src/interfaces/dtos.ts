import { AdType } from "./types";

export type AdInfoDTO = {
    type: AdType;
    shownDate: string;
    isClicked: boolean;
}