// About.js
import { Box, Container, Typography, Paper, useTheme } from "@mui/material";
import { token } from "../../theme";
import Header from "../../components/Header";

const About = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const bioText = `I am Priyanshu Gupta, a Computer Engineering student at Thadomal Shahani Engineering College in Mumbai, Maharashtra. I am passionate about software development and have a strong foundation in various technologies, including Next.js, React.js, Node.js, Express.js, MongoDB, Django, Python, and more. With a keen interest in creating innovative solutions, I have contributed to projects like UrbanHides, WealthWise, Mindspace, and Healthista. My technical skills include proficiency in languages such as Python, C/C++, SQL, NoSQL, JavaScript, HTML/CSS, and Java. I am well-versed in frameworks like Django, Flask, React, Express.js, Next.js, and Tailwind CSS. In addition, I am experienced in using developer tools like Git, Github, Postman, VS Code, Android Studio, PyCharm, and IntelliJ. As a Senior Committee Member of TSEC Codestorm, I actively contribute to the coding community, promoting knowledge sharing and collaboration.`;

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        flexDirection="column"
      >
        <Header title="ABOUT" subtitle="Know about us" />

        <Container maxWidth={"md"}>
          <Box my={4}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                marginTop: "20px",
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
              }}
            >
              <Typography variant="body1" paragraph>
                {bioText}
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
