// FilterManagementPage.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Typography, Paper, Grid, TextField, Button } from "@mui/material";
import Chart from "../../components/BarChart"; // Import your D3.js chart component

const useStyles = {
  paper: {
    padding: "20px",
    margin: "20px",
  },
  button: {
    marginLeft: "10px",
  },
  chartContainer: {
    marginTop: "20px",
  },
};

const FilterManagementPage = () => {
  const [filters, setFilters] = useState({
    region: "Northern America",
    endYear: "2022",
    topic: "gas",
    sector: "Energy",
    pestle: "Industries",
    source: "EIA",
    swot: "YourSWOT",
    country: "United States of America",
    city: "YourCity",
  });

  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/data/filter",
        {
          params: filters,
        }
      );
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters, filters]);

  // Define chart configurations with associated filters
  const charts = [
    { chartId: 1, filter: "region", default: "Northern America" },
    { chartId: 2, filter: "topic", default: "gas" },
    { chartId: 3, filter: "sector", default: "Energy" },
    { chartId: 4, filter: "country", default: "United States of America" },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Filter Management
      </Typography>
      <Paper className={useStyles.paper}>
        <Grid container spacing={3}>
          {charts.map((chart) => (
            <Grid item xs={3} key={chart.chartId}>
              {chart.filter && (
                <TextField
                  label={chart.filter}
                  name={chart.filter}
                  value={filters[chart.filter]}
                  onChange={handleChange}
                  fullWidth
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={applyFilters}
              className={useStyles.button}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={useStyles.paper}>
        <Typography variant="h5" gutterBottom>
          Filtered Data
        </Typography>
        <ul>
          {filteredData.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      </Paper>
      <div className={useStyles.chartContainer}>
        <Typography variant="h5" gutterBottom>
          Charts
        </Typography>
        <Grid container spacing={3}>
          {charts.map((chart) => (
            <Grid item xs={3} key={chart.chartId}>
              <Chart filter={chart.filter} default={chart.default} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default FilterManagementPage;
