import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { SingleSelectDD } from "./../../components"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ListItem } from 'material-ui';

export function JoinCard(props: any) {
  const {joinsData} = props
  const[formDB, setFromDB] = React.useState("tad")
  const[fromTable, setFromTable] = React.useState("")
  const[fromColumn, setFromColumn] = React.useState("")
  const[toDB, setToDB] = React.useState("tad")
  const[toTable, setToTable] = React.useState("")
  const[toColumn, setToColumn] = React.useState("")
  const[joinType, setJoinType] = React.useState("INNER JOIN")
  const[joinData, setJoinData] = React.useState(props.joinsData)

  const onAdd = (key: any) =>{
    let joinId = formDB + fromTable + fromColumn + toDB + toTable + toColumn + joinType
    let data: any = {"primary_db": formDB, "primary_table": fromTable, "primary_column": fromColumn,
      "secondary_db": toDB, "secondary_table": toTable, "secondary_column": toColumn,
      "join_type": joinType
    }
    if (formDB && fromTable && fromColumn && toDB && toTable && toColumn && joinType){
      const newData = {...joinData}
      data["disable"] = true;
      newData[Number(key)] = data;
      const defaultId = new Date().getTime();
      newData[defaultId] = {};
      props.onAdd(newData);
    }
  }

  const reset = () =>{
    setFromDB("tad")
    setFromColumn("")
    setToTable("")
    setToDB("tad")
    setFromTable("")
    setToColumn("")
  }

  React.useEffect(() => {
    //TO uncomments when API call is made
    setJoinData(props.joinsData)
    reset();
  }, [props.joinsData])

  return (
      <>
      {Object.keys(joinData).map((key: any) => {
        const id = key;
        const value = joinsData[key];
        return (
        <Card key={id} style={{width: "90%", margin: "2rem 0rem 0rem 0rem"}}>
          <CardContent>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={6} md={1}>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    From
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3.6}>
                <SingleSelectDD disable= {!!value?.disable} selectedValue={value?.primary_db || formDB} key={`${id}_fromDB`} onChange={setFromDB} label="Choose DB" reqUrl="" apiType="db"/>
                </Grid>
                <Grid item xs={6} md={3.6}>
                  <SingleSelectDD disable= {!!value?.disable} key={`${id}_fromTable`} selectedValue={value?.primary_table || fromTable} onChange={setFromTable} label="Choose From Table" reqUrl={`http://rdb11.micron.com:5050/api/tables/${formDB}`} apiType="tables"/>
                </Grid>
                <Grid item xs={6} md={3.6}>
                  <SingleSelectDD disable= {!!value?.disable} key={`${id}_fromColumn`} selectedValue={value?.primary_column || fromColumn} onChange={setFromColumn} label="Choose From Column" reqUrl={`http://rdb11.micron.com:5050/api/column/${formDB}/${fromTable}`} apiType="columns"/>
                </Grid>
              </Grid>
            </div>
            <div style={{margin: "20px 0px 0px 0px"}}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={1}>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    To
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3.6}>
                  <SingleSelectDD disable= {!!value?.disable} selectedValue={value?.secondary_db || toDB} key={`${id}_toDB`} onChange={setToDB}  label="Choose To DB" reqUrl="" apiType="db"/>
                </Grid>
                <Grid item xs={6} md={3.6}>
                <SingleSelectDD disable= {!!value?.disable} selectedValue={value?.secondary_table || toTable} key={`${id}_toTable`}  onChange={setToTable} label="Choose To Table" reqUrl={`http://rdb11.micron.com:5050/api/tables/${toDB}`} apiType="tables"/>
                </Grid>
                <Grid item xs={6} md={3.6}>
                  <SingleSelectDD disable= {!!value?.disable} selectedValue={value?.secondary_column || toColumn} key={`${id}_toColumn`} onChange={setToColumn} label="Choose To Column" reqUrl={`http://rdb11.micron.com:5050/api/column/${toDB}/${toTable}`} apiType="columns"/>
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActions style={{float: "right", margin: "0rem 1.5rem 0rem 0rem"}}>
            <SingleSelectDD disable= {!!value?.disable} selectedValue={joinType} key={`${id}_joinType`} onChange={setJoinType}  label="Join Type" reqUrl="" apiType="joins"/>
            {!value?.disable && (
              <Button key={`${id}_add`} onClick={() => onAdd(id)} size="large">Add</Button>
              )}
            
          </CardActions>
        </Card>
        )
      })}     
    </>
  );
}
