import { createStyles, Text, Container, Stack, Grid } from '@mantine/core';


const data1 = [
    {
        "title": "Get in Touch",
        "links": [
            {
                "label": "FRUTRI RETAIL PVT LTD.",
                "link": "#"
            },
            {
                "label": "Web : www.megafpo.com",
                "link": "#"
            },
            {
                "label": "Email: help(@)megafpo.com",
                "link": "#"
            },
            {
                "label": "Phone :+91 8090105010",
                "link": "#"
            }
        ]
    },
    {
        "title": "Address",
        "links": [
            {
                "label": `MEGAFPO, FRUTRI
                          
                          `,
                "link": "#"
            },
            {
                "label": "B-2, Kisan Bazar, Sector 20",
                "link": "#"
            },
            {
                "label": "Panchkula 134113 HR INDIA",
                "link": "#"
            },
           
        ]
    },
]

const data2 = [

    {
        "title": "Home",
        "links": [
            {
                "label": "About us",
                "link": "#"
            },
            {
                "label": "Services",
                "link": "#"
            },
            {
                "label": "Privacy",
                "link": "#"
            },
            {
                "label": "Terms and Conditions",
                "link": "#"
            }
        ]
    }
]
const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        //  backgroundColor: theme.colors.dark[6],
        borderTop: `1px solid ${theme.colors.dark[5]}`,

    },

    inner: {
        display: 'flex',
        justifyContent: 'space-around',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
    },

    wrapper: {
        width: 260,

    },

    link: {
        display: 'block',
        color: theme.colors.dark[7],
        fontSize: theme.fontSizes.xl,
        marginTop: -5,
        marginBottom: -5,
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    adresses: {
        display: 'block',
        color: theme.colors.dark[7],
        fontSize: theme.fontSizes.xl,
        marginTop: -5,
        marginBottom: -5,
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors.dark[4]}`,
        // width:"100px",
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

}));



const NewFooter = () => {
    const { classes } = useStyles();

    const linksInFooter = data2.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            
            <Grid.Col sm={4}>
                <Stack
                    key={group.title}
                    // className={classes.wrapper}
                    align="center"
                    mb="xl"
                >
                    <Text
                        className={classes.title}
                        // component="a"
                        href="/"
                       // onClick={(event) => event.preventDefault()}
                    >
                        {group.title}
                    </Text>
                    {links}
                </Stack>
            </Grid.Col>
        );
    });

    const adresses = data1.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.adresses}
            >
                {link.label}
            </Text>
        ));

        return (
            
            <Grid.Col sm={4}>
                <Stack
                    key={group.title}
                    // className={classes.wrapper}
                     align="center"
                    ml="xl"
                    mb="xl"
                >
                    <Text className={classes.title}>{group.title}</Text>
                    {links}
                </Stack>
            </Grid.Col>
        );
    });
    return (
        <div className={classes.footer}>
            <Grid>
                {adresses}
                {linksInFooter}
            </Grid>
            <Container
                className={classes.afterFooter}
            >
                <Text  size="sm">
                    © 2023 FRUTRI RETAIL PVT LTD. 
                </Text>
            </Container>
        </div>
    )
}

export default NewFooter
