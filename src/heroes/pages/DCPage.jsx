import { HeroList } from "../components";

export const DCPage = () => {
  const DCPublisher = "DC Comics";

  return (
    <>
      <h1>{DCPublisher}</h1>
      <hr />

      <HeroList publisher={DCPublisher} />
    </>
  );
};
