import {IconType} from "react-icons";
import {Badge, Box, Circle, Flex, Icon, Text} from "@chakra-ui/react";
import {ReactNode} from "react";

interface StatCardProps {
    icon: ReactNode,
    value: string,
    change: string,
    label: string,
}


export function StatCard({icon, value, change, label}: StatCardProps) {
    return (
        <Flex layerStyle="surface.cardOutlined" gap="4" px="4" py="4">
        <Circle size="40px" overflow="hidden" bg="bg.action">
            <Icon> {icon} </Icon>
        </Circle>

        <Box>
            <Flex direction="row" justify="flex-start" gap="2">
            <Text textStyle="body.md.medium.salt" whiteSpace="nowrap">{value}</Text>
            <Badge size="sm" whiteSpace="nowrap">{change}</Badge>
            </Flex>

            <Text textStyle="body.sm.salt" color="fg.placeholder" whiteSpace="nowrap">{label}</Text>

        </Box>

        </Flex>
    )
}

export function StatCardGhost({icon, value, change, label}: StatCardProps) {
    return (
        <Flex layerStyle="surface.cardOutlined" gap="4" px="4" py="4">
        <Circle size="40px" overflow="hidden" bg="bg.action">
            <Icon> {icon} </Icon>
        </Circle>

        <Box>
            <Flex direction="row" justify="flex-start" gap="2">
            <Text textStyle="body.md.medium.salt" whiteSpace="nowrap">{value}</Text>
            <Text textStyle="body.sm.salt" color="fg.placeholder" whiteSpace="nowrap">{change} </Text>
            </Flex>

            <Text textStyle="body.sm.salt" color="fg.placeholder" whiteSpace="nowrap">{label}</Text>

        </Box>

        </Flex>
    )
}
