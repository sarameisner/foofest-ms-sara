import Image from "next/image";
import Picture from "../../public/pics/basket.svg"


const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Image
        src={Picture}
        alt="Loading..."
        width={100}
        height={100}
        className="animate-spin"
      />
    </div>
  );
};

export default Loading;
