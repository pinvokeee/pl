export type SummaryItem = {
    id: string,
    name: string,
    allocateType: "revenue" | "cost",
}

export type ClassItem = {
    id: string,
    code: string,
    name: string,
    parentResultItemId: string,
    logicName: string,
}

export type IdValuePair = {
    id: string,
    value: number,
}

export type ClassIdValueIdPair = {
    classId: string,
    valueId: string,
}


export type Value = {
    id: string,
    value: number,
}

export type SummaryComposition = {
    summaryItems: SummaryItem[],
    classItems: ClassItem[],
}

export type PerformanceObject = {
    budget: SummaryObject[],
    actual: SummaryObject[],
}

export type SummaryObject = {
    summaryId: string,
    detailValueIds: ClassIdValueIdPair[],
}

export type BudgetLogic = {
    editAction: () => void,
    calc: (currentId: string, composition: SummaryComposition, values: Value[]) => number,
}

export const logics : {[ey: string] : { logic: BudgetLogic }} = {

    "直接入力": {
        logic: {
            editAction: () => { },
            calc: (currentId: string, composition: SummaryComposition, values: Value[]) => {
                return 0;
                // return values.find(val => val.fieldId == currentId)?.value ?? 0;
            }
        }
    }

}