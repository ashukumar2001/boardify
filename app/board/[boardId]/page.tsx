import Room from "@/components/room";
import Canvas from "./__components/canvas";
import Loading from "./__components/loading";
interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
export default function BoardId({ params }: BoardIdPageProps) {
  return (
    <div>
      <Room roomId={params.boardId} fallback={<Loading />}>
        <Canvas boardId={params.boardId} />
      </Room>
    </div>
  );
}
