import { useQueryState, parseAsBoolean } from "nuqs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Cog } from "lucide-react";
import { SettingsTabs } from "../comp-434";

export function DialogDemo() {
  const [modalOpen, setModalOpen] = useQueryState(
    "modalOpen",
    parseAsBoolean.withDefault(false)
  );
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Cog />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-4xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <SettingsTabs />
      </DialogContent>
    </Dialog>
  );
}
