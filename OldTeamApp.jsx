import { useState } from "react";

export default function OldTeamApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [chat, setChat] = useState(["سلام! خوش اومدی به تیم ما"]);
  const [newMsg, setNewMsg] = useState("");

  const links = {
    game: [
      { title: "Minecraft Server", url: "https://example.com/mc" },
      { title: "Steam Group", url: "https://steamcommunity.com/groups/oldteam" }
    ],
    meeting: [
      { title: "Google Meet", url: "https://meet.google.com" },
      { title: "Zoom", url: "https://zoom.us" }
    ],
    tools: [
      { title: "Discord", url: "https://discord.com" },
      { title: "Notion", url: "https://notion.so" }
    ]
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Old Team</h1>
        <input placeholder="نام کاربری" onChange={e => setUsername(e.target.value)} style={{ padding: "0.5rem", width: "200px", marginBottom: "1rem" }} />
        <button onClick={() => setLoggedIn(true)} style={{ padding: "0.5rem", width: "200px" }}>ورود</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", backgroundColor: "#111", color: "#fff", minHeight: "100vh" }}>
      <h2>به Old Team خوش اومدی، {username}!</h2>
      <div style={{ margin: "1rem 0" }}>
        <Tabs title="گیم" items={links.game} />
        <Tabs title="جلسه" items={links.meeting} />
        <Tabs title="ابزار" items={links.tools} />
        <ChatBox chat={chat} newMsg={newMsg} setNewMsg={setNewMsg} onSend={() => {
          if (newMsg.trim()) {
            setChat([...chat, username + ": " + newMsg]);
            setNewMsg("");
          }
        }} />
      </div>
    </div>
  );
}

function Tabs({ title, items }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>{title}</h3>
      {items.map(link => (
        <div key={link.url}>
          <a href={link.url} target="_blank" rel="noreferrer" style={{ color: "#0af", textDecoration: "none" }}>
            🔗 {link.title}
          </a>
        </div>
      ))}
    </div>
  );
}

function ChatBox({ chat, newMsg, setNewMsg, onSend }) {
  return (
    <div>
      <h3>چت</h3>
      <div style={{ background: "#222", padding: "0.5rem", height: "150px", overflowY: "auto", marginBottom: "0.5rem" }}>
        {chat.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="پیام..." style={{ padding: "0.5rem", width: "70%" }} />
      <button onClick={onSend} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>ارسال</button>
    </div>
  );
}