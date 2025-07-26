const sendSignalToTelegram = async ({ signal, price, confidence }) => {
    const response = await fetch("http://localhost:5000/api/telegram/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signal, price, confidence }),
    });
  
    if (!response.ok) {
      throw new Error("Gagal mengirim ke Telegram");
    }
  
    return await response.json();
  };
  
  export default sendSignalToTelegram;
  