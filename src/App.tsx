import { useState } from 'react'
import { CompositionEditor } from './features/totalling/ui/compositionEdior/CompositionEditor';
import { ClassItem, PerformanceObject, SummaryComposition, SummaryItem } from './features/totalling/types';
import { Button } from '@mui/material';
import { SummaryView } from './features/totalling/ui/summaryView/SummaryView';
import { useCalcBoard } from './features/totalling/hook/useTableBoard';

function App() {

    const [isOpenCompositionEditorKey, setShowCompositionEditorStateKey] = useState<string | undefined>(undefined);
    
    const calcBoard = useCalcBoard();

    console.log(calcBoard);

    // const testdata = 
    
    // const [plPeformanceObj, setPlPeformanceObj] = useState<PerformanceObject[]>([]);

    const handleChangeComposition = (composition: SummaryComposition | undefined) => {

        if (composition) {
            calcBoard.setComposition({...composition});
            calcBoard.saveLocalData();
        }

        setShowCompositionEditorStateKey(undefined);
    }

    const handleShowCompoisitionDialog = () => {
        setShowCompositionEditorStateKey(crypto.randomUUID());
    }

    return (
    <>
        <Button onClick={handleShowCompoisitionDialog}>開く</Button>

        <CompositionEditor 
        key={isOpenCompositionEditorKey ?? crypto.randomUUID()}
        isOpen={isOpenCompositionEditorKey != undefined} 
        composition={calcBoard.composition} 
        onCloseDialog={handleChangeComposition}/>

        <SummaryView ></SummaryView>

    </>
    )
}

export default App
