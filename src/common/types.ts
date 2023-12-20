/**
 * 従業員パターン
 */
export type employeePattern = {
    /**
     * パターン固有のID
     */
    id: string,

    /**
     * カテゴリー
     */
    category: string,

    /**
     * レイヤー
     */
    layer: string,

    /**
     * 雇用形態などの付加情報
     */
    variant: string,
}

/**
 * 従業員パターンに紐づく単価設定
 */
export type employeeRate = {
    /**
     * 従業員パターンID
     */
    employeePatternId: string,

    /**
     * 単価
     */
    amount: number,

    /**
     * 残業による金額の増加率
     */
    overtimeRate: number
}

/**
 * 従業員パターンに紐づく稼働時間設定
 */
export type operatingResult = {

    /**
     * 従業員パターンID
     */
    employeePatternId: string,

    /**
     * 稼働時間
     */
    operatingHours: number,

    /**
     * 残業時間
     */
    overtimeHours: number,
}

export type CalclationItem = {

    name: string,

}

// const aa = {

//     name: "TS業務売上",



// }

// export type AccountItem = {
//     name: string,
//     details: AccountDetailsItem[],
// }

// export type AccountDetailsItem = {
//     code: string,
//     name: string,
//     value: number,
// }

export type RevenueItem = {
    name: string,
    amount: number,
}

export type CostItem = {
    costCode: string,   //勘定項目コード
    name: string,       //勘定項目
    parentCostName: string, //実績項目
    amount: number,     //金額
}

/**
 * P/L本体のデータを保持するオブジェクト
 */
export type PLObject = {

    /**
     * 従業員パターンに基づくデータを管理する
     */
    employeeData: {

        /**
         * 従業員パターンの設定
         */
        pattern: employeePattern[], 

        /**
         * 単価設定
         */
        rates: {

            /**
             * 収益単価の配列
             */
            revenue: employeeRate[],

            /**
             * コスト単価の配列
             */
            cost: employeeRate[],
        },

        /**
         * 稼働設定・実績
         */
        result: {

            /**
             * 収益
             */
            revenue: {

                /**
                 * 計画
                 */
                forcast: operatingResult[],

                /**
                 * 実績
                 */
                actual: operatingResult[],
            },

            /**
             * コスト
             */
            cost: {

                /**
                 * 計画
                 */
                forcast: operatingResult[],

                /**
                 * 実績
                 */
                actual: operatingResult[],
            }
        }
    }

    /**
     * 勘定項目
     */
    revenueItems: RevenueItem[],
}