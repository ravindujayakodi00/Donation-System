import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RequestTable = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [open, setOpen] = useState(false);
  const [openReload, setOpenReload] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  useEffect(() => {
    fetch("http://localhost:8000/donors") // Replace with your backend API endpoint
      .then((response) => response.json())
      .then((data) => {
        setDonors(data);
        setFilteredDonors(data);
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
      });
  }, []);

  useEffect(() => {
    // Filter donors based on searchValue
    const filtered = donors.filter((donor) => {
      const fullName = `${donor.firstName} ${donor.lastName}`.toLowerCase();
      return fullName.includes(searchValue.toLowerCase());
    });

    setFilteredDonors(filtered);
  }, [searchValue, donors]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/donors/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the donors array after deletion
        const updatedDonors = donors.filter((donor) => donor._id !== id);
        setDonors(updatedDonors);
        setFilteredDonors(updatedDonors);

        // Close the dialog box
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
      });
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <div className="justify-between flex">
        <button className="mt-3 mr-4 mb-3 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl ">
          Generate Report
        </button>

        <div className="relative w-64">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-700"
            placeholder="Search by name"
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="absolute top-0 left-0 mt-3 ml-3">
            <svg
              className="w-6 h-6 fill-current text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M21.707,20.293l-5.363-5.362C17.853,13.225,18.5,11.705,18.5,10c0-4.411-3.589-8-8-8S2.5,5.589,2.5,10s3.589,8,8,8 c1.705,0,3.225-0.647,4.331-1.707l5.362,5.363c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l1.586-1.586 c0.391-0.391,0.391-1.023,0-1.414L21.707,20.293z M10.5,18C5.813,18,2.5,14.687,2.5,10S5.813,2,10.5,2S18.5,5.313,18.5,10 S15.187,18,10.5,18z"
              />
            </svg>
          </div>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">First Name</StyledTableCell>
              <StyledTableCell align="left">Last Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonors.map((donor) => (
              <StyledTableRow key={donor._id}>
                <StyledTableCell align="left">
                  {donor.firstName}
                </StyledTableCell>
                <StyledTableCell align="left">{donor.lastName}</StyledTableCell>
                <StyledTableCell align="left">{donor.email}</StyledTableCell>
                <StyledTableCell align="left">{donor.phone}</StyledTableCell>
                <StyledTableCell align="left">{donor.address}</StyledTableCell>
                <StyledTableCell align="left">
                  <div>
                    <Link
                      to={`/${donor._id}`}
                      className="bg-yellow-400 hover:bg-yellow-600 rounded-lg px-3 py-1 mr-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={handleOpen}
                      className="bg-red-400 hover:bg-red-600 rounded-lg px-3 py-1 mr-2 text-white"
                    >
                      Delete
                    </button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        className="text-center text-blue-900 dialog-text"
                      >
                        {"Are you sure you want to delete this post?"}
                      </DialogTitle>
                      <DialogActions>
                        <button
                          className="mt-2 mr-1 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <button
                          className="mt-2 mr-4 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleDelete(donor._id)}
                          autoFocus
                        >
                          Delete
                        </button>
                        <Backdrop
                          sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                          }}
                          open={openReload}
                          onClick={handleClose}
                        >
                          <p className="flex-none ">Please wait..</p>
                          <CircularProgress color="inherit" />
                        </Backdrop>
                      </DialogActions>
                    </Dialog>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RequestTable;
