import {ReactNode} from "react";
import {Badge, Box, Button, Flex, Icon, Menu, Portal, Text} from "@chakra-ui/react";
import {Check, ChevronDown} from "lucide-react";

interface ChartCardProps {
    title: string,
    subtitle: string,
    period: Period,
    periods: Period[]
    children: ReactNode,
}

export type Period = 'This Week' | 'This Month' | 'This Year' | 'Last Week' | 'Last Month' | 'Last Year'

interface periodSelectProps {
    period: Period,
    periods: Period[]
    onChange: (period: Period) => void
}

function PeriodSelect({period, onChange, periods}: periodSelectProps) {
    return (
        <Menu.Root onSelect={(e: { value: string; }) => onChange(e.value as Period)}>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
                    <Text textStyle="body.xs.table">{period}</Text>
                    <Menu.Indicator
                        boxSize="4"
                        transition="transform 0.2s"
                        _open={{transform: "rotate(180deg)"}}
                    >
                        <ChevronDown/>
                    </Menu.Indicator>
                </Button>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content minW="var(--reference-width)" p="1">

                        <Menu.RadioItemGroup
                            value={period}
                            onValueChange={(e) => onChange(e.value as Period)}
                        >
                            {periods.map((p) => (
                                <Menu.RadioItem key={p} value={p}>
                                    <Menu.ItemIndicator>
                                        <Box w="3" display="flex" justifyContent="center">
                                                <Check size={20}/>
                                        </Box>
                                    </Menu.ItemIndicator>
                                    <Menu.ItemText textStyle="body.xs.table">{p}</Menu.ItemText>
                                </Menu.RadioItem>
                            ))}
                        </Menu.RadioItemGroup>

                        {/*{*/}
                        {/*    periods.map((p) => (*/}
                        {/*        <Menu.Item key={p}> <Text textStyle="body.xs.table">{p}</Text> </Menu.Item>*/}
                        {/*    ))*/}
                        {/*}*/}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}


export default function ChartCard({title, subtitle, period, periods, children}: ChartCardProps) {
    const props: periodSelectProps = {
        period, periods, onChange: (p) => {
        }
    }

    return (
        <Flex direction="column" layerStyle="surface.cardOutlined" px={4} pt={6} pb={2} gap={5}>
            <Flex justify="space-between" alignItems="flex-start">
                <Flex direction="column">
                    <Text textStyle="body.lg.medium.salt"> {title} </Text>
                    <Text textStyle="body.sm.salt" color="fg.placeholder"> {subtitle} </Text>
                </Flex>
                <PeriodSelect {...props}/>
            </Flex>

            {children}
        </Flex>
    )
}