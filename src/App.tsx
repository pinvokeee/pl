import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Accordion, AccordionDetails, AccordionSummary, Stack, TextField, Typography } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Stack>
            <Stack gap={2} direction={'row'}>
                <div>TS業務売上</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
                <div>￥1000000</div>
            </Stack>
        </Stack>

    </>
  )
}

export default App
