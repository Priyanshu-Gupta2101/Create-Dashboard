// EndYear.js
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as d3 from "d3";

const useStyles = {
  paper: {
    padding: "20px",
    margin: "20px",
  },
  chartContainer: {
    marginTop: "20px",
  },
  formControl: {
    minWidth: 120,
  },
};

const EndYear = () => {
  const [endYearData, setEndYearData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/data/filter/end_year/${selectedYear}`
        );
        setEndYearData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    if (endYearData) {
      // D3.js visualization logic here
      const svg = d3.select("#end-year-chart");

      // Example: Create circles for each data point
      const circles = svg.selectAll("circle").data(endYearData);

      circles
        .enter()
        .append("circle")
        .attr("cx", (d, i) => i * 30 + 30)
        .attr("cy", 50)
        .attr("r", 10)
        .style("fill", "blue");
    }
  }, [endYearData]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        End Year Filter Visualization
      </Typography>
      <Paper style={useStyles.paper}>
        <FormControl style={useStyles.formControl}>
          <InputLabel id="end-year-select-label">Select End Year</InputLabel>
          <Select
            labelId="end-year-select-label"
            id="end-year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            {/* Add more years as needed */}
          </Select>
        </FormControl>
        <div id="end-year-chart" style={useStyles.chartContainer}></div>
      </Paper>
    </div>
  );
};

export default EndYear;
