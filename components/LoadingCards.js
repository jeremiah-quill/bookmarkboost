const LoadingCards = () => {
  let cards = [];
  for (let i = 0; i < 24; i++) {
    cards.push(
      <li
        key={i}
        className={`animate-pulse cursor-pointer p-10 rounded-md border-2 border-gray-400 shadow-md relative flex justify-center items-center
          }`}>
        <div className="flex justify-between w-full p-2 absolute top-0"></div>
        <div className="bg-gray-400 h-[24px] w-full rounded-md" />
      </li>
    );
  }
  return (
    <>
      <ul className="grid sm:grid-cols-4 xl:grid-cols-6 gap-2 p-2">{cards}</ul>
    </>
  );
};

export default LoadingCards;
