export type Language = {
    name: string,
    el: El
}

export type El = {
    "datepicker": {
        "activeMonth": string,
        "activeWeek": string,
        "activeDay": string,
        "activeList": string,
        "prevMonth": string,
        "nextMonth": string,
        "today": string,
        "month": {
            "1": string,
            "2": string,
            "3": string,
            "4": string,
            "5": string,
            "6": string,
            "7": string,
            "8": string,
            "9": string,
            "10": string,
            "11": string,
            "12": string,
        },
        "year": string,
        "weeks": {
            "sun": string,
            "mon": string,
            "tue": string,
            "wed": string,
            "thu": string,
            "fri": string,
            "sat": string,
        }
    },
    [key: string]: string | string[] | TranslatePair
}

export type TranslatePair = {
    [key: string]: string | TranslatePair
}