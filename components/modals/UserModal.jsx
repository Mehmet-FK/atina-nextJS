"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import { memo, useEffect, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAtinaCalls from "../../hooks/useAtinaCalls";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import ModalTab from "./ModalTabs";
import { modalStyles } from "@/styles/modal_styles";
import { useSession } from "next-auth/react";

const userRoles = [
  { role: "Option 1", hasOwn: false },
  { role: "Option 2", hasOwn: true },
  { role: "Option 3", hasOwn: true },
  { role: "Option 4", hasOwn: false },
  { role: "Option 5", hasOwn: false },
];

const ListItem = ({ item, isAdmin }) => {
  const [hasOwn, setHasOwn] = useState(item.hasOwn);
  const handleClick = () => {
    if (!isAdmin) return;
    setHasOwn(!hasOwn);
  };
  return (
    <Box
      sx={{
        padding: "3px 8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      {hasOwn && (
        <IconButton
          onClick={handleClick}
          sx={{ color: "blue", fontSize: "2rem" }}
        >
          <CheckBoxIcon fontSize="inherit" color="inherit" />
        </IconButton>
      )}
      {!hasOwn && (
        <IconButton
          onClick={handleClick}
          sx={{ color: "red", fontSize: "2rem" }}
        >
          <IndeterminateCheckBoxIcon fontSize="inherit" color="inherit" />
        </IconButton>
      )}
      <Typography sx={{ flex: 1 }}>{item.role}</Typography>
    </Box>
  );
};

const UserModal = ({ setOpenUserModal, openUserModal, user }) => {
  const { data } = useSession();
  const handleClose = () => setOpenUserModal(false);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputVal, setInputVal] = useState(user);
  const [isAdmin, setIsAdmin] = useState(false);

  // To keep the value of which tab is selected
  const [tab, setTab] = useState("Allgemein");

  const { putUserData } = useAtinaCalls();
  const inputRef = useRef();

  const handleImageInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      const base64String = fileContent.split(",")[1];
      // console.log(base64String);
      setSelectedImage(fileContent);
      setInputVal({ ...inputVal, image: base64String });
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleChange = (e) => {
    if (!isAdmin) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    putUserData(inputVal);
  };
  useEffect(() => {
    setIsAdmin(data?.user?.userInfo?.isAdministrator);
  }, [data]);
  useEffect(() => {
    setInputVal(user);
  }, [user]);

  return (
    <>
      <Modal
        open={openUserModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyles.userModal.cardStyle}>
          <ModalTab setTab={setTab} />
          {/* if tab is "Allgemein" this part will be shown */}
          {tab === "Allgemein" && (
            <Box sx={{ p: 1 }}>
              <label htmlFor="imgInput">
                <Box
                  sx={{
                    ...modalStyles.userModal.imgStyle,
                    backgroundImage: selectedImage
                      ? `url(${selectedImage})`
                      : `url(${"/assets/placeholder.jpg"})`,

                    // backgroundImage: selectedImage && `url(${selectedImage})`,
                  }}
                >
                  <PhotoCameraIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="inherit"
                    color="inherit"
                  />
                  <input
                    ref={inputRef}
                    style={modalStyles.userModal.input}
                    id="imgInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                  />
                </Box>
              </label>
              <CardContent sx={modalStyles.userModal.content}>
                <Box sx={modalStyles.userModal.inputGroup}>
                  <TextField
                    variant="outlined"
                    label="Benutzername"
                    size="small"
                    name="username"
                    sx={{ width: "100%" }}
                    value={inputVal.username || ""}
                    onChange={handleChange}
                  />{" "}
                  <TextField
                    variant="outlined"
                    label="Kennwort"
                    size="small"
                    type={visible ? "text" : "password"}
                    name="passwordSalt"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                    value={inputVal.passwordSalt || ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visible && (
                            <VisibilityOffIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                          {visible && (
                            <VisibilityIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />{" "}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "13px",
                  }}
                >
                  {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
                  <TextField
                    variant="outlined"
                    label="Vorname"
                    size="small"
                    name="firstname"
                    value={inputVal?.firstname || ""}
                    onChange={handleChange}
                  />
                  {/* </Tooltip> */}
                  {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
                  <TextField
                    variant="outlined"
                    label="Nachname"
                    size="small"
                    name="lastname"
                    value={inputVal?.lastname || ""}
                    onChange={handleChange}
                  />
                  {/* </Tooltip> */}
                  {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
                  <TextField
                    variant="outlined"
                    label="Personalnummer"
                    size="small"
                    name="personnelnumber"
                    value={inputVal?.personnelnumber || ""}
                    onChange={handleChange}
                  />
                  {/* </Tooltip> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {isAdmin && (
                    <Button
                      onClick={handleSubmit}
                      sx={modalStyles.userModal.button}
                      variant="contained"
                    >
                      Speichern
                    </Button>
                  )}
                  <Button
                    sx={modalStyles.userModal.button}
                    onClick={handleClose}
                    variant="contained"
                  >
                    {isAdmin ? "Abbrechen" : "Schließen"}
                  </Button>
                </Box>
              </CardContent>
            </Box>
          )}

          {/* if tab is "Rolle" this part will be shown */}
          {tab === "Rolle" && (
            <Box sx={{ p: 0 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "13px",
                }}
              >
                {userRoles.map((role, i) => (
                  <ListItem key={i} isAdmin={isAdmin} item={role} />
                ))}
              </CardContent>
            </Box>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default UserModal;
