import React from 'react';
import { StyleSheet, Alert, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { params } from './src/Utils/gameParams';
import View from './src/components/View';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import LevelSelection from './src/components/LevelSelection';
import { TGameState } from './src/Utils/gameTypes'; 

import { 
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagCount
} from './src/Utils/gameFunctions';

export const App = () => {

  /**
   * Parâmetros do jogo
   */
  const [cols, setCols] = React.useState<number>(params.getColumnsAmount());
  const [rows, setRows] = React.useState<number>(params.getRowsAmount());
  const [state, setState] = React.useState<TGameState>({
    board: [],
    won: false,
    lost: false,
    showLevelSelection: true
  });

  /**
   * Quantidade de campos
   */
  const minesAmount = () => (Math.ceil(cols * rows * params.difficultLevel));

  /**
   * Cria o estado do jogo
   */
  const createState = () => {
    const board = createMinedBoard(rows, cols, minesAmount());
    return ({
      board,
      won: false,
      lost: false,
      showLevelSelection: false
    });
  };

  /**
   * Função para tratar o abrir de um campo
   */
  const onOpenField = (row: number, column: number) => {
    const board = cloneBoard(state.board);

    openField(board, row, column);
    
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if(won === true)
      Alert.alert('Parabéns, ganhou ! !');
    
    if(lost === true) {
      showMines(board);
      Alert.alert('Perdeu ! !');
    };

    setState({ ...state, board, lost, won });
  };

  /**
   * Função para marcar bandeira
   */
  const onSelectField = (row: number, column: number) => {
    const board = cloneBoard(state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if(won === true)
      Alert.alert('Parabéns', 'Você Venceu!');

    setState({ ...state, board, won });
  };

  /**
   * Função para setar dificuldade do jogo
   */
  const setLevel = (lvl: number) => {
    params.difficultLevel = lvl;
    setState(createState());
  };

  React.useEffect(() => { 
    SplashScreen.hide();
    setState(createState());
  }, []);

  return (
    <View style={styles.container}>
      <Header 
        flagsLeft={minesAmount() - flagCount(state?.board !== undefined ? state.board : [])}
        onNewGame={() => setState(createState())}
        onFlagPress={() => setState({ ...state, showLevelSelection: true })}
      />
      <LevelSelection 
        visible={state.showLevelSelection} 
        onCancel={() => setState({ ...state, showLevelSelection: false })}
        onSelectLevel={(lvl) => setLevel(lvl)}
      ></LevelSelection>
      <View style={styles.board}>
        <MineField 
          board={state?.board} 
          openField={(r, c) => onOpenField(r, c)}
          onSelectField={(r, c) => onSelectField(r, c)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});