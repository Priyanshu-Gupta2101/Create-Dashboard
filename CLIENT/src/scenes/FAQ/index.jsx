// Faq.js
import { Box } from "@mui/material";
import Header from "../../components/Header";
import AccordionComp from "../../components/AccordionComp";
import { useState } from "react";

const Faq = () => {
  const [expand, setExpand] = useState("");
  const handleChange = (isExpanded, panel) => {
    setExpand(isExpanded ? panel : false);
  };

  const faq = [
    {
      name: "panel1",
      title: "What is the purpose of the Data Visualization Assignment?",
      content:
        "The Data Visualization Assignment aims to enhance your skills in visualizing data effectively. You will work with various chart types, such as bar charts, pie charts, and line charts, to represent different datasets. The assignment focuses on conveying information clearly through visual elements.",
    },
    {
      name: "panel2",
      title: "Can you explain the 'Geography Chart' in the assignment?",
      content:
        "In the assignment, the 'Geography Chart' involves creating a visual representation of data related to geography. This could include maps, heatmaps, or any other visualization method that highlights geographic patterns. It's an opportunity to showcase data in a spatial context.",
    },
    {
      name: "panel3",
      title: "What technologies are used for the assignment?",
      content:
        "The assignment involves using popular technologies for web development and data visualization. You'll likely work with libraries or frameworks such as React.js, D3.js, or other tools that facilitate the creation of interactive and informative visualizations.",
    },
    {
      name: "panel4",
      title: "How can I approach the 'Line Chart' part of the assignment?",
      content:
        "For the 'Line Chart' section, you'll need to represent data trends over time. Consider selecting a dataset that has temporal information, such as stock prices, weather data, or user activity. Utilize the chosen technology to create an interactive line chart that effectively communicates the temporal patterns in the data.",
    },
    // Add more FAQs as needed
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        flexDirection="column"
      >
        <Header title="FAQ" subtitle="Data Visualization Assignment" />

        <Box>
          {faq.map((ele) => (
            <AccordionComp
              key={ele.name}
              name={ele.name}
              title={ele.title}
              content={ele.content}
              expand={expand}
              handleChange={handleChange}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Faq;
