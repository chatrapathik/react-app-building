import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export function QueryCard(props: any) {

  const {queryData, sqlQuery} = props
  const [loader, setLoader] = React.useState(true)

  console.log("data is: ", queryData)
  const getQuery = () => {
    axios.post(`http://10.71.203.188:5050/api/query`, queryData)
        .then((response: any) => {
        setLoader(false);
        props.setSQLQuery(response.data.query);
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
