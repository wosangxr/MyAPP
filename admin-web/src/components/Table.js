import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export default function Table({ columns, data, onEdit, onDelete, renderAction }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key.toLowerCase();
    if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "var(--bg-surface)",
        borderRadius: 16,
        overflow: "hidden"
      }}>
        <thead>
          <tr style={{ background: "rgba(115, 103, 240, 0.1)", borderBottom: "1px solid var(--border-color)" }}>
            {columns.map((col, idx) => (
              <th key={idx} onClick={() => requestSort(col)} style={{
                padding: "16px",
                textAlign: "left",
                color: "var(--text-secondary)",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {col}
                  {sortConfig.key === col ? (
                    sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  ) : null}
                </div>
              </th>
            ))}
            {(onEdit || onDelete || renderAction) && (
              <th style={{ padding: "16px", textAlign: "center", color: "var(--text-secondary)", fontWeight: 600, fontSize: 14 }}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <motion.tr
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}
              whileHover={{ background: "var(--bg-card-hover)" }}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} style={{ padding: "16px", fontSize: 14 }}>
                  {row[col.toLowerCase()] || "-"}
                </td>
              ))}
              {(onEdit || onDelete || renderAction) && (
                <td style={{ padding: "16px", textAlign: "center" }}>
                  {renderAction ? renderAction(row) : (
                    <>
                      {onEdit && (
                        <button onClick={() => onEdit(row)} style={{
                          background: "rgba(115, 103, 240, 0.1)",
                          border: "1px solid rgba(115, 103, 240, 0.3)",
                          color: "var(--color-primary)",
                          padding: "6px 12px",
                          borderRadius: 6,
                          cursor: "pointer",
                          marginRight: 8
                        }}>
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row.id)} style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "var(--color-danger)",
                          padding: "6px 12px",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}>
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </td>
              )}
            </motion.tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}