"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  MoreVertical,
  Clock,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";

export default function ProTable({
  columns = [],
  data = [],
  buttonFilters = [],
  tableHeader = null,
  headerActions = null,
  defaultPageSize = 10,
  enableSearch = false,
  enableFilters = false,
  enablePagination = true,
  enableSelection = false,
  enableExport = false,
  loading = false,
  className = "",
  bulkActions = [],
  onRowClick = null,
  onExport = null,
  searchPlaceholders = ["Search..."],
}) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState([]);

  const hints = searchPlaceholders;

  const [hintIndex, setHintIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (search) return; // stop animation when user types

    const current = hints[hintIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      // TYPE IN
      timeout = setTimeout(() => {
        setTyped((prev) => prev + current[charIndex]);
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!isDeleting && charIndex === current.length) {
      // PAUSE AFTER TYPING
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && charIndex > 0) {
      // TYPE OUT (DELETE)
      timeout = setTimeout(() => {
        setTyped((prev) => prev.slice(0, -1));
        setCharIndex((c) => c - 1);
      }, 50);
    } else if (isDeleting && charIndex === 0) {
      // MOVE TO NEXT HINT
      setIsDeleting(false);
      setHintIndex((i) => (i + 1) % hints.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, hintIndex, isDeleting, search]);

  // Normalize comparison helper
  const equalsFilter = (rowValue, filterValue) => {
    if (filterValue === "" || filterValue === null || filterValue === undefined)
      return true;
    const a = (rowValue ?? "").toString().trim().toLowerCase();
    const b = (filterValue ?? "").toString().trim().toLowerCase();
    return a === b;
  };

  // Handle search + filter + sort
  const processedData = useMemo(() => {
    let tempData = Array.isArray(data) ? [...data] : [];

    // Search
    if (enableSearch && search) {
      const q = search.toString().trim().toLowerCase();
      if (q.length > 0) {
        tempData = tempData.filter((row) =>
          columns.some((col) => {
            const val = row[col.key];
            return String(val ?? "")
              .toLowerCase()
              .includes(q);
          }),
        );
      }
    }

    // Filters
    if (enableFilters || buttonFilters.length > 0) {
      Object.keys(filters).forEach((key) => {
        const fv = filters[key];
        if (fv === "" || fv === null || fv === undefined) return;
        tempData = tempData.filter((row) => equalsFilter(row[key], fv));
      });
    }

    // Sorting
    if (sortConfig.key) {
      tempData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        const bothNumbers = !Number.isNaN(aNum) && !Number.isNaN(bNum);

        if (bothNumbers) {
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        if (aStr === bStr) return 0;
        return sortConfig.direction === "asc"
          ? aStr > bStr
            ? 1
            : -1
          : aStr < bStr
            ? 1
            : -1;
      });
    }

    return tempData;
  }, [
    data,
    search,
    filters,
    sortConfig,
    columns,
    enableSearch,
    enableFilters,
    buttonFilters,
  ]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = page * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, page, pageSize]);

  // Row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };
  const toggleAllRows = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((r) => r.id));
    }
  };

  // Sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  // Handle row click
  const handleRowClick = (row, event) => {
    if (
      event?.target?.type === "checkbox" ||
      event.target.closest("button") ||
      event.target.closest("a")
    ) {
      return;
    }
    if (onRowClick) onRowClick(row);
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value === "all" ? "" : value }));
    setPage(0);
  };

  // Toggle button filter
  const toggleButtonFilter = (bf) => {
    const key = bf.key;
    const value = bf.value ?? "";
    setFilters((prev) => {
      const prevValue = prev[key] ?? "";
      return { ...prev, [key]: prevValue === value ? "" : value };
    });
    setPage(0);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setFilters({});
    setPage(0);
  };

  // Get all action functions from a row
  const getRowActions = (row) => {
    const actionKeys = [
      "onApprove",
      "onReject",
      "onCreate",
      "onView",
      "onEdit",
      "onDelete",
    ];
    const actions = {};

    actionKeys.forEach((key) => {
      if (row[key]) {
        actions[key] = row[key];
      }
    });

    return actions;
  };

  // Get action icon based on key
  const getActionIcon = (actionKey) => {
    switch (actionKey) {
      case "onApprove":
        return <CheckCircle className="h-4 w-4 mr-2 text-green-600" />;
      case "onReject":
        return <XCircle className="h-4 w-4 mr-2 text-red-600" />;
      case "onCreate":
        return <Plus className="h-4 w-4 mr-2 text-gray-600" />;
      case "onView":
        return <Eye className="h-4 w-4 mr-2 text-gray-600" />;
      case "onEdit":
        return <Edit className="h-4 w-4 mr-2 text-blue-600" />;
      case "onDelete":
        return <Trash2 className="h-4 w-4 mr-2 text-red-600" />;
      default:
        return <MoreVertical className="h-4 w-4 mr-2 text-gray-600" />;
    }
  };

  // Get action label based on key
  const getActionLabel = (actionKey) => {
    switch (actionKey) {
      case "onApprove":
        return "Mark Approve";
      case "onReject":
        return "Reject";
      case "onCreate":
        return "Add Vitals";
      case "onView":
        return "View";
      case "onEdit":
        return "Edit";
      case "onDelete":
        return "Delete";
      default:
        return actionKey.replace("on", "");
    }
  };

  // Get action color class based on key
  const getActionColorClass = (actionKey) => {
    switch (actionKey) {
      case "onApprove":
        return "text-green-700 hover:bg-green-50";
      case "onReject":
        return "text-red-700 hover:bg-red-50";
      case "onDelete":
        return "text-red-700 hover:bg-red-50";
      case "onEdit":
        return "text-blue-700 hover:bg-blue-50";
      default:
        return "text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="flex justify-between">
        {tableHeader && (
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {tableHeader}
          </h2>
        )}
        {headerActions && (
          <div className="flex items-center gap-2">{headerActions}</div>
        )}
      </div>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {enableSearch && (
          <div className="relative w-full md:w-1/3">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              // placeholder="Search by patient name, id and phone number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-16 pr-3 py-2 border rounded-md w-full text-sm"
            />
            {!search && typed && (
              <span className="absolute left-18 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                {typed}
              </span>
            )}
          </div>
        )}

        {/* Right-side controls */}
        <div className="flex gap-2 items-center">
          {enableExport && !selectedRows.length && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport?.(processedData)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export All
            </Button>
          )}
        </div>

        {buttonFilters && buttonFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {buttonFilters.map((bf, idx) => {
              const Icon = bf.icon || null;
              const active =
                filters[bf.key] !== undefined &&
                String(filters[bf.key]) === String(bf.value);
              return (
                <button
                  key={`${bf.key}-${idx}`}
                  type="button"
                  onClick={() => toggleButtonFilter(bf)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition
                  ${
                    active
                      ? "bg-green-400/50 text-blue-700 text-black "
                      : "bg-white text-gray-700 border-gray-300 hover:text-teal-700"
                  }`}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <span>{bf.label}</span>
                </button>
              );
            })}

            {(Object.values(filters).some((v) => v) ||
              (enableSearch && search)) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-full bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dropdown Filters */}
      {enableFilters && (
        <div className="flex flex-wrap gap-2">
          {columns
            .filter((col) => col.filterOptions)
            .map((col) => (
              <div key={col.key} className="w-48">
                <Select
                  value={filters[col.key] ?? ""}
                  onValueChange={(value) => handleFilterChange(col.key, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`All ${col.header}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{`All ${col.header}`}</SelectItem>
                    {col.filterOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

          {(Object.values(filters).filter(Boolean).length > 0 ||
            (enableSearch && search)) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="h-10"
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Bulk Actions */}
      {enableSelection && selectedRows.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center bg-teal-100 p-3 rounded gap-2 sticky top-0 z-20 shadow">
          <span className="text-sm font-medium">
            {selectedRows.length} selected
          </span>
          <div className="flex gap-2 flex-wrap">
            {bulkActions.length > 0 ? (
              bulkActions.map((action) => (
                <Button
                  key={action.label}
                  size="sm"
                  onClick={() => {
                    action.onClick(selectedRows);
                    setSelectedRows([]);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  {action.label}
                </Button>
              ))
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() =>
                    alert(`Delete ${selectedRows.length} selected rows`)
                  }
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete Selected
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    alert(`Export ${selectedRows.length} selected rows`)
                  }
                  className="bg-green-500 hover:bg-green-600"
                >
                  Export Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedRows([])}
                >
                  Deselect All
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300 sticky top-0 z-10 shadow">
            <tr>
              {enableSelection && (
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onChange={toggleAllRows}
                    className="rounded border-gray-300"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                  onClick={() => requestSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {sortConfig.key === col.key ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <AnimatePresence>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                Array(pageSize)
                  .fill(0)
                  .map((_, idx) => (
                    <tr key={idx} className="animate-pulse bg-gray-50">
                      {(enableSelection
                        ? [<td key="s" className="px-4 py-4" />]
                        : []
                      ).concat(
                        columns.map((col) => (
                          <td
                            key={col.key}
                            className="px-4 py-4 text-sm text-gray-600"
                          >
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                          </td>
                        )),
                      )}
                    </tr>
                  ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (enableSelection ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No Patient Data Found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <motion.tr
                    key={row.id || idx}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-lg shadow-sm transition-all duration-200 ease-in-out ${
                      selectedRows.includes(row.id)
                        ? "bg-cyan-50 shadow-md"
                        : idx % 2 === 0
                          ? "bg-white"
                          : "bg-gray-100"
                    }
                    hover:shadow-md
                    hover:bg-teal-100/50
                    cursor-pointer
                    border border-gray-100
                    `}
                    onClick={(e) => handleRowClick(row, e)}
                  >
                    {enableSelection && (
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleRowSelection(row.id)}
                          className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap align-middle"
                      >
                        {col.actions ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                              >
                                <MoreVertical
                                  size={18}
                                  className="text-gray-500"
                                />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-36 min-w-fit"
                            >
                              {Object.entries(getRowActions(row)).map(
                                ([actionKey, actionFn]) => (
                                  <DropdownMenuItem
                                    key={actionKey}
                                    disabled={
                                      row.actionsDisabled?.[
                                        actionKey
                                          .replace("on", "")
                                          .toLowerCase()
                                      ]
                                    }
                                    onClick={() => actionFn(row)}
                                    className={
                                      row.actionsDisabled?.[
                                        actionKey
                                          .replace("on", "")
                                          .toLowerCase()
                                      ]
                                        ? "cursor-not-allowed text-gray-400"
                                        : getActionColorClass(actionKey)
                                    }
                                  >
                                    {getActionIcon(actionKey)}
                                    {getActionLabel(actionKey)}
                                  </DropdownMenuItem>
                                ),
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : col.render ? (
                          col.render(row)
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-2">
          <p className="text-gray-600">
            Showing {page * pageSize + 1} -{" "}
            {Math.min((page + 1) * pageSize, processedData.length)} of{" "}
            {processedData.length} entries
          </p>
          <div className="flex gap-2 items-center flex-wrap">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(0)}
              className="h-8 w-8 p-0"
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft size={16} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i).map((pNum) => (
              <Button
                key={pNum}
                variant={pNum === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(pNum)}
                className="h-8 w-8"
              >
                {pNum + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              className="h-8 w-8 p-0"
            >
              <ChevronRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(totalPages - 1)}
              className="h-8 w-8 p-0"
            >
              {">>"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
