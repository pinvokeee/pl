import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack } from "@mui/material";
import { SummaryComposition, ClassItem, SummaryItem } from "../../types";
import { useState } from "react";
import { EditClassItemDialog, EditSummaryItemDialog } from "./EditDialog";
import { useCalcBoard } from "../../hook/useTableBoard";

type Props =
{
    isOpen: boolean, 
    composition: SummaryComposition, 
    onCloseDialog: (newComposition: SummaryComposition | undefined) => void 
}

export const CompositionEditor = (props: Props) => {

    const calcBoard = useCalcBoard({...props.composition});
    const { composition } =  calcBoard;

    const { isOpen, onCloseDialog } = props;

    const [editSummaryItem, setEditSummaryItem] = useState<SummaryItem | undefined>(undefined);
    const [editClassItem, setEditClassItem] = useState<ClassItem | undefined>(undefined);

    const handleAppendClick = () => {
        const item : SummaryItem = { id: crypto.randomUUID(), name: "", allocateType: "cost" }
        setEditSummaryItem(item);
    }

    const handleCalcAppendClick = (parentId: string) => {
        const item : ClassItem = { id: crypto.randomUUID(), name: "", code: "", parentResultItemId: parentId, logicName: "直接入力" }
        setEditClassItem(item);
    }

    const onSummaryItemChanged = (value: SummaryItem, isChange: boolean) => {

        if (isChange && editSummaryItem) {
            calcBoard.setCompositonSummaryItem(value);
        }
        
        setEditSummaryItem(undefined);
    }

    const onClassItemChanged = (value: ClassItem, isChange: boolean) => {

        if (isChange && editClassItem) {
            calcBoard.setCompositonClassItem(value);
        }
        
        setEditClassItem(undefined);
    }
    
    const handleClose = (newcomp : SummaryComposition | undefined) => {
        onCloseDialog(newcomp);
    }

    return <>
        <Dialog open={isOpen} fullWidth maxWidth="lg">
            <DialogTitle>集計項目の設定</DialogTitle>
            <DialogContent>
                <Box>
                    <Stack>
                        {
                            composition.summaryItems.map((item) => {
                                return <Box key={item.id}>
                                    <Stack>
                                        {item.name}
                                        {
                                            Array.from(composition.classItems.values())
                                            .filter((classItem) => classItem.parentResultItemId == item.id)
                                            .map((childItem) => <Box sx={{ marginLeft: "16px" }}>{childItem.name}</Box>)
                                        }
                                        <Button  onClick={() => handleCalcAppendClick(item.id)}>内訳項目の追加</Button>
                                    </Stack>
                                </Box>
                            })
                        }
                        
                        <Button onClick={handleAppendClick}>集計項目の追加</Button>

                    </Stack>
                </Box>

                
                <EditSummaryItemDialog 
                key={editSummaryItem?.id ?? crypto.randomUUID()}
                isOpen={editSummaryItem != undefined} 
                defaultValue={editSummaryItem as SummaryItem} 
                title="集計項目の追加" 
                onClose={onSummaryItemChanged} />

                <EditClassItemDialog 
                key={editClassItem?.id ?? crypto.randomUUID()}
                isOpen={editClassItem != undefined} 
                defaultValue={editClassItem as ClassItem} 
                title="内訳項目の追加" 
                resultItems={composition.summaryItems}
                onClose={onClassItemChanged} />

            </DialogContent>
            <DialogActions>
                <Button color="info" onClick={() => handleClose(composition)}>完了</Button>
                <Button color="error" onClick={() => handleClose(undefined)}>キャンセル</Button>
            </DialogActions>
        </Dialog>

    
    </>
}