import { HeroList } from "../components";

export const MarvelPage = () => {
  const MarvelPublisher = "Marvel Comics";

  return (
    <>
      <h1>{MarvelPublisher}</h1>
      <hr />

      <HeroList publisher={MarvelPublisher} />
    </>
  );
};
