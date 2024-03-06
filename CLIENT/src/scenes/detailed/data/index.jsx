// DetailedData.jsx
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";

const SingleDetailedData = () => {
  const { id } = useParams();
  const [topicData, setTopicData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const filteredData = data.filter((item) => item._id.$oid === id);
  //       setTopicData(filteredData);
  //     };

  //     fetchData();
  //   }, [id]);

  useEffect(() => {
    setTopicData(data);
  }, []);

  const data = [
    {
      end_year: "",
      intensity: 6,
      sector: "Energy",
      topic: "gas",
      insight: "Annual Energy Outlook",
      url: "http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf",
      region: "Northern America",
      start_year: "",
      impact: "",
      added: "January, 20 2017 03:51:25",
      published: "January, 09 2017 00:00:00",
      country: "United States of America",
      relevance: 2,
      pestle: "Industries",
      source: "EIA",
      title:
        "U.S. natural gas consumption is expected to increase during much of the projection period.",
      likelihood: 3,
    },
    {
      end_year: "",
      intensity: 6,
      sector: "Energy",
      topic: "oil",
      insight: "Annual Energy Outlook",
      url: "http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf",
      region: "Northern America",
      start_year: "",
      impact: "",
      added: "January, 20 2017 03:51:24",
      published: "January, 09 2017 00:00:00",
      country: "United States of America",
      relevance: 2,
      pestle: "Industries",
      source: "EIA",
      title:
        "Reference case U.S. crude oil production is projected to recover from recent declines.",
      likelihood: 3,
    },
  ];

  return (
    <Box m="20px">
      <Header title={`Detailed Data for ${id}`} />

      {topicData.length > 0 ? (
        <Grid container spacing={3}>
          {topicData.map((item) => (
            <Grid item xs={12} key={item._id.$oid}>
              <Box p={3} boxShadow={3}>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="body1">{item.insight}</Typography>
                <Typography variant="body2">
                  Published: {item.published}
                </Typography>
                <Typography variant="body2">Source: {item.source}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">
          No data available for the selected topic.
        </Typography>
      )}
    </Box>
  );
};

export default SingleDetailedData;
