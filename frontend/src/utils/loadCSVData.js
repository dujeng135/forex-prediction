// utils/loadCSVData.js
export async function loadCSVData(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();

  const rows = text.trim().split("\n");

  // Ambil header
  const header = rows[0].includes(";")
    ? rows[0].split(";")
    : rows[0].split(",");

  // Parsing baris data
  const data = rows.slice(1).map((row) => {
    const values = row.includes(";") ? row.split(";") : row.split(",");
    const entry = {};
    header.forEach((key, index) => {
      entry[key.trim()] = values[index]?.trim();
    });
    return entry;
  });

  return data;
}
  