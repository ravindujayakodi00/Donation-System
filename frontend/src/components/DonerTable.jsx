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
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  function downloadPDF() {
    let timerInterval;

    Swal.fire({
      title: "Preparing your PDF",
      html: "Please wait <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    })
      .then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      })
      .then(() => {
        const doc = new jsPDF("p", "pt", "a4");

        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

        const attributes = [
          "firstName",
          "lastName",
          "email",
          "phone",
          "address",
        ];
        const data = filteredDonors.map((donor) => ({
          firstName: donor.firstName,
          lastName: donor.lastName,
          email: donor.email,
          phone: donor.phone,
          address: donor.address,
        }));

        const columns = attributes.map((attr) => ({
          header: attr,
          dataKey: attr,
        }));

        doc.autoTable({
          columns,
          body: data,
          startY: pageHeight - 700,
          theme: "grid",
        });

        var today = new Date();
        var curr_date = today.getDate();
        var curr_month = today.getMonth();
        var curr_year = today.getFullYear();
        today = [curr_month + 1] + "/ " + curr_date + "/ " + curr_year;
        var newdat = today;

        doc.text(newdat, 450, 108);

        doc.save("Donors.pdf");
      });
  }

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
        </div>

        <div className="top-0 left-0 mt-3 ml-3">
          <button
            className="mt-2 mr-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
            onClick={downloadPDF}
          >
            Generate Report
          </button>
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

export default AdminTable;
