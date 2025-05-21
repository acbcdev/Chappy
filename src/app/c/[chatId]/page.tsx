import { Chat } from "@/components/chat/chat";

export default async function Page({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  return <Chat chatId={chatId} />;
}
