import {ReactNode} from "react";
import {Button, Flex, Icon, Square, Text} from "@chakra-ui/react";
import {FiUser} from "react-icons/fi";
import {Link as RouterLink} from "react-router-dom";

export interface ListProps {
    color: string,
    label: string,
    company: string,
    listing: string
}

export interface ListCardProps {
    title: string,
    list: ListProps[],
}

function ListItem({color, label, company, listing}: ListProps) {

    return (
        <Flex justify="space-between">
            <Flex gap={2}>
                <Square size="10" bg={`${color}.50`} borderRadius="xl">
                    <Icon boxSize="5" color={`${color}.500`}>
                        <FiUser/>
                    </Icon>
                </Square>

                <Flex direction="column">
                    <Text textStyle="body.xs.medium.relaxed.normal"> {label} </Text>
                    <Text textStyle="body.xxs.medium.relaxed.normal" color="fg.placeholder"> {company} </Text>
                </Flex>
            </Flex>
            <Text textStyle="body.sm.medium.normal" color="fg.placeholder"> Listing #{listing} </Text>
        </Flex>

    )

}

export default function ListCard({title, list}: ListCardProps) {
    return (
        <Flex direction="column" layerStyle="surface.cardOutlined" px={5} py={6} gap={4}>
            <Flex direction="row" justify="space-between">
                <Text textStyle="body.lg.medium.relaxed.salt"> {title} </Text>
                <RouterLink to={"/users"}>
                    <Text textStyle="body.sm.medium.normal">View all</Text>
                </RouterLink>
            </Flex>

            {list.map((item) => {
                    return (
                        <Flex key={item.label} direction="column" justify="space-between">
                            <ListItem {...item}/>
                        </Flex>
                    )
                }
            )}
        </Flex>
    )
}