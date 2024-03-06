// InsightsPage.js
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase,
  IconButton,
  Box,
  useTheme,
  Pagination,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { token } from "./../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const Insights = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [insights, setInsights] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // New state for total pages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/data?page=${page}`);
        setInsights(response.data);

        // Extract total pages from the response headers
        const totalPagesFromHeaders = Number(response.headers["x-total-pages"]);
        setTotalPages(totalPagesFromHeaders);
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchData();
  }, [page]);

  const filteredInsights = insights.filter((insight) =>
    insight.insight.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box marginTop={4} marginLeft={4}>
      <Header title="Insights Page" subtitle="See the insights from the data" />
      <Paper
        style={{
          padding: "20px",
          margin: "20px",
          backgroundColor: colors.primary[600],
        }}
      >
        <Typography variant="h4" gutterBottom>
          List of Insights
        </Typography>
        <Box marginBottom={2} display="flex" alignItems="center">
          <InputBase
            placeholder="Search Insights..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ flex: 1, marginRight: 1 }}
          />
          <IconButton>
            <SearchOutlined />
          </IconButton>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Insight</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Published</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInsights.map(({ id, insight, source, published }) => (
                <TableRow
                  key={id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/detailed/${id}`)}
                >
                  <TableCell>{insight}</TableCell>
                  <TableCell>{source}</TableCell>
                  <TableCell>{published}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box marginTop={2} display="flex" justifyContent="flex-end">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Insights;
