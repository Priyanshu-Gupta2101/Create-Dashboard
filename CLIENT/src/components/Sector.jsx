import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Link,
  Button,
} from "@mui/material";

const useStyles = {
  paper: {
    padding: "20px",
    margin: "20px",
  },
  formControl: {
    minWidth: 120,
  },
  chartContainer: {
    marginTop: "20px",
  },
};

const Sector = () => {
  const [sectorData, setSectorData] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [page, setPage] = useState(1);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedSector) {
          const response = await axios.get(
            `http://localhost:5000/api/data/filter/sector/${selectedSector}?page=${page}`
          );
          setSectorData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSector, page]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Sector Filter Visualization
      </Typography>
      <Paper style={useStyles.paper}>
        <FormControl style={useStyles.formControl}>
          <InputLabel id="sector-select-label">Select Sector</InputLabel>
          <Select
            labelId="sector-select-label"
            id="sector-select"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            <MenuItem value="Energy">Energy</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            {/* Add more sectors as needed */}
          </Select>
        </FormControl>

        <div style={{ overflow: "auto", maxHeight: 400 }}>
          <List>
            {sectorData.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.title}
                  secondary={`Published: ${item.published}`}
                />
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  Source: {item.source}
                </Link>
                {/* Add more fields as needed */}
              </ListItem>
            ))}
          </List>
        </div>

        <Button
          variant="contained"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Paper>
    </div>
  );
};

export default Sector;
