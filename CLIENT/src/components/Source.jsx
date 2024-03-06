import { useEffect, useState } from "react";
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
  Button,
  Link,
} from "@mui/material";

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

const Source = () => {
  const [sourceData, setSourceData] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/data/filter/source/${selectedSource}?page=${page}`
        );
        setSourceData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSource, page]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Source Filter Visualization
      </Typography>
      <Paper style={useStyles.paper}>
        <FormControl style={useStyles.formControl}>
          <InputLabel id="source-select-label">Select Source</InputLabel>
          <Select
            labelId="source-select-label"
            id="source-select"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <MenuItem value="EIA">EIA</MenuItem>
            <MenuItem value="YourSource1">YourSource1</MenuItem>
            {/* Add more sources as needed */}
          </Select>
        </FormControl>

        <div style={{ overflow: "auto", maxHeight: 400 }}>
          <List>
            {sourceData.map((item) => (
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

export default Source;
