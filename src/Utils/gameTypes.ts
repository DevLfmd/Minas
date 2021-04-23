/**
 * Tipo de dados do estado do jogo
 */
export type TGameState = {
    board: TBoard[][];
    won: boolean;
    lost: boolean;
    showLevelSelection: boolean;
};
  
/**
 * Tipo de dados do tabuleiro
 */
export type TBoard = {
    row: number;
    column: number;
    opened: boolean;
    flagged: boolean;
    mined: boolean;
    exploded: boolean;
    nearMines: number;
};

/**
 * Tipo de dados dos parâmetros do jogo
 */
export type GameParams = {
    blockSize: number;
    borderSize: number;
    fontSize: number;
    headerRatio: number;
    difficultLevel: number;
    getColumnsAmount: () => number;
    getRowsAmount: () => number; 
};