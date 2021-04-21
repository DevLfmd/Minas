import { TBoard } from './gameTypes';

/**
 * Criar o tabuleiro
 * @param rows 
 * @param columns 
 */
const createBoard = (rows: number, columns: number) => (
    Array(rows).fill(0).map((_:number, row: number) => (
        Array(columns).fill(0).map((_:number, column: number) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    ))
);

/**
 * Espalha minas pelo tabuleiro
 * @param board
 * @param minesAmount
 */
const spreadMines = (board: TBoard[][], minesAmount: number) => {
    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;

    while(minesPlanted < minesAmount) {
        const rowSel = parseInt(`${Math.random() * rows}`, 10);
        const columnSel = parseInt(`${Math.random() * columns}`, 10);
        if(!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true;
            minesPlanted++;
        };
    };
};

/**
 * Cria o campo minado
 */
export const createMinedBoard = (rows: number, columns: number, minesAmount: number) => {
    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
};

/**
 * Clona o tabuleiro
 * @param board 
 */
export const cloneBoard = (board: TBoard[][]) => (
    board.map((rows: any) => (
        rows.map((field: any) => ({ ...field }))
    ))
);

/**
 * Retorna os vizinhos de determinado campo
 * @param board 
 * @param row 
 * @param column 
 */
const getNeighbors = (board: TBoard[][], row: number, column: number) => {
    const neighbors: any[] = [];
    const rows = [row-1, row, row+1];
    const columns = [column-1, column, column+1];
    rows.forEach((r: number) => {
        columns.forEach((c: number) => {
            const different = r !== row && c !== column;
            const validRow = r >= 0 && r < board.length;
            const validColumn = c >= 0 && c < board[0].length;
            if(different && validRow && validColumn) {
                neighbors.push(board[r][c]);
            };
        });
    });
    return neighbors;
};

/**
 * Retorna se vizinha é segura
 * @param board 
 * @param row 
 * @param column 
 */
const safeNeighborhood = (board: TBoard[][], row: number, column: number) => {
    const safeFunc = (result: any, neighbor: any) => result && !neighbor.mined;
    return getNeighbors(board, row, column).reduce(safeFunc, true);
};

/**
 * Abre determinado campo
 * @param board 
 * @param row 
 * @param column 
 */
export const openField = (board: TBoard[][], row: number, column: number) => {
    const field = board[row][column];
    if(!field.opened) {
        field.opened = true;
        if(field.mined) {
            field.exploded = true;
        } else if(safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach((n: any) => (
                    openField(board, n.row, n.column)
                ))
        } else {
            const neighbors = getNeighbors(board, row, column);
            field.nearMines = neighbors.filter((n: any) => n.mined).length;
        };
    };
};

/**
 * Marca uma bandeira
 * @param board 
 * @param row 
 * @param column 
 */
export const invertFlag = (board: TBoard[][], row: number, column: number) => {
    const field = board[row][column];
    field.flagged = !field.flagged;
};

/**
 * Flags utilizadas no jogo
 * @param board 
 */
export const flagCount = (board: TBoard[][]) => fields(board).filter((field: any) => field.flagged).length;

/**
 * Retorna o tabuleiro em outro formato
 * @param board 
 */
const fields = (board: any) => [].concat(...board);

/**
 * Verifica se há uma explosão no tabuleiro
 * @param board 
 */
export const hadExplosion = (board: TBoard[][]) => fields(board)
    .filter((field: any) => field.exploded).length > 0;

/**
 * Verifica se há campos a serem abertos
 * @param field 
 */
const pendding = (field: TBoard) => (
    (field.mined && !field.flagged) || (!field.mined && !field.opened)
);

/**
 * Retorna se ganhou o game
 * @param board 
 */
export const wonGame = (board: TBoard[][]) => (fields(board).filter(pendding).length === 0);

export const showMines = (board: TBoard[][]) => (
    fields(board).filter((field: TBoard) => field.mined)
        .forEach((field: TBoard) => field.opened = true)
);
