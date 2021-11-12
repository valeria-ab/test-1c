import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataResponceType, StatusType } from './App';
import { TablePagination } from '@mui/material';





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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  id: string,
  date: number,
  type: string,
  autor: string,
  account: string,
  terminal: string,
  status: string,
  className: string
) {
  return { id, date, type, autor, account, terminal, status, className };
}

const translateStatus = (status: StatusType) => {
  switch (status) {
    case "new":
      return "Новое"
    case "completed":
      return "Выполнено"
    case "assigned_to":
      return "Назначено"
    case "started":
      return "Выполняется"
    case "declined":
      return "Отменено"
  }
}



export function CustomizedTables(props: { data: DataResponceType }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = props.data.map(i =>
    createData(`№${i.id}`, i.created_date, i.order_type.name,
      `${i.created_user.surname} ${i.created_user.name}`,
      i.account.name, i.terminal.name, translateStatus(i.status), i.status))




  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Номер / Дата</StyledTableCell>
              <StyledTableCell>Тип задания / Автор</StyledTableCell>
              <StyledTableCell>Аккаунт / Терминал</StyledTableCell>
              <StyledTableCell align="center">Статус</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.id} >
                <StyledTableCell component="th" scope="row">
                  {row.id} <div className={"span"}>{row.date}</div>
                </StyledTableCell>
                <StyledTableCell>{row.type}  <div className={"span"}>{row.autor}</div></StyledTableCell>

                <StyledTableCell>{row.account} <div className={"span"}>{row.terminal}</div></StyledTableCell>
                <StyledTableCell align="center"><div className={row.className}>{row.status}</div></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
