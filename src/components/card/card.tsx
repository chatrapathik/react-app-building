import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export function SimpleAccordion(props: any) {
  const {title, desc, openCard, onChange, id, columns} = props
  const _columns = columns ? columns : []
  console.log("new props", props)
  return (
    <div>
      <Accordion 
        expanded={openCard}
        style={{ 'border': "1px solid #ccc", margin: "8px 0" }}
        onChange={() => onChange(id)}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {_columns.map((item: any, idx: number) => (
                <Button variant="contained" disabled={item.filterDiable} style={{ margin: "0 5px 15px" }}>
                  {item.column}
                </Button>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
