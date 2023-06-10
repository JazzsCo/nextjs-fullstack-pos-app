import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";

const sidebarMenuItems = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/admin/orders",
  },
  {
    id: 2,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/admin/menus",
  },
  {
    id: 4,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/admin/menu-categories",
  },
  {
    id: 6,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/admin/addon-categories",
  },
  {
    id: 5,
    label: "Addons",
    icon: <LunchDiningIcon />,
    route: "/admin/addons",
  },

  // {
  //   id: 5,
  //   label: "Addon Categories",
  //   icon: <LunchDiningIcon />,
  //   route: "/admin/create-addons",
  // },
  {
    id: 6,
    label: "Locations",
    icon: <AddLocationIcon />,
    route: "/admin/locations",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/admin/setting",
  },
];

export default function SideBar() {
  return (
    <Card className="fixed bg-blue-300 h-full w-full max-w-[15rem] rounded-tl-none rounded-bl-none">
      <List className="mt-14">
        {sidebarMenuItems.map((item) => (
          <Link href={item.route} key={item.id}>
            <ListItem>
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.label}
            </ListItem>
          </Link>
        ))}
      </List>
    </Card>
  );
}