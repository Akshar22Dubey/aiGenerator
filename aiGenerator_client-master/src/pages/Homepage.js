import React from "react";
import { Box, Typography, Card, Stack, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";

const cardsData = [
  {
    title: "Text Generation",
    subtitle: "Summarize long text into short sentences",
    icon: DescriptionRounded,
    route: "/summary",
  },
  {
    title: "Paragraph Generation",
    subtitle: "Generate Paragraph with words",
    icon: FormatAlignLeftOutlined,
    route: "/paragraph",
  },
  {
    title: "AI ChatBot",
    subtitle: "Chat With AI Chatbot",
    icon: ChatRounded,
    route: "/chatbot",
  },
  {
    title: "Javascript Converter",
    subtitle: "Translate English to JavaScript code",
    icon: CodeRounded,
    route: "/js-converter",
  },
  // {
  //   title: "AI SCIFI Images",
  //   subtitle: "Generate Scifi images",
  //   icon: ImageRounded,
  //   route: "/scifi-image",
  // },
];

const Homepage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={5}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              onClick={() => navigate(card.route)}
              sx={{
                boxShadow: 4,
                borderRadius: 3,
                height: 200,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                },
                "&:hover svg": {
                  transform: "rotate(360deg)",
                },
              }}
            >
              <card.icon
                sx={{
                  fontSize: 80,
                  color: "#fff",
                  mt: 2,
                  ml: 2,
                  transition: "transform 0.5s",
                }}
              />
              <Stack p={3} pt={0}>
                <Typography fontWeight="bold" variant="h5">
                  {card.title.toUpperCase()}
                </Typography>
                <Typography variant="h6">
                  {card.subtitle}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Homepage;
