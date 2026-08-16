import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNexus } from "@/lib/nexus-store";

export function GuidanceForm({ target, onDone }: { target: string; onDone: () => void }) {
  const { addMentorship } = useNexus();
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        addMentorship({ expert: target, reason, message });
        onDone();
      }}
    >
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Reason for request</Label>
        <Input
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Project guidance for AI Ideathon"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Message</Label>
        <Textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly describe what you need help with."
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Preferred time</Label>
        <Input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Weekdays after 4 PM"
        />
      </div>
      <Button type="submit" className="w-full">
        Send Request
      </Button>
    </form>
  );
}
