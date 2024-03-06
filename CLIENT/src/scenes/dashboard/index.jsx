import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import LikelihoodLineChart from "../../components/LineChart";
import RelevanceChart from "../../components/PieChart";
import ChoroplethMap from "../../components/Chloropeth";
import WordCloud from "../../components/WordCloud";

const DashBoard = () => {
  const wordData = [
    { topic: "Technology" },
    { topic: "Environment" },
    { topic: "Finance" },
    { topic: "Healthcare" },
    { topic: "Energy" },
    { topic: "Education" },
    { topic: "Automobile" },
    { topic: "Space" },
    { topic: "Fashion" },
    { topic: "Entertainment" },
    { topic: "Politics" },
    { topic: "Sports" },
    { topic: "Food" },
    { topic: "Travel" },
    { topic: "Science" },
  ];

  const barChartData = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
    { label: "D", value: 35 },
    { label: "E", value: 21 },
    { label: "F", value: 24 },
    { label: "G", value: 27 },
    { label: "H", value: 19 },
    { label: "I", value: 30 },
  ];

  const dummyData = [
    { year: 2017, likelihood: 3 },
    { year: 2018, likelihood: 2 },
    { year: 2019, likelihood: 4 },
    { year: 2020, likelihood: 3 },
    { year: 2021, likelihood: 5 },
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
      >
        <Header title="DASHBOARD" subtitle="Welcome to this dashboard" />

        <Box>
          <Grid>
            <Grid item xs={12}>
              <Header title=" Visualization Dashboard" subtitle="Bar Graph" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BarChart data={barChartData} xLabel="Label" yLabel="Value" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LikelihoodLineChart data={dummyData} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RelevanceChart />
            </Grid>
            <Grid item xs={12}>
              <ChoroplethMap />
            </Grid>
            <Grid item xs={12}>
              <WordCloud data={wordData} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;
