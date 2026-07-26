import {ReactNode} from "react";
import {Badge, Box, Button, Circle, Flex, Icon, Image, Square, Text, VStack} from "@chakra-ui/react";
import {FiUser} from "react-icons/fi";
import {Link as RouterLink} from "react-router-dom";

interface AdminCardProps {
    name: string,
    notices: string
}


export function AdminCard({name, notices}: AdminCardProps) {

    return (
        <Flex direction="column" layerStyle="surface.cardOutlined" px={5} py={6} gap={4}>

            <Flex direction="row" justify="space-between">
                <Text textStyle="body.lg.medium.relaxed.salt"> Top Admin </Text>
                <RouterLink to={"/users"}>
                    <Text textStyle="body.sm.medium.normal">View all</Text>
                </RouterLink>
            </Flex>

            <Flex justify="space-between" gap={6}>
                <Flex direction="column" justify="space-between" alignItems="center">
                    <Circle size="84px" bg="bg.gray100" p="1">
                        <Image
                            src="/images/dashboard/avatar.png"
                            alt=""
                            boxSize="full"          // 同时设置 w 和 h，填满内容区（84 - 12*2 = 60px）
                            borderRadius="full"     // 图片自己裁圆，不依赖外层
                            objectFit="cover"       // 有了宽高，cover 才生效：裁切填满、不变形
                        />
                    </Circle>
                    <Text textStyle="body.xs.medium.relaxed.normal"> {name} </Text>
                    <Text textStyle="body.xxs.medium.relaxed.normal" color="fg.placeholder"> Admin </Text>
                </Flex>

                <Flex direction="column" gap={3} flex={1}>
                    <Flex borderRadius="sm" bg="bg.subtle" justifyContent="space-between" gap={3} px={4} py={3} alignItems="center">
                        <Text textStyle="body.xs.medium.relaxed.normal" color="fg.placeholder" whiteSpace="nowrap"> Notices Reviewed: </Text>
                        <Text textStyle="body.md.semibold.relaxed.salt" color="fg" whiteSpace="nowrap">  {notices} </Text>
                    </Flex>
                    <Button asChild>
                        <RouterLink to={"/users"}> View Details </RouterLink>
                    </Button>
                </Flex>
            </Flex>


        </Flex>
    )

}