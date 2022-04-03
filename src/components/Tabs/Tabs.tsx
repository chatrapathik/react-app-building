import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export function DBTabs(){
  const [value, setValue] = React.useState('tad');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: "24px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        style={{ float: "right" }}
      >
        <Tab value="tad" label="TAD" />
        <Tab value="tad_short" label="TAD SHORT" />
      </Tabs>
    </Box>
  );
}
