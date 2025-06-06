import { Brain, ExternalLink, Paintbrush } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKeysStore } from "@/store/keys";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { providers } from "@/const/providres";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function SettingsTabs() {
  const keys = useKeysStore((state) => state.keys);
  const addKey = useKeysStore((state) => state.addKey);
  return (
    <Tabs defaultValue="tab-1" className="flex-1">
      <TabsList className="mb-3 gap-1 bg-transparent">
        <TabsTrigger
          value="tab-1"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
        >
          <Brain
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          AI
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
        >
          <Paintbrush
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Customize
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="max-h-[85dvh] h-[60dvh] ">
        <TabsContent value="tab-1">
          <section className="space-y-2">
            <h2 className="text-2xl mb-5 font-semibold">Api keys</h2>
            <div className="flex mx-2 gap-2">
              {providers.map((provider) => (
                <div key={provider.id} className="flex flex-col  gap-2">
                  <div className="flex items-end gap-2">
                    <Label
                      className="text-muted-foreground"
                      htmlFor={provider.id}
                    >
                      {provider.name}
                    </Label>
                    <Tooltip delayDuration={50}>
                      <TooltipTrigger>
                        <a
                          href={provider.link}
                          target="_blank"
                          aria-label={`Get your ${provider.name} API key`}
                          rel="noreferrer"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        Get {provider.name} API key
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Input
                    id={provider.id}
                    type="password"
                    value={keys[provider.id] ?? ""}
                    placeholder={`Enter ${provider.name} API key`}
                    onChange={(e) => addKey(e.target.value.trim(), provider.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="text-muted-foreground p-4 pt-1 text-center text-xs">
            Content for Tab 2
          </p>
        </TabsContent>
        <TabsContent value="tab-3">
          <p className="text-muted-foreground p-4 pt-1 text-center text-xs">
            Content for Tab 3
          </p>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
