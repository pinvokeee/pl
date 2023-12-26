import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { useState } from "react";
import { ClassItem, SummaryItem, logics } from "../../types";

export const EditSummaryItemDialog = (props: 
    { 
        isOpen: boolean, 
        title: string, 
        defaultValue: SummaryItem, 
        onClose: (newvalue: SummaryItem, isChange: boolean) => void 
    }) => {

    const { isOpen, title, defaultValue, onClose } = props;
    const [item, setItem] = useState<SummaryItem>({...defaultValue});

    const handleInput = (e: any) => {
        setItem(item => ({...item, name: e.target.value}));
    }

    const handleChange = (e: any) => {
        setItem(item => ({...item, allocateType: e.target.value}));
    }

    const handleApply = () => {
        onClose(item, true);
    }

    const handleCancel = () => {
        onClose(item, false);
    }

    return <>
        <Dialog open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack padding={"8px"} gap={2}>
                    <TextField onChange={handleInput} label="名前" value={item.name}></TextField>
                    <FormControl>
                        <InputLabel>計上タイプ</InputLabel>
                        <Select label="計上タイプ" value={item.allocateType} onChange={handleChange}>
                            <MenuItem value={"revenue"}>売上</MenuItem>
                            <MenuItem value={"cost"}>コスト</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleApply}>OK</Button>
                <Button onClick={handleCancel}>キャンセル</Button>
            </DialogActions>
        </Dialog>
    </>
}

export const EditClassItemDialog = (props: 
    { 
        isOpen: boolean, 
        title: string, 
        defaultValue: ClassItem, 
        resultItems: SummaryItem[],
        onClose: (newvalue: ClassItem, isChange: boolean) => void 
    }) => {

    const { isOpen, title, defaultValue, resultItems, onClose } = props;
    const [item, setItem] = useState<ClassItem>({...defaultValue});

    const handleNameInput = (e: any) => {
        setItem(itm=> ({
            ...itm,
            name: e.target.value
        }));
    }

    const handleCodeInput = (e: any) => {
        setItem(itm => ({
            ...itm,
            code: e.target.value
        }));
    }

    const handleParentIdSelect = (e: any) => {
        setItem(itm => ({
            ...itm,
            parentResultItemId: e.target.value
        }));
    }

    const handleLogicSelect = (e: any) => {
        setItem(itm => ({
            ...itm,
            logicName: e.target.value
        }));
    }


    const handleApply = () => {
        onClose(item, true);
    }

    const handleCancel = () => {
        onClose(item, false);
    }

    return <>
        <Dialog open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack sx={{padding: "16px"}} gap={2}>
                    <TextField onChange={handleNameInput} label="名前" value={item.name}></TextField>
                    <TextField onChange={handleCodeInput} label="会計コード" value={item.code}></TextField>


                    <FormControl>
                        <InputLabel>集計項目</InputLabel>
                        <Select label="集計項目" value={item.parentResultItemId} onChange={handleParentIdSelect}>
                        {
                            resultItems.map((item) => 
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                        }
                    </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>ロジック</InputLabel>
                        <Select label="ロジック" onChange={handleLogicSelect} value={item.logicName}>
                            {
                                Object.keys(logics).map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApply}>OK</Button>
                <Button onClick={handleCancel}>キャンセル</Button>
            </DialogActions>
        </Dialog>
    </>
}