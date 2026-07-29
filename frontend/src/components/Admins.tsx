import {useAuth} from "../contexts/authContext/AuthContext";
import {useNavigate} from "react-router-dom";
import {Layout as AdminLayout, MenuCell, TableColumnProps, UserCell} from "./usersAdmins/Layout";
import {Badge} from "@chakra-ui/react";

interface AdminRow {
    id: number,
    name: string,
    email: string,
    avatar: string,
    totalEarnings: number,
    totalProjects: number,
    status: string,
    type: string,
}

const statusVariant: {[k: string]: string} = {
    "Active": "success",
    "Disabled": "danger",
}

const typeVariant: {[k: string]: string} = {
    "Remote": "brand",
    "In Person": "success",
}

const AdminsColumns:TableColumnProps<AdminRow>[] = [
    {
        header: "Admin",
        render: (a) => <UserCell name={a.name} email={a.email} avatar={a.avatar} />,
    },
    {
        header: "Total Earnings",
        render: (a) => `€${a.totalEarnings}`,
    },
    {
        header: "Total Projects",
        render: (a) => a.totalProjects,
    },
    {
        header: "Status",
        render: (a) => (
            <Badge borderRadius="xl" variant={statusVariant[a.status]}>{a.status}</Badge>
        ),
    },
    {
        header: "Type",
        render: (a) => (
            <Badge borderRadius="xl" variant={typeVariant[a.type]} >{a.type}</Badge>
        ),
    },
    {
        header: "",
        render: (a) => (<MenuCell/>),
    },

]

const AdminsRows: AdminRow[] = [
    { id: 1, name: "Phillip Gouse",  email: "janainagalindo@sportsillustrated.com",  avatar: "/images/admins/avatar1.png", totalEarnings: 200, totalProjects: 2, status: "Active",   type: "Remote" },
    { id: 2, name: "Allison Bergson", email: "janainagalindo@sportsillustrated.com", avatar: "/images/admins/avatar2.png", totalEarnings: 200, totalProjects: 2, status: "Active",   type: "Remote" },
    { id: 3, name: "Craig Bergson",   email: "janainagalindo@sportsillustrated.com", avatar: "/images/admins/avatar3.png", totalEarnings: 200, totalProjects: 2, status: "Active",   type: "In Person" },
    { id: 4, name: "Adison Franci",   email: "janainagalindo@sportsillustrated.com", avatar: "/images/admins/avatar4.png", totalEarnings: 200, totalProjects: 2, status: "Disabled", type: "In Person" },
    { id: 5, name: "Wilson Rosser",   email: "janainagalindo@sportsillustrated.com", avatar: "/images/admins/avatar5.png", totalEarnings: 200, totalProjects: 2, status: "Active",   type: "In Person" },
];



export default function Admins() {

    // return (
    //     <>
    //  <h3> Welcome to the Users Page </h3>
    //  <button onClick={
    //      () => {auth.logout(); navigate("/login")}
    //  }> Logout </button>
    // </>
    //     )

    return (
        <AdminLayout title="Admins" addLabel="Add New Admin" tableColumns={AdminsColumns} rows={AdminsRows}/>
    )
}