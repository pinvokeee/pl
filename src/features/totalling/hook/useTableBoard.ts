import { useState } from "react";
import { ClassIdValueIdPair, ClassItem, IdValuePair, PerformanceObject, SummaryComposition, SummaryItem } from "../types";

const localStorageKey = "test";

const loadLocalSummaryData = () : SummaryComposition => {

    const src = localStorage.getItem(localStorageKey);
    const a = src ? JSON.parse(src) : {};

    return {
        summaryItems: a.summaryItems ?? [],
        classItems: a.classItems ?? [],
        // summaryItems: new Map((a.summaryItems ?? []).map((item : any) => [item.id, item])),
        // classItems: new Map((a.classItems ?? []).map((item : any) => [item.id, item])),
    }
}

const saveLocalSummaryData = (object: SummaryComposition) => {
    localStorage.setItem(localStorageKey, JSON.stringify(object));
}

//12ヶ月分のデータを作成
const createFullYear = () => {

    const ps : PerformanceObject[] = [];

    for (let i = 0; i < 12; i++) {
        ps.push({
            actual: [],
            budget: [],
        });
    }

    return ps;
}

export const useCalcBoard = (baseSummary? : SummaryComposition) => {

    const [valueContainer, setValueContainer] = useState<IdValuePair[]>([]);
    const [composition, setCompositionData] = useState<SummaryComposition>(baseSummary ?? loadLocalSummaryData());
    const [performace, setPerformance] = useState<PerformanceObject[]>(createFullYear());

    const classIdList = composition.classItems.map(item => item.id);
    const summaryIdList = composition.classItems.map(item => item.id);

    const summaryTable = generateSummaryTable(composition, performace);

    const setCompositonClassItem = (newItem: ClassItem) => {

        const hasItem = classIdList.find(id => id == newItem.id);

        if (hasItem) {
            setCompositionData(comp => ({...comp, classItems: comp.classItems.map(current => current.id == newItem.id ? newItem : current)}));
        }
        else {
            setCompositionData(comp => ({...comp, classItems: [...comp.classItems, {...newItem}]}));
        }
    }

    const setCompositonSummaryItem = (newItem: SummaryItem) => {

        const hasItem = summaryIdList.find(id => id == newItem.id);

        if (hasItem) {
            setCompositionData(comp => ({...comp, summaryItems: comp.summaryItems.map(current => current.id == newItem.id ? newItem : current)}));
        }
        else {
            setCompositionData(comp => ({...comp, summaryItems: [...comp.summaryItems, {...newItem}]}));
        }
    }

    const setComposition = (newComposition: SummaryComposition) => {
        setCompositionData(newComposition);
    }

    const saveLocalData = () => {
        saveLocalSummaryData(composition);
    }


    const aaa = () => {

        const sumItems = composition.summaryItems.map(item => ({ name: item.name, id: item.id }));
        const clsItems = composition.classItems.map(item => ({ name: item.name, parentResultItemId: item.parentResultItemId, id: item.id }));

        calclute(performace[0], sumItems, clsItems, valueContainer);

    }

    const calclute = (
        target: PerformanceObject,
        summaryList: { name: string, id: string }[], 
        classList: { name: string, id: string, parentResultItemId: string}[], 
        valContainer: IdValuePair[]) => {

        const dst = {...target};
        const vals = [...valContainer];

        for (let s of summaryList) {
           
            let targetSummary = dst.budget.find(item => item.summaryId == s.id);

            if (!targetSummary) {

                const valueids: ClassIdValueIdPair[] = classList
                .filter(item => item.parentResultItemId == s.id)
                .map(item => ({ classId: item.id, valueId: crypto.randomUUID() }));

                const a = valueids.map(item => ({ id: item.valueId, value: 0 }));
                vals.push(...a);

                targetSummary = { summaryId: s.id, detailValueIds: valueids }
                
                dst.budget.push(targetSummary);
            }

            //合算
            let sumval = 0;
            for (const valid of targetSummary.detailValueIds.map(item => item.valueId)) {
                sumval += vals.find(item => item.id == valid)?.value ?? 0;
            }

            console.log(s.name, sumval);
        }

        // console.log(dst, vals);

        // target.budget[0].summaryValues


    }

    aaa();


    return {
        composition,
        performance,
        summaryTable,

        setComposition,
        setCompositonClassItem,
        setCompositonSummaryItem,
        saveLocalData,
    }
}

const generateSummaryTable = (composition: SummaryComposition, performanceList: PerformanceObject[]) => {
    
    const a = composition.summaryItems.map(item => ({ name: item.name, id: item.id }));

    const b = performanceList.map(pfm => {

        const c = pfm.budget.map(bd => {


        });

        return c;
    })

    console.log(a);
}