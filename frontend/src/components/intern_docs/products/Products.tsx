import {ProductProps} from "./types"
import {Circle, Flex, Grid, GridItem, Image, SimpleGrid, Text, Square, Button, Box, Badge} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@chakra-ui/react"
import GridView from "./GridView";
import ListView from "./ListView";
import {useSearchParams} from "react-router-dom";


const products: ProductProps[] = [
    {
        id: 1,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product1.png",
        status: "Removed"
    },
    {
        id: 2,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product2.png",
        status: "Removed"
    },
    {
        id: 3,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product3.png",
        status: "Reminder Sent"
    },
    {
        id: 4,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product4.png",
        status: "Removed"
    }, {
        id: 5,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product5.png",
        status: "Removed"
    },
    {
        id: 6,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product6.png",
        status: "Removed"
    },
    {
        id: 7,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product7.png",
        status: "Reminder Sent"
    },
    {
        id: 8,
        title: "Product title goes here",
        link: "https://yourproducturlgoeshere1122.com",
        image: "/images/products/product8.png",
        status: "Removed"
    },
];

type ViewMode = "list" | "grid";


export default function Products() {

    const [urlSearchParams, setURLSearchParams] = useSearchParams()

    // console.log(urlSearchParams)

    const viewMode: ViewMode = urlSearchParams.get("view") === "list" ? "list" : "grid"

    return (
        <Flex direction="column" justify="space-between" px={6} py={7} gap={6}>
            <Flex justify="space-between">
                <Text textStyle="body.2xl.medium.salt"> Products </Text>


                {
                    viewMode === "grid" ?
                        <Flex gap={2}>
                            <Badge variant="neutral" px={6}>
                                Grid View
                            </Badge>
                            <Button px={6} onClick={() => (setURLSearchParams({"view": "list"}))}>
                                List View
                            </Button>
                        </Flex> :
                        <Flex gap={2}>
                            <Button px={6}
                                    onClick={() => (setURLSearchParams({"view": "grid"}))}>
                                Grid View
                            </Button>
                            <Badge variant="neutral" px={6}>
                                List View
                            </Badge>
                        </Flex>
                }
            </Flex>

            {viewMode === "grid" ? <GridView products={products}/> : <ListView products={products}/>}
        </Flex>
    )
}