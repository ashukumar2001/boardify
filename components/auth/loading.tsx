import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center overflow-hidden">
      <Image
        src="/logo.svg"
        alt="logo"
        width={48}
        height={48}
        className="animate-pulse duration-1000"
      />
    </div>
  );
};

export default Loading;
