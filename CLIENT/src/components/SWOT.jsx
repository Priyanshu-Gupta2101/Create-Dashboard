// Swot.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper, Box } from "@mui/material";
import StatBox from "./Statbox";

const useStyles = {
  paper: {
    padding: "20px",
    margin: "20px",
  },
  chartContainer: {
    marginTop: "20px",
  },
};

const Swot = () => {
  const [swotData, setSwotData] = useState(null);
  const categories = ["strengths", "weaknesses", "opportunities", "threats"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/swot-analysis"
        );
        setSwotData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching SWOT data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        SWOT Analysis
      </Typography>
      <Paper style={useStyles.paper}>
        <Box id="swot-chart" style={useStyles.chartContainer}>
          {categories.forEach((category, index) => (
            <StatBox
              key={index}
              title={category}
              subtitle={`Count: ${swotData[category].count}`}
              progress={swotData[category].count / 1000}
              increase={`+${swotData[category].increase}`}
            />
          ))}
        </Box>
      </Paper>
    </div>
  );
};

export default Swot;
