import { Card, CardContent } from "../ui/card";

type MessageErrorProps = {
  error: Error;
};

export function MessageError({ error }: MessageErrorProps) {
  return (
    <Card className="">
      <CardContent>{error.message}</CardContent>
    </Card>
  );
}
