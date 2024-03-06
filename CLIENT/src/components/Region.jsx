// Region.js
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

const Region = () => {
  const [regionData, setRegionData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/data/filter/region/${selectedRegion}`
        );
        setRegionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedRegion]);

  useEffect(() => {
    if (regionData) {
      // D3.js visualization logic here
      const svg = d3.select("#region-chart");

      // Example: Create rectangles for each data point
      const rectangles = svg.selectAll("rect").data(regionData);

      rectangles
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 30 + 30)
        .attr("y", 50)
        .attr("width", 20)
        .attr("height", (d) => d.intensity * 10) // Adjust height based on intensity
        .style("fill", "green");
    }
  }, [regionData]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Region Filter Visualization
      </Typography>
      <Paper style={useStyles.paper}>
        <FormControl style={useStyles.formControl}>
          <InputLabel id="region-select-label">Select Region</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <MenuItem value="Northern America">Northern America</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            {/* Add more regions as needed */}
          </Select>
        </FormControl>
        <div id="region-chart" style={useStyles.chartContainer}></div>
      </Paper>
    </div>
  );
};

export default Region;
