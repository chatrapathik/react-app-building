import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export function QueryCard(props: any) {

  const {queryData} = props
  const [loader, setLoader] = React.useState(true)
  const [sqlQuery, setSQLQuery] = React.useState("")
  console.log("data is: ", queryData)
  const getQuery = () => {
    axios.post(`http://10.71.178.186:5050/api/query`, queryData)
        .then((response: any) => {
        setLoader(false);
        setSQLQuery(response.data.query);
      }).catch(error => { console.log("Error", error)})
    }
    
  React.useEffect(() => {
    getQuery()
    setLoader(true);
  }, [])


  return (
    <>
      <Card style={{width: "90%"}}>
        <CardContent>
          {loader && <CircularProgress disableShrink /> }
          <Typography>{sqlQuery}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
