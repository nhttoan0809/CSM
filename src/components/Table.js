import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerTab, setExpandDrawer } from "../redux/drawer";
import GeneratorDrawer from "./componentGenerator/GeneratorDrawer";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index === 0 ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, title, selected, toggleDrawer } = props;
  const [searchable, setSearchable] = React.useState(false);

  const dispatch = useDispatch();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Box sx={{ flex: "1", display: "flex" }}>
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 3 }}>
          <Typography color="inherit" variant="subtitle1" component="div">
            {title.name}
          </Typography>
        </Box>
      )}

      {numSelected > 0 ? (
        <>
          {/* Pallet */}
          {title.id === "Pallet" && (
            <>
              <Box>
                {/* Pallet - Update */}
                {numSelected > 1 ? (
                  <IconButton disabled={true}>
                    <BorderColorIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Cập nhật pallet">
                    <IconButton
                      onClick={() => {
                        const drawerTab = {
                          type: "Pallet",
                          action: "Update",
                          data: selected,
                        };
                        dispatch(setDrawerTab(drawerTab));
                        toggleDrawer();
                      }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {/* Pallet - Remove */}
                <Tooltip title="Xóa bỏ pallet">
                  <IconButton
                    onClick={() => {
                      const drawerTab = {
                        type: "Pallet",
                        action: "Delete",
                        data: selected,
                      };
                      dispatch(setDrawerTab(drawerTab));
                      toggleDrawer();
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}

          {/* Goods */}
          {title.id === "Goods" && (
            <>
              <Box>
                {/* Goods - Update */}
                {numSelected > 1 ? (
                  <IconButton disabled={true}>
                    <BorderColorIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Cập nhật hàng">
                    <IconButton
                      onClick={() => {
                        const drawerTab = {
                          type: "Goods",
                          action: "Update",
                          data: selected,
                        };
                        dispatch(setDrawerTab(drawerTab));
                        toggleDrawer();
                      }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {/* Goods - Export */}
                <Tooltip title="Xuất hàng">
                  <IconButton
                    onClick={() => {
                      const drawerTab = {
                        type: "Goods",
                        action: "Export",
                        data: selected,
                      };
                      dispatch(setDrawerTab(drawerTab));
                      toggleDrawer();
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}

          {/* Sensor */}
          {title.id === "Sensor" && (
            <>
              <Box>
                {numSelected > 1 ? (
                  <IconButton disabled={true}>
                    <BorderColorIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Update">
                    <IconButton
                      onClick={() => {
                        const drawerTab = {
                          type: "Sensor",
                          action: "Update",
                          data: selected,
                        };
                        dispatch(setDrawerTab(drawerTab));
                        toggleDrawer();
                        // console.log("selected: ", selected);
                      }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </>
          )}

          {/* Agent */}
          {title.id === "Agent" && (
            <>
              <Box>
                {/* Warehouse - Add a warehouse */}
                {numSelected > 1 ? (
                  <IconButton disabled={true}>
                    <BorderColorIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Thêm kho">
                    <IconButton
                      onClick={() => {
                        const drawerTab = {
                          type: "Warehouse",
                          action: "Add",
                          data: selected,
                        };
                        dispatch(setDrawerTab(drawerTab));
                        toggleDrawer();
                      }}
                    >
                      <AddHomeWorkIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {/* Warehouse - Delete warehouse */}
                {numSelected > 1 ? (
                  <IconButton disabled={true}>
                    <BorderColorIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Xóa kho">
                    <IconButton
                      onClick={() => {
                        const drawerTab = {
                          type: "Warehouse",
                          action: "Delete",
                          data: selected,
                        };
                        dispatch(setDrawerTab(drawerTab));
                        toggleDrawer();
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {/* Agent - Delete warehouse */}
                {numSelected > 1 ? (
                  <IconButton disabled={true}>
                    <BorderColorIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Xóa đại lý">
                    <IconButton
                      onClick={() => {
                        const drawerTab = {
                          type: "Agent",
                          action: "Delete",
                          data: selected,
                        };
                        dispatch(setDrawerTab(drawerTab));
                        toggleDrawer();
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </>
          )}
        </>
      ) : (
        // <Box sx={{display: 'flex'}}>
        <>
          {title.id === "Pallet" && (
            <Tooltip title="Nhập pallet">
              <IconButton
                onClick={() => {
                  const drawerTab = {
                    type: "Pallet",
                    action: "Import",
                    data: null,
                  };
                  dispatch(setDrawerTab(drawerTab));
                  toggleDrawer();
                }}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
          {title.id === "Goods" && (
            <Tooltip title="Nhập hàng">
              <IconButton
                onClick={() => {
                  const drawerTab = {
                    type: "Goods",
                    action: "Import",
                    data: null,
                  };
                  dispatch(setDrawerTab(drawerTab));
                  toggleDrawer();
                }}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
          {title.id === "Agent" && (
            <Tooltip title="Thêm đại lý">
              <IconButton
                onClick={() => {
                  const drawerTab = {
                    type: "Agent",
                    action: "Add",
                    data: null,
                  };
                  dispatch(setDrawerTab(drawerTab));
                  toggleDrawer();
                }}
              >
                <AddBusinessIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* <Tooltip title="Filter">
            <IconButton
              onClick={() => {
                setSearchable(!searchable);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip> */}
          <Input sx={{ transition: ".5s ease", flex: searchable ? 1 : 0 }} />
        </>
        // </Box>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const expandDrawer = useSelector((state) => state.drawer.expandDrawer);
  const { headCells, rows, title } = props;

  React.useEffect(() => {
    setSelected([]);
  }, [rows]);

  const dispatch = useDispatch();

  const currentWarehouse = useSelector(
    (state) => state.warehouse.currentWarehouse
  );
  const currentAgent = useSelector((state) => state.agent.currentAgent);
  React.useEffect(() => {
    setSelected([]);
  }, [currentWarehouse, currentAgent]);

  const toggleDrawer = (state) => () => {
    if (!state) {
      // false
      dispatch(setDrawerTab({ type: "", action: "", data: "" }));
    }
    dispatch(setExpandDrawer(state));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n[Object.keys(n)[0]]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Drawer */}
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor={"right"}
          open={expandDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{ minWidth: "25rem", padding: "1rem 2rem" }}
            role="presentation"
            // onClick={toggleDrawer(false)}
            // onKeyDown={toggleDrawer(false)}
          >
            <GeneratorDrawer />
          </Box>
        </SwipeableDrawer>
      </React.Fragment>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          selected={selected}
          toggleDrawer={toggleDrawer(true)}
        />
        {rows.length > 0 ? (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row[Object.keys(row)[0]]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={(event) =>
                          handleClick(event, row[Object.keys(row)[0]])
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[Object.keys(row)[0]]}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>

                        {Object.keys(row).map((key, index) => {
                          let data = row[key];
                          if (key === "warehouseList") {
                            return (
                              <TableCell key={index} align="right">
                                {data.map((warehouse, ind) => (
                                  <p key={ind}>
                                    {/* {row["_id"] === currentAgent ? (
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          console.log(row["_id"]);
                                          console.log(warehouse.warehouse_id);
                                          dispatch(
                                            setCurrentWarehouse(
                                              warehouse.warehouse_id
                                            )
                                          );
                                        }}
                                      >{`${warehouse.name}`}</a>
                                    ) : ( */}
                                    {warehouse.name}
                                    {/* )} */}
                                  </p>
                                ))}
                              </TableCell>
                            );
                          }
                          if (typeof data === "boolean") {
                            if (data) {
                              data = "Su dung";
                            } else {
                              data = "Co san";
                            }
                          }
                          return index === 0 ? (
                            <Tooltip title={data} key={index}>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                sx={{
                                  maxWidth: "4rem",
                                  overflow: "hidden",
                                }}
                              >
                                {data}
                              </TableCell>
                            </Tooltip>
                          ) : (
                            <TableCell key={index} align="right">
                              {data}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h2>Không có sẵn {title.name.toLowerCase()} !!!</h2>
        )}
        <TablePagination
          rowsPerPageOptions={[6, 12, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
