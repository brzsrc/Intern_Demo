import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {Button, Flex, Grid, GridItem, Text, SimpleGrid, Image, Icon, Box} from "@chakra-ui/react";
import {LuArchive, LuCoins, LuFileCheck, LuHandCoins, LuUser, LuUsers} from "react-icons/lu";
import {StatCard, StatCardGhost} from "./dashboard/StatCard";
import {Plus} from "lucide-react";
import {UserBarChart} from "./dashboard/BarChart";
import RevenueLineChart from "./dashboard/LineChart";
import ChartCard, {Period} from "./dashboard/ChartCard";
import ListCard, {ListCardProps, ListProps} from "./dashboard/ListCard";
import {AdminCard} from "./dashboard/AdminCard";


export default function Dashboard() {
    const auth = useAuth()
    const navigate = useNavigate()


    const stats = [
        {icon: <LuCoins/>, value: "€500.000", change: "+20%", label: "Yearly Earnings"},
        {icon: <LuHandCoins/>, value: "€800.000", change: "+33%", label: "Revenue"},
        {icon: <LuFileCheck/>, value: "52", change: "+20%", label: "Closed Offers"},
        {icon: <LuArchive/>, value: "125", change: "+20%", label: "Total Affiliates"},
    ];


    const stats_ghost = [
        {icon: <LuCoins/>, value: "€200.00", change: "+20%", label: "Earnings"},
        {icon: <LuFileCheck/>, value: "52", change: "+20%", label: "Closed Offers"},
    ];

    const topUsers: ListProps[] = [
        {label: "Rose Meadows", company: "Company name", listing: "2464", color: "green"},
        {label: "Madden Esparza", company: "Company name", listing: "6345", color: "red"},
        {label: "Edison Norman", company: "Company name", listing: "9815", color: "purple"},
        {label: "Terrance Conner", company: "Company name", listing: "9245", color: "blue"},
        {label: "Ada Kim", company: "Company name", listing: "1102", color: "orange"},
    ];

    const topSellers: ListProps[] = [
        {label: "Rose Meadows", company: "Company name", listing: "2464", color: "green"},
        {label: "Madden Esparza", company: "Company name", listing: "6345", color: "red"},
        {label: "Edison Norman", company: "Company name", listing: "9815", color: "purple"},
        {label: "Terrance Conner", company: "Company name", listing: "9245", color: "blue"},
        {label: "Ada Kim", company: "Company name", listing: "1102", color: "orange"},
    ];


    const userPeriods: Period[] = ['This Week', 'This Month', 'This Year', 'Last Week', 'Last Month', 'Last Year']
    const revenuePeriods: Period[] = ['This Week', 'This Month', 'This Year', 'Last Week', 'Last Month', 'Last Year']
    // return (
    //     <>
    //         <h3> Welcome to the Dashboard </h3>
    //         <button onClick={() => {
    //             auth.logout();
    //             navigate("/login");
    //         }}> Logout
    //         </button>
    //     </>
    // )

    return (
        <Flex direction="column" gap="6" p="6">
            <Flex justify="space-between" alignItems="center">
                <Text textStyle="body.2xl.medium.salt"> Dashboard </Text>
                <Button> <Plus/> Add Revenue </Button>
            </Flex>

            <Grid templateColumns={{sm: "1fr", xl: "1fr 1fr"}}
                  gap={6}>
                <GridItem>
                    <Flex layerStyle="surface.cardOutlined" alignItems="center" justifyContent="flex-start"
                          pr={10} h="100%" gap={{sm: 8, xl: 2}}>
                        <Box borderRadius="xl" overflow="hidden" w="100%" maxW={{sm: "150px", xl: "250px"}}>
                            <Image
                                src="/images/dashboard/readyStart.png"
                                alt=""
                                h="100%"
                                aspectRatio="1"
                                objectFit="cover"
                            />
                        </Box>
                        <Flex direction="column">
                            <Text textStyle="body.lg.medium.salt">
                                Ready to get started?
                            </Text>
                            <Text textStyle="body.sm.salt" color="fg.placeholder">
                                Take advantage of our platform and start onboarding affiliates today!
                            </Text>
                        </Flex>
                    </Flex>
                </GridItem>

                <GridItem>
                    <Grid templateColumns={{sm: "1fr", md: "1fr 1fr", xl: "1fr 1fr"}}
                          gap="4" h="100%" w="100%">
                        {
                            stats.map((item) => {
                                return (

                                    <GridItem key={item.label}>
                                        <StatCard {...item} />
                                    </GridItem>
                                )
                            })
                        }
                    </Grid>
                </GridItem>


            </Grid>

            <SimpleGrid columns={{xl: 2}} gap={6}>
                <ChartCard
                    title="User Overview"
                    subtitle="+25% compared to last 30 days"
                    period="This Week"
                    periods={userPeriods}
                >
                    {
                        <Grid templateColumns="1fr 1fr" gap="4">
                            <GridItem colSpan={2}>
                                <UserBarChart/>
                            </GridItem>

                            {stats_ghost.map((item) => {
                                return (
                                    <GridItem key={item.label}>
                                        <StatCardGhost {...item} />
                                    </GridItem>
                                )
                            })}
                        </Grid>
                    }
                </ChartCard>

                <ChartCard
                    title="Revenue Overview"
                    subtitle="+25% compared to last 30 days"
                    period="This Year"
                    periods={revenuePeriods}
                > <RevenueLineChart/> </ChartCard>
            </SimpleGrid>

            <SimpleGrid columns={{xl: 3, md: 2}} gap={6}>
                <ListCard title="Top 5 Users" list={topUsers}/>
                <ListCard title="Top 5 Sellers" list={topSellers}/>
                <AdminCard name="Carl Meadows" notices="23,353"/>
            </SimpleGrid>
        </Flex>

    )


}