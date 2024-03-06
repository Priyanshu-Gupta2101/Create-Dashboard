import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useState } from "react";
import { token } from "../theme";

const AccordionComp = ({ name, title, content, handleChange, expand }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  return (
    <Accordion
      expanded={expand === name}
      onChange={(e, isExpanded) => handleChange(isExpanded, name)}
      style={{
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
      }}
    >
      <AccordionSummary
        id={`${name}-header`}
        aria-controls={`${name}-header`}
        expandIcon={<ExpandMoreOutlinedIcon />}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          backgroundColor: colors.primary[500],
        }}
      >
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionComp;
