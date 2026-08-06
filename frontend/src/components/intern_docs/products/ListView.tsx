import {ProductProps} from "./types"
import {Circle, Flex, Grid, GridItem, Image, SimpleGrid, Text, Square, Button, Box, Badge} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@chakra-ui/react"

const statusMap: { [k: string]: string } = {
    'Removed': 'danger',
    'Reminder Sent': 'yellow',
}


export default function ListView({products}: { products: ProductProps[] }) {
    return (
        <SimpleGrid columns={1} gap={6}>
            {
                products.map((product, index) => (
                    <GridItem key={product.id}>
                        <Flex layerStyle="surface.card" direction={{base: 'column', lg: 'row'}}
                              justifyContent={{base: "space-between", lg: "space-between"}} alignItems={{lg: "center"}} pl={4} pr={6} py={4}
                        gap={{base:4, lg:0}}>
                            <Flex gap={4} alignItems="center">
                                <Box position="relative" borderRadius="xl" overflow="hidden" w="68px" h="68px">
                                    <Image
                                        src={product.image} alt=""
                                        boxSize="full"          // 同时设置 w 和 h，填满内容区（84 - 12*2 = 60px）
                                        // borderRadius="xl"     // 图片自己裁圆，不依赖外层
                                        objectFit="cover"       // 有了宽高，cover 才生效：裁切填满、不变形
                                    />
                                </Box>

                                <Flex direction="column">
                                    <Text textStyle="body.md.medium.relaxed.normal"> {product.title} </Text>
                                    <Text textStyle="body.xs.regular.relaxed.normal"
                                          color="fg.placeholder"> {product.link} </Text>
                                </Flex>

                                <Badge variant={statusMap[product.status]} top="4" left="4">
                                    {product.status}
                                </Badge>
                            </Flex>

                            <Flex gap={4}>
                                <Button asChild variant="solid">
                                    <Link href={"/source"}> Source </Link>
                                </Button>

                                <Button>
                                    <RouterLink to={"/product"}> View Details </RouterLink>
                                </Button>

                            </Flex>
                        </Flex>
                    </GridItem>
                ))
            }
        </SimpleGrid>
    )
}

