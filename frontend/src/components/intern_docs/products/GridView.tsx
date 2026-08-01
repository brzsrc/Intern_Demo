import {ProductProps} from "./types"
import {Circle, Flex, Grid, GridItem, Image, SimpleGrid, Text, Square, Button, Box, Badge} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@chakra-ui/react"

export default function GridView({products}: { products: ProductProps[] }) {
    return (
        <SimpleGrid columns={{xl: 4, lg: 3, md:2}} gap={4}>

            {
                products.map((product) => {
                    {
                        return (
                            <GridItem key={product.id}>
                            <Flex direction="column" justify="flex-between" px={4} py={4} gap={3} layerStyle="surface.card">
                                <Box position="relative" borderRadius="xl" overflow="hidden" w="full" aspectRatio={1}>
                                    <Image
                                        src={product.image} alt=""
                                        boxSize="full"          // 同时设置 w 和 h，填满内容区（84 - 12*2 = 60px）
                                        objectFit="cover"       // 有了宽高，cover 才生效：裁切填满、不变形
                                    />
                                    <Badge variant="subtle" position="absolute" top="3" left="3">
                                        {product.status}
                                    </Badge>
                                </Box>

                                <Flex direction="column">
                                    <Text textStyle="body.md.medium.relaxed.salt"> {product.title} </Text>
                                    <Text textStyle="body.xs.medium.relaxed.normal" color="fg.placeholder"> {product.link} </Text>
                                </Flex>

                                <Flex direction="row" justify="space-between">
                                    <Button asChild>
                                        <RouterLink to={"/product"}> View Details </RouterLink>
                                    </Button>

                                    <Button asChild variant="solid">
                                        <Link href={"/source"}> Source </Link>
                                    </Button>
                                </Flex>
                            </Flex>

                        </GridItem>)
                    }
                })
            }


        </SimpleGrid>
    )
}