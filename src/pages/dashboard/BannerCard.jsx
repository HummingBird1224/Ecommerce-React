import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const BannerCard = (props) => {

    const {
        image,
        alt,
        title,
        content,
        href,
        buttonContent

    } = props
    const theme = useTheme();
    return (
        <Grid item  >
            <Card sx={{
                display: 'flex',
                /* flexDirection:"row",
                alignItems:"center",
                justifyContent:"center" */
                /* backgroundImage: 'url("/farmer.jpg")',
                backgroundSize: "cover" */
                //  minHeight:"100px"
               // width:"600px"
               boxShadow: "5"
            }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // margin:"30px" 
                    }}>
                    <CardContent sx={{ flex: '1 0 auto', width: 200 }}>
                        <Typography
                            component="div"
                            variant="h5"
                            align="center"
                            mb={2}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            align="center"
                        >
                            {content}
                        </Typography>
                    </CardContent>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center"
                        //  pl: 1,
                        //  pb: 1
                    }}
                    >
                        <Link to={href} style={{ textDecoration: "none" }}>
                            <Button
                                variant={"contained"}
                                size={"large"}
                                sx={
                                    {
                                        color: "white",
                                        fontWeight: "bold",
                                        borderRadius: "100px",
                                       marginBottom:"15px"
                                    }
                                }
                                color="primary"
                            >
                                {buttonContent}
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <CardMedia
                    // component="img"
                    sx={{ width: 150, height: 125 }}
                    image={image}
                    alt={alt}
                />
            </Card>
        </Grid>
    )
}

export default BannerCard
