export const CardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 w-full mt-10 rounded-t-lg h-auto">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="text-zinc-700 min-w-[370px] max-h-96 max-w-96 justify-center p-2 rounded">
      <div className="w-full flex flex-col p-2 rounded-lg border hover:cursor-pointer animate-pulse">
        <div className="bg-gray-100 rounded-lg h-48"></div>
        <div className="bg-gray-100 h-6 mt-2 rounded"></div>
        <div className="flex justify-between mt-2">
          <div className="bg-gray-100 h-6 w-1/2 rounded"></div>
          <div className="bg-gray-100 h-6 w-1/4 rounded"></div>
        </div>
      </div>
    </div>
  );
};
