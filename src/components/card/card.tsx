import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function SimpleAccordion(props: any) {
  const {title, desc, openCard, onChange, id} = props
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
            {desc}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
