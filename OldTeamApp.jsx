import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle, LinkIcon, LogIn } from "lucide-react";

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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">Old Team</h1>
        <Card className="w-80">
          <CardContent className="p-4 space-y-4">
            <Input placeholder="نام کاربری" onChange={e => setUsername(e.target.value)} />
            <Button onClick={() => setLoggedIn(true)} className="w-full">
              <LogIn className="mr-2 h-4 w-4" /> ورود
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">به Old Team خوش اومدی، {username}!</h1>
      <Tabs defaultValue="game" className="mb-6">
        <TabsList>
          <TabsTrigger value="game"><LinkIcon className="w-4 h-4 mr-1" /> گیم</TabsTrigger>
          <TabsTrigger value="meeting"><LinkIcon className="w-4 h-4 mr-1" /> جلسه</TabsTrigger>
          <TabsTrigger value="tools"><LinkIcon className="w-4 h-4 mr-1" /> ابزار</TabsTrigger>
          <TabsTrigger value="chat"><MessageCircle className="w-4 h-4 mr-1" /> چت</TabsTrigger>
        </TabsList>
        <TabsContent value="game">
          {links.game.map(link => (
            <a key={link.url} href={link.url} target="_blank" className="block mb-2 hover:underline">
              🔗 {link.title}
            </a>
          ))}
        </TabsContent>
        <TabsContent value="meeting">
          {links.meeting.map(link => (
            <a key={link.url} href={link.url} target="_blank" className="block mb-2 hover:underline">
              📅 {link.title}
            </a>
          ))}
        </TabsContent>
        <TabsContent value="tools">
          {links.tools.map(link => (
            <a key={link.url} href={link.url} target="_blank" className="block mb-2 hover:underline">
              🛠️ {link.title}
            </a>
          ))}
        </TabsContent>
        <TabsContent value="chat">
          <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
            {chat.map((msg, i) => (
              <div key={i} className="bg-neutral-800 p-2 rounded-xl">{msg}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="پیام..." />
            <Button
              onClick={() => {
                if (newMsg.trim()) {
                  setChat([...chat, `${username}: ${newMsg}`]);
                  setNewMsg("");
                }
              }}
            >
              ارسال
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}