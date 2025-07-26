export function isUserVVIP() {
  const role = localStorage.getItem("role");
  const vvip = localStorage.getItem("vvip");

  // Admin = akses semua, User hanya kalau VVIP
  return role === "admin" || vvip === "true";
}
