import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = { role: "user", content: input };
    const updatedChat = [...chat, userMessage];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedChat }),
    });

    const data = await response.json();
    const botMessage = { role: "assistant", content: data.message };

    setChat([...updatedChat, botMessage]);
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>💰 AI Finance Coach</h1>
      <div style={{ marginBottom: 20 }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ margin: "10px 0" }}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about your money..."
        style={{ width: "80%", padding: 10 }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: 10 }}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
