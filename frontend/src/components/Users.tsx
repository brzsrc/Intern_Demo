import {useAuth} from "../contexts/authContext/AuthContext";
import {useNavigate} from "react-router-dom";
import {Layout as UserLayout, MenuCell, TableColumnProps, UserCell} from "./usersAdmins/Layout";
import {Badge} from "@chakra-ui/react";

interface UserRow {
    id: string;
    name: string;
    email: string;
    avatar: string;
    projectName: string;
    revenue: number;
    status: string;
}

const statusVariant: {[k: string]: string} = {
    "In Negotiation": "brand",
    "Closed - Won": "success",
    "Closed - Lost": "danger",
}

const UsersColumns:TableColumnProps<UserRow>[] = [
    {
        header: "User",
        render: (a) => <UserCell name={a.name} email={a.email} avatar={a.avatar} />,
    },
    {
        header: "Project Name",
        render: (a) => a.projectName,
    },
        {
        header: "Project Revenue",
        render: (a) => `€${a.revenue}`,
    },
    {
        header: "Status",
        render: (a) => (
            <Badge borderRadius="xl" variant={statusVariant[a.status]}>{a.status}</Badge>
        ),
    },
    {
        header: "",
        render: (a) => (<MenuCell/>),
    },

]

const UsersRows: UserRow[] = [
    { id: "1", name: "Phillip Gouse",   email: "janainagalindo@sportsillustrated.com", avatar: "/images/users/avatar1.png", projectName: "Project Name", revenue: 200, status: "In Negotiation" },
    { id: "2", name: "Allison Bergson", email: "janainagalindo@sportsillustrated.com", avatar: "/images/users/avatar2.png", projectName: "Project Name", revenue: 200, status: "In Negotiation" },
    { id: "3", name: "Craig Bergson",   email: "janainagalindo@sportsillustrated.com", avatar: "/images/users/avatar3.png", projectName: "Project Name", revenue: 200, status: "Closed - Won" },
    { id: "4", name: "Adison Franci",   email: "janainagalindo@sportsillustrated.com", avatar: "/images/users/avatar4.png", projectName: "Project Name", revenue: 200, status: "Closed - Lost" },
    { id: "5", name: "Wilson Rosser",   email: "janainagalindo@sportsillustrated.com", avatar: "/images/users/avatar5.png", projectName: "Project Name", revenue: 200, status: "Closed - Won" },
];




export default function Users() {
    const auth = useAuth()
    const navigate = useNavigate()

    // return (
    //     <>
    //  <h3> Welcome to the Users Page </h3>
    //  <button onClick={
    //      () => {auth.logout(); navigate("/login")}
    //  }> Logout </button>
    // </>
    //     )

    return (
        <UserLayout title="Users" addLabel="Add New User" tableColumns={UsersColumns} rows={UsersRows}/>
    )
}