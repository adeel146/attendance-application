import React, { useState } from "react";
import { TbHourglassEmpty } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import { useTable } from "react-table";

import "./index.scss";

import { commonPageSize } from "../../../constants/constants";
import { customSpinner } from "../../../constants/utilis";

const CustomTable = ({
  columns,
  isLoading = false,
  data = [],
  noPagination,
  totalPages,
  page_number,
  setpageNumber,
  setpageSize: setSize,
}) => {
  const [pageSize, setPageSize] = useState(commonPageSize);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // value change
  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
    setSize(Number(event.target.value));
  };

  const handleNextPage = async (page) => {
    let pageNumber = page.selected;
    setpageNumber(pageNumber);
  };
  return isLoading ? (
    <div className="h-[50vh] flex justify-center items-center">
      {customSpinner()}
    </div>
  ) : (
    <div>
      <table {...getTableProps()} style={{ width: "100%", margin: "auto" }}>
        <thead
          className="table-head !bg-primary_color_60"
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`py-[12px] text-start px-4`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="table-body">
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    color: "#28407B",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                  id="tr"
                  // onClick={() => handleRowClick(row)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "13px",
                          textAlign: "start",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <td aria-disabled colSpan="100%">
              <div className="w-full flex justify-center text-center">
                <div className="mt-10 mb-10">
                  <TbHourglassEmpty className="text-slate-400" size={60} />
                  <h1 className="text-slate-400 w-max ml-1"> No Data</h1>
                </div>
              </div>
            </td>
          )}
        </tbody>
      </table>
      {/*  table footer*/}

      {!noPagination && (
        <div className="main-footer rounded-full bg-primary_color_60 py-2 mb-32 px-14 mt-14 text-white flex justify-between m-auto font-bold text-base">
          <div>
            <label for="show-item" className="text-base">
              Showing
            </label>{" "}
            &nbsp;
            <select
              className="text-white cursor-pointer  w-[60px] bg-transparent outline-none border border-white rounded-[3px] py-[4px]  px-[5px]"
              id="show-item"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map((obj) => (
                <option key={obj} value={obj} className=" text-black px-[6px] ">
                  {obj}
                </option>
              ))}
            </select>
          </div>
          <div>
            <ReactPaginate
              previousLabel={"< Previous"}
              nextLabel={"Next >"}
              breakLabel={"..."}
              pageCount={totalPages}
              initialPage={page_number}
              marginPagesDisplayed={3}
              pageRangeDisplayed={2}
              onPageChange={handleNextPage}
              containerClassName={`pagination pagination-blue`}
              activeClassName={"active"}
              activeLinkClassName={"active-link"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
