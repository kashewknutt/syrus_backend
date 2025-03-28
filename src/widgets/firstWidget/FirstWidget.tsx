import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSamuelEventListenr } from "@/hooks/useSamuelEventListener";
import { getSamuelConfig, getSamuelUser } from "@/lib/utils";
import axios from "axios";
import "tailwindcss/tailwind.css";

export const UptiqWidget = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");

  const config = getSamuelConfig();
  const user = getSamuelUser();

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 3000);
  }, []);

  const handleEvent = useCallback((eventData: any) => {
    setMessages((prev) => [...prev, { text: eventData.message, sender: "system" }]);
  }, []);

  useSamuelEventListenr("test-event", handleEvent);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    try {
      const executionId = uuid();
      const { appId, serverUrl, widgetKey } = config;
      const workflowId = "testWorkflowId";
      if (!workflowId) throw new Error("workflowId is required");
      const response = await axios.post(
        `${serverUrl}?status=Active&appId=installation-app-ai-persona-commercial-loan-origination-agent-1738934817633-version-2-account-27f00ca4-8ece-40d6-9260-643f86809fe9`,
        {
          integrationId: workflowId,
          uid: [user.uid],
          context: {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
          },
          executionId,
          userInput: input,
        },
        {
          headers: {
        "Content-Type": "application/json",
        widgetKey,
        appid: appId,
          },
        }
      );
      setMessages((prev) => [
        ...prev,
        { text: response.data?.reply || "No reply", sender: "ai" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error communicating with AI agent.", sender: "system" },
      ]);
    }
    setInput("");
  };

  return (
    <div
      className="absolute w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      {showSplash ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white text-black text-3xl font-bold">
          Welcome to UPTIQ AI
        </div>
      ) : (
        <motion.div
          className="absolute inset-0 bg-white bg-opacity-70 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto max-w-full md:max-w-4xl">
            <Card className="bg-[#f5f5f5] shadow-md rounded-lg border border-gray-300 p-4">
              <CardContent>
                <div className="w-full inline-flex">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What finanical help do you need?"
                    className="w-11/12 mr-4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <Button
                  onClick={sendMessage}
                  className="bg-green-500 text-white px-4 rounded-md hover:bg-green-600 transition"
                  >
                  Send
                </Button>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`p-2 rounded-md text-sm text-gray-800 ${
                    msg.sender === "user" ? "bg-green-100 text-right" : "bg-gray-200 text-left"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
