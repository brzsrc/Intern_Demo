import {Flex, Input, InputGroup, Table} from "@chakra-ui/react";
import {LuSearch} from "react-icons/lu";
import {ReactNode, useState} from "react";


export interface TableColumnProps<T> {
    header: string,
    // rows: (lists: T[]) => [],
    render: (row: T) => ReactNode,
}

export interface LayoutProps<T> {
    header: ReactNode,
    // backLabel?: ReactNode,
    tableColumns: TableColumnProps<T>[],
    rows: T[],
    searchBar: ReactNode
}

export function matchesSearch(q: string, ...fields: (string | null | undefined)[]) {
    const s = q.trim().toLowerCase()
    if (!s) return true                      // 空搜索 = 全显示
    return fields.some(f => f?.toLowerCase().includes(s))
}

export function SearchBar({placeholder, value, onChange}: {
    placeholder: string
    value: string
    onChange: (v: string) => void
}) {
    return (
        <InputGroup startElement={<LuSearch/>}>
            <Input w={400} h={12} textStyle="body.sm.regular"
                   placeholder={placeholder} value={value}
                   onChange={(e) => onChange(e.target.value)}/>
        </InputGroup>
    )

}

export function Layout<T>({header, tableColumns, rows, searchBar}: LayoutProps<T>) {

    return (
        <Flex direction="column" gap="6" p="6">
            {header}

            <Flex layerStyle="surface.cardOutlined" direction="column" gap={4} px={5} py={6}>
                {searchBar}

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
                                // if (rows)
                                rows.map(row => (
                                    <Table.Row>
                                        {tableColumns.map(col => (
                                            <Table.Cell key={col.header}>
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