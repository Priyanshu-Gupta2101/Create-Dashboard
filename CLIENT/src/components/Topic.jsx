import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
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

const Topic = () => {
  const [topicData, setTopicData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/data/filter/topic/${selectedTopic}?page=${page}`
        );
        setTopicData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedTopic, page]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Topic Filter Visualization
      </Typography>
      <Paper style={useStyles.paper}>
        <FormControl style={useStyles.formControl}>
          <InputLabel id="topic-select-label">Select Topic</InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <MenuItem value="gas">Gas</MenuItem>
            <MenuItem value="renewable-energy">Renewable Energy</MenuItem>
            {/* Add more topics as needed */}
          </Select>
        </FormControl>

        <div style={{ overflow: "auto", maxHeight: 400 }}>
          <List>
            {topicData.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.title}
                  secondary={`Published: ${item.published}`}
                />
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  Source: {item.source}
                </Link>
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

export default Topic;
