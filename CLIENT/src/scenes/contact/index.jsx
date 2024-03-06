// Contact.js
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { token } from "../../theme";
import Header from "../../components/Header";

const Contact = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  return (
    <Box m="20px">
      <Header
        title="CONTACT"
        subtitle="Use the below form or the credentials to contact us"
      />
      <Box
        display="flex"
        justifyContent="center" // Align the content to the center
        alignItems="center" // Center vertically
        flexDirection="column"
        width="600px"
        mx="auto" // Center horizontally
      >
        <Card
          style={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          }}
        >
          <CardContent>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="First Name"
                    placeholder="Enter your first name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Last Name"
                    placeholder="Enter your Last name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter your Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Phone no."
                    placeholder="Enter your Phone no."
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Enter your message"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Contact;
