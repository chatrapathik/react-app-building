import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function MultipleSelectCheckmarks(props: any) {
  const [checkedValues, setCheckedValues] = React.useState<string[]>([]);
  const {dataBase, table, column, columnDisabled, filtersData} = props
  const [columnValues, setColumnValues] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof checkedValues>) => {
    const {
      target: { value },
    } = event;
    setCheckedValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    if (filtersData[dataBase] == undefined){
      filtersData[dataBase] = {};
    }
    
    if (filtersData[dataBase][table] === undefined){
      filtersData[dataBase][table] = {};
    }
    filtersData[dataBase][table][column] = value;
    props.onCheck(filtersData);
    if (props.updateFilters){
      props.updateFilters();

    }
  };

  const getColumnValues = () => { 
    if (!columnDisabled) {
      axios.get(`http://rdb11.micron.com:5050/api/column_values/${dataBase}/${table}/${column}`)
          .then((response: any) => {
            setColumnValues(response.data.values);
          })
          .catch(error => { console.log("Error", error)})
    }
  }

  //Life cycle hook used to make API call
  React.useEffect(() => {
    //TO uncomments when API call is made
    getColumnValues()
  }, [])

  return (
    <div>
        <FormControl sx={{ m: 1, width: 300,}} disabled={columnDisabled}>
          <InputLabel id="demo-multiple-checkbox-label">{column}</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={checkedValues}
            onChange={handleChange}
            input={<OutlinedInput label={column} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {columnValues.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={checkedValues.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
  );
}
