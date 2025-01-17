/* eslint-disable @typescript-eslint/no-explicit-any */

export function convertToCSV(data: any) {
  const headers = Object.keys(data[0]).join(",") + "\n\n";
  const rows = data.map((row: any) => Object.values(row).join(",")).join("\n");
  return headers + rows;
}

export function downloadCSV(data: any) {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
