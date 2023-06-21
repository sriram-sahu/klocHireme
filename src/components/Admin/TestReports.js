import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import Cookies from "js-cookie";

const TestReports = () => {
  const navigate = useNavigate();
  const testDetails = [
    {
      name: "Fresher QA Test",
      id: "fresher_qa_test",
      url: "https://www.fitaacademy.in/includes/assets/img/blog/software-testing.jpg",
      sheet_id: "1ersnrT9aiUcVrQXMAmoZhbO55jqrD_IYiy0fqn_mZH0",
      sheet_name: "QA_Test",
    },
    {
      name: "Full Stack Developer Test",
      id: "fullstack_developer_test",
      url: "https://assets.website-files.com/6239c24c282f5581285fbbb3/6357613e0b897b701b563c7a_full%20stack%20developer%20assessment%20test.jpg",
    },
    {
      name: "Fresher Python Test",
      id: "fresher_python_test",
      url: "https://st3.myideasoft.com/idea/ct/82/myassets/blogs/python-ne-icin-kullanilir.jpg",
    },
    {
      name: "Fresher Java Test",
      id: "fresher_java_test",
      url: "https://i0.wp.com/www.techbooky.com/wp-content/uploads/2019/10/java-logo.png",
    },
    {
      name: "Fresher Test",
      id: "fresher_test",
      url: "https://img.freepik.com/premium-vector/man-with-laptop-studying-working-concept_113065-167.jpg",
    },
    {
      name: "Frontend Freshers Assessment",
      id: "frontend_fresher_test",
      url: "https://staticlearn.shine.com/l/m/images/blog/Front--end-developer.png",
    },
    {
      name: "Shopify Developer Test",
      id: "shopify_developer_test",
      url: "https://colorlib.com/wp/wp-content/uploads/sites/2/free-shopify-themes.jpg",
    },
    {
      name: "MERN Developer - Junior",
      id: "mern_developer_junior",
      url: "https://www.technology4u.in/wp-content/uploads/2021/07/epv55hgtsfi8csprpj9u.jpg",
    },
    {
      name: "MERN Developer - Intermediate",
      id: "mern_developer_intermediate",
      url: "https://www.bigscal.com/wp-content/uploads/2022/09/Features-of-Mern-stack-development-services-You-Should-Know.png",
    },
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/notFound");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h1>Test Reports</h1>
        <div className='test-container'>
          {testDetails.map((each, index) => {
            return (
              <Card sx={{ width: 345, margin: "20px" }} key={index}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='140'
                    image={each.url}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {each.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  sx={{ margin: "20px" }}
                  variant='contained'
                  onClick={() =>
                    navigate(`/reports/${each.id}`, { state: each })
                  }
                >
                  View
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestReports;
