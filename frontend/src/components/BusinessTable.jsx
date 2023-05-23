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

const AdminTable = () => {
  const [business, setBusiness] = useState([]);
  const [filteredBusiness, setFilteredBusiness] = useState([]);
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
    fetch("http://localhost:8000/business") // Replace with your backend API endpoint
      .then((response) => response.json())
      .then((data) => {
        setBusiness(data);
        setFilteredBusiness(data);
      })
      .catch((error) => {
        console.error("Error fetching business:", error);
      });
  }, []);

  useEffect(() => {
    // Filter business based on searchValue
    const filtered = business.filter((business) => {
      const fullName = `${business.firstName} ${business.lastName}`.toLowerCase();
      return fullName.includes(searchValue.toLowerCase());
    });

    setFilteredBusiness(filtered);
  }, [searchValue, business]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/business/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the business array after deletion
        const updatedBusiness = business.filter((business) => business._id !== id);
        setBusiness(updatedBusiness);
        setFilteredBusiness(updatedBusiness);

        // Close the dialog box
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting business:", error);
      });
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <div className="justify-between flex">

        <div className="relative w-64 mb-6">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-700"
            placeholder="Search by name"
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="absolute top-0 left-0 mt-3 ml-3">
          
          </div>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Business Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBusiness.map((business) => (
              <StyledTableRow key={business._id}>
                <StyledTableCell align="left">{business.businessName}</StyledTableCell>
                <StyledTableCell align="left">{business.email}</StyledTableCell>
                <StyledTableCell align="left">{business.phone}</StyledTableCell>
                <StyledTableCell align="left">{business.address}</StyledTableCell>
                <StyledTableCell align="left">
                  <div>
                    <Link
                      to={`/${business._id}`}
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
                          onClick={() => handleDelete(business._id)}
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

export default AdminTable;
