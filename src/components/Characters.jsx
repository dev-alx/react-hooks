import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Search from "./Search";
import useCharacters from "./../hooks/useCharacters";

const initialState = {
  favorites: [],
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return {
        //estado original
        ...state,
        //elementos de favoritos
        favorites: [...state.favorites, action.payload],
      };

    default:
      return state;
  }
};

const API = "https://rickandmortyapi.com/api/character";

const Characters = () => {
  //usamos useState
  //const [characters, setCharacters] = useState([]);

  //implementando useReducer
  const [favorites, dispatch] = useReducer(favoritesReducer, initialState);

  const [search, setSearch] = useState("");

  //
  const searchInput = useRef(null);

  //Variable que no esta escuchando | solo escucha una vez
  // useEffect(() => {
  //     fetch('https://rickandmortyapi.com/api/character')
  //     .then(response => response.json())
  //     .then(data => setCharacters(data.results));
  // }, []);

  const characters = useCharacters(API);

  const handleClick = (favorites) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: favorites });
  };

  //Sin useRef
  // const handleSearch = (event) => {
  //     setSearch(event.target.value);
  // }

  //mejora con useRef
  // const handleSearch = () => {
  //     setSearch(searchInput.current.value);
  // }

  //con useCallback
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  //sin useMemo
  // const filteredUsers = characters.filter((user) => {
  //     return user.name.toLowerCase().includes(search.toLowerCase());
  // })
  //con useMemo
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="container">
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      <div class="card mb-2">
        <h5 className="card-title">Favorites Characters</h5>
        <div class="card-body">
          {favorites.favorites.map((favorite) => (
            <li className="text-left" key={favorite.id}>{favorite.name}</li>
          ))}
        </div>
      </div>

      {/* <div className="Search">
               <input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
           </div> */}

      <div className="row">
        {filteredUsers.map((character) => (
          <div className="col-sm-3" key={character.id}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src={character.image}
                alt="Card image cap"
              ></img>
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <span className="card-text font-weight-bold">
                  Species:
                </span>{" "}
                {character.species}
                <br />
                <span className="card-text font-weight-bold">Status:</span>{" "}
                {character.status}
                <br />
                <span className="card-text font-weight-bold">Gender:</span>{" "}
                {character.gender}
                <button
                  className="btn btn-primary"
                  onClick={() => handleClick(character)}
                >
                  Add To Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;

/*{ <div className="item" key={character.id}>
                        <img alt="imagen" width="200" height="200" src={character.image}></img>
                        <h2 key={character.id}>{character.name}</h2>
                        <button type="button" onClick={() => handleClick(character)}>Agregar a Favoritos</button>
                </div> }*/
