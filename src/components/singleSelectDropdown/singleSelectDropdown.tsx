import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";

export function SingleSelectDD(props: any) {
  const {selectedValue, label, reqUrl, apiType, disable=false} = props
  const [values, setDropdownValues] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent) => {
    if (props.onChange){
      props.onChange(event.target.value)
    }
  };


  const requestApi = () => { 
    if (apiType === "db") {
        setDropdownValues(["tad", "tad_short"]);
        return;
    }
    if(apiType === "joins") {
      setDropdownValues(["INNER JOIN", "LEFT JOIN", "RIGHT JOIN"]);
      return;
    }
    var url_split = reqUrl.split("/")
    if (url_split.includes("column") && url_split[url_split.length - 1] === ''){
      setDropdownValues([]);
      return;
    }

    axios.get(reqUrl)
        .then((response: any) => {
            if (apiType === "db") {
              setDropdownValues(response.data.values);
            } else if(apiType === "tables") {
              setDropdownValues(response.data.tables);
            } else if(apiType === "columns") {
              var colunm_data: any[] = []

              response.data.columns.map((item: any) => (
                colunm_data.push(item.column)
              ))      
              var new_colunms: any[] = []
              colunm_data.forEach((column) => {
                if (column.substr(-4) === "hash" || ["dieN32", "test_number", "slash_lot"].includes(column)) {
                  new_colunms.push(column)
                }
              });
              setDropdownValues(new_colunms);
            }
        })
        .catch(error => { console.log("Error", error)})
  }

  //Life cycle hook used to make API call
  React.useEffect(() => {
    //TO uncomments when API call is made
    requestApi()
  }, [props.reqUrl])

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label={label}
          onChange={handleChange}
          disabled={disable}
        >
          {values.map((item: any) => (
              <MenuItem value={item} key={item+label}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}