import {
    Circle,
    Flex,
    Grid,
    GridItem,
    Image,
    SimpleGrid,
    Text,
    Square,
    Button,
    Box,
    Badge,
    InputGroup, Input, Table, TableScrollArea, Menu, Portal, Dialog
} from "@chakra-ui/react";
import {Plus} from "lucide-react";
import {LuEllipsisVertical, LuSearch} from "react-icons/lu";
import {ReactNode, useRef, useState} from "react";


export interface TableColumnProps<T> {
    header: string,
    // rows: (lists: T[]) => [],
    render: (row: T) => ReactNode,
}

export interface LayoutProps<T> {
    title: string,
    addLabel: string,
    tableColumns: TableColumnProps<T>[],
    rows: T[],
}

export function MenuCell(): {} {
    return (
        <Menu.Root>
            <Menu.Trigger cursor="pointer">
                {/*<Button variant="ghost" size="sm">*/}
                <LuEllipsisVertical/>
                {/*</Button>*/}
            </Menu.Trigger>


            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}


export function UserCell({name, email, avatar}: { name: string, email: string, avatar: string }) {
    return (
        <Flex gap="3">
            <Circle size="40px" overflow="hidden">
                <Image src={avatar} alt="" aspectRatio="1" objectFit="cover"/>
            </Circle>

            <Flex direction="column">
                <Text textStyle="body.sm.medium"> {name} </Text>
                <Text fontSize="xs" color="fg.placeholder"> {email}</Text>
            </Flex>
        </Flex>
    )
}

export function Layout<T>({title, addLabel, tableColumns, rows}: LayoutProps<T>) {
    return (
        <Flex direction="column" gap="6" p="6">
            <Flex justify="space-between" alignItems="center">
                <Text textStyle="body.2xl.medium.salt"> {title} </Text>
                <Button> <Plus/>{addLabel} </Button>
            </Flex>

            <Flex layerStyle="surface.cardOutlined" direction="column" gap={4} px={5} py={6}>
                <InputGroup startElement={<LuSearch/>}>
                    <Input w={400} h={12} textStyle="body.sm.regular" placeholder="Search by name or email"/>
                </InputGroup>

                <Table.ScrollArea borderWidth="1px" rounded="xl">
                    <Table.Root showColumnBorder borderWidth="1px" borderRadius="xl">
                        <Table.Header>
                            <Table.Row bg="bg.subtle">
                                {
                                    tableColumns.map(col => (
                                        <Table.ColumnHeader
                                            color="neutral.60" key={col.header} textStyle="body.sm.regular.relaxed">
                                            {col.header}
                                        </Table.ColumnHeader>
                                    ))
                                }
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                rows.map(row => (
                                    <Table.Row>
                                        {tableColumns.map(col => (
                                            <Table.Cell>
                                                {col.render(row)}
                                            </Table.Cell>
                                        ))}
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Flex>

        </Flex>

    )
}