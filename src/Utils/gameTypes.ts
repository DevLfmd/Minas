/**
 * Tipo de dados do tabuleiro
 */
export type TBoard = {
    row: number;
    column: number;
    opened: Boolean;
    flagged: Boolean;
    mined: Boolean;
    exploded: Boolean;
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