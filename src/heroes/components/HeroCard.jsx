import { Link } from "react-router-dom";

const CharactersByHero = ({ alter_ego, characters }) => (
  <p className="card-text">
    {alter_ego === characters ? alter_ego : characters}
  </p>
);

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroImageUrl = `./heroes/${id}.jpg`;

  return (
    <div className="col  animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} className="card-img" alt={superhero} />
          </div>

          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>

              <CharactersByHero alter_ego={alter_ego} characters={characters} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              <Link to={`/hero/${id}`}>Read More...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
