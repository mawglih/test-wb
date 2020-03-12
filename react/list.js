import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import swapiActions from 'store/render-swapi/render-swapi.actions';
import pokeActions from 'store/render-poke/render-poke.actions';
import ListItems from 'components/Listitem';
import styles from './list.css';


const List = ({ title }) => {
  const dispatch = useDispatch();
  const { ships, loading: shipsLoading, error: shipError } = useSelector(state => state.swapi,);
  const { poke, loading: pokeLoading, error: pokeError } = useSelector(state => state.poke);
  const actions = useMemo(
		() =>
			bindActionCreators(
				{
          swapi: swapiActions.getSwapiRequested,
          poke: pokeActions.getPokerequested
				},
				dispatch,
			),
		[],
  );

  useEffect(() => {
    actions.swapi(),
    actions.poke(),
  });
  
  return (
    <>
      <h1 className={styles.mainTitle}>{title}</h1>
      <div className={styles.container}>
        {!shipError && <ListItems 
          loading={shipsLoading}
          listItems={ships}
        />}
        {!pokeError && <ListItems 
          loading={pokeLoading}
          listItems={poke}
        />
        }
      </div>
    </>
  )
};

export default List;

// assuming the following: 
// use React 16.12
// use Redux
// use Redux-saga
// api call uses axios - in separate file
// store is setup in separate directory
// project is ejected and css is configured in comfig:
//{
//   loader: require.resolve('css-loader'),
//   options: {
//     importLoaders: 1,
//     modules: true,
//     localIdentName: '[name]__[local]___[hash:base64:5]',
//   },
// },
// also node modules are set to access all directories in src:
// node_path=/src in .env file