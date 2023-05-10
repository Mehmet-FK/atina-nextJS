import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import NfcIcon from "@mui/icons-material/Nfc";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import logo from "@/app/assets/attensam-logo.svg";
import { Avatar, Button, Paper, Tooltip, Typography } from "@mui/material";
import TapAndPlayOutlinedIcon from "@mui/icons-material/TapAndPlayOutlined";
// import ErrorModal from "../modals/ErrorModal";
// import Loading from "../Loading";
import Link from "next/link";
import { dashboardStyles } from "@/styles/dashboard_styles";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import useAtinaCalls from "@/app/hooks/useAtinaCalls";
// import { dashboardStyles } from "@/app/styles/dashboard_styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [session, setSession] = React.useState({});

  const { darkMode } = useSelector((state) => state.settings);

  // const { getUsersData } = useAtinaCalls();
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getSessionData = async () => {
    const tempSession = await getSession();
    setSession(tempSession);
  };

  React.useEffect(() => {
    getSessionData();
  }, []);

  const drawerList = [
    {
      text: "Benutzer",
      icon: <PeopleAltIcon />,
      nav: "users",
    },
    {
      text: "Mobile Buchungen",
      icon: <LibraryBooksIcon />,
      nav: "mobile-bookings",
    },
    {
      text: "NFC Tags",
      icon: <NfcIcon />,
      nav: "nfc-tags",
    },
    {
      text: "Datensätze",
      icon: <TapAndPlayOutlinedIcon />,
      nav: "items",
    },
    {
      text: "Einstellungen",
      icon: <SettingsIcon />,
      nav: "",
    },
  ];

  return (
    <Paper elevation={0}>
      <Box sx={{ display: "flex" }}>
        {/* <ErrorModal />
        <Loading />
        <CssBaseline /> */}
        <AppBar sx={{ backgroundColor: "red" }} position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={dashboardStyles.logo.wrapper}>
              <Link href={"/"}>
                <img
                  style={dashboardStyles.logo.img}
                  src={"/assets/attensam-logo.svg"}
                  alt="logo"
                />
              </Link>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "15px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={session?.user?.avatarUrl}
                  sx={{ width: "3.5rem", height: "3.5rem" }}
                />

                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                  }}
                >
                  {`${session?.user?.userInfo?.firstname} ${session?.user?.userInfo?.lastname}`}
                </Typography>
                <Link href="">
                  <Button
                    sx={dashboardStyles.logoutBtn}
                    onClick={() => signOut()}
                  >
                    Ausloggen
                  </Button>
                </Link>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {drawerList.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor: router.pathname === "/" + item.nav && "#eee",
                }}
              >
                <Tooltip title={item.text} placement="right" arrow>
                  <Link href={item.nav} style={dashboardStyles.link}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </Tooltip>
              </ListItem>
            ))}
          </List>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </Paper>
  );
}
