"use client";

import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useUserStore } from "@/store/user";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/navigation";
import { UserProp } from "@/types/user.prop";
import DeleteModal from "../modalcomponents/DeleteModal";
import CreateModal from "../modalcomponents/CreateModal";
import EditModal from "../modalcomponents/EditModal";
const Home = () => {
  // estado global y funciones obtenidas desde el store de Zustand
  const { users, getAllUsers, goNextPage, goPreviousPage, page, totalPages } =
    useUserStore((state) => state);

  const router = useRouter();
  const handleNavigate = (id: string) => {
    router.push(`/user/${id}`);
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <CreateModal />
      {isMobile ? (
        users && users.length > 0 ? (
          users.map((user: UserProp) => (
            <Card key={user.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">ID: {user.id}</Typography>
                <Typography variant="body2">Email: {user.email}</Typography>
                <Typography variant="body2">Gender: {user.gender}</Typography>
                <Typography variant="body2">Status: {user.status}</Typography>
                <Typography variant="body2">
                  Actions: <EditModal user={user} />
                  <DeleteModal user={user} />
                  <button onClick={() => handleNavigate(user.id)}>
                    <InfoIcon />
                  </button>
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography align="center">No users found.</Typography>
        )
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user: UserProp) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.gender}</TableCell>
                    <TableCell align="right">{user.status}</TableCell>
                    <TableCell align="right">
                      <EditModal user={user} />
                      <DeleteModal user={user} />
                      <button onClick={() => handleNavigate(user.id)}>
                        <InfoIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {totalPages !== null ? (
        <div className="pagination-container">
          <IconButton onClick={goPreviousPage} disabled={page === 1}>
            <ArrowBackIosNew />
          </IconButton>
          {page} / {totalPages}
          <IconButton onClick={goNextPage} disabled={page >= totalPages}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      ) : null}
    </Container>
  );
};

export default Home;
