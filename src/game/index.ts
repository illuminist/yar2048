import _ from 'lodash'
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'
import seedrandom from 'seedrandom'

export type MoveSet = 'up' | 'down' | 'left' | 'right'

export type NumberPair = [number, number]

export type PieceType = {
  id: string
  position: NumberPair
  score: number
  removed?: boolean
  moved?: { combine?: string; from: NumberPair | null }
}

export type BoardType = {
  boardSize: number
  startTime: number
  startSeed: any
  pieces: PieceType[]
  moveHistory: MoveSet[]
  moveCount: number
  nextValidMoves: MoveSet[]
  ended: boolean
  endedTime?: number
}

export const newGame = createAction(
  'newGame',
  (arg: { boardSize?: number; seed?: any }) => {
    return {
      payload: {
        boardSize: arg.boardSize || 4,
        startSeed: arg.seed || Date.now().toString(36),
        startTime: Date.now(),
      },
    }
  },
)

export const move = createAction(
  'move',
  (
    dir: MoveSet,
    board?: { boardSize: number },
    options?: { noGen: boolean },
  ) => {
    return {
      payload: dir,
      meta: { board, noGen: options?.noGen || false },
    }
  },
)

export const addPiece = createAction(
  'addpiece',
  (
    board: { boardSize: number } = { boardSize: 4 },
    options?: { noGen: boolean },
  ) => {
    return {
      payload: undefined,
      meta: { board, noGen: options?.noGen || false },
    }
  },
)

export const randomNumberGenerator = (seed: any) => {
  console.log(JSON.stringify(_.omit(seed, 'startTime')))
  const rand = seedrandom(JSON.stringify(_.omit(seed, 'startTime')))
  return rand
}

export const piecesReducer = createReducer<PieceType[]>([], (builder) =>
  builder
    .addCase(move, (state, { payload, meta }) => {
      const { boardSize = 4 } = meta?.board || {}
      const d1 = payload === 'up' || payload === 'down' ? 0 : 1
      const d2 = d1 === 0 ? 1 : 0
      const dir = payload === 'up' || payload === 'left' ? 1 : -1

      _.pullAllBy(state, [{ removed: true }], 'removed')

      const grouped = _.groupBy(state, ({ position }) => position[d1])
      _.mapValues(grouped, (row) => {
        const sorted = row.sort(
          ({ position: p1 }, { position: p2 }) => dir * (p1[d2] - p2[d2]),
        )
        let arr: PieceType[] = []
        let cellPointer = dir > 0 ? 0 : boardSize - 1
        sorted.forEach((piece) => {
          const { position, score } = piece
          const origin = _.cloneDeep(position)

          if (
            dir > 0 ? position[d2] > cellPointer : position[d2] < cellPointer
          ) {
            if (arr[cellPointer] && arr[cellPointer].score === score) {
              arr[cellPointer].score += score
              piece.removed = true
              piece.moved = {
                combine: arr[cellPointer].id,
                from: origin,
              }
              piece.position[d2] = cellPointer

              cellPointer += dir
            } else if (arr[cellPointer]) {
              cellPointer += dir

              if (piece.position[d2] !== cellPointer) {
                piece.position[d2] = cellPointer
                piece.moved = { from: origin }
              } else {
                delete piece.moved
              }

              arr[cellPointer] = piece
            } else {
              piece.position[d2] = cellPointer
              piece.moved = { from: origin }
              arr[cellPointer] = piece
            }
          } else {
            piece.position = origin // TODO report for a bug immer proxy leak
            arr[cellPointer] = piece
            delete piece.moved
          }
        })
      })
    })
    .addCase(addPiece, (state, { meta }) => {
      const { boardSize } = meta.board
      const rand = randomNumberGenerator(meta.board)
      const occupiedPosition = new Set(
        state.filter((p) => !p.removed).map((p) => JSON.stringify(p.position)),
      )
      const allPos = new Set(
        _.flatMap(
          _.times(boardSize, (x) =>
            _.times(boardSize, (y) => JSON.stringify([x, y])),
          ),
        ),
      )
      occupiedPosition.forEach((p) => allPos.delete(p))
      const availablePos = Array.from(allPos.values())
      const num = Math.min(
        availablePos.length,
        1 + Math.floor(availablePos.length / 8),
      )
      _.times(num, () => {
        const i = Math.floor(rand() * availablePos.length)
        const posStr = availablePos.splice(i, 1)
        const possibleScore = [2, 2, 4]
        state.push({
          id: Math.floor(rand() * Number.MAX_SAFE_INTEGER).toString(36),
          position: JSON.parse(posStr[0]),
          score: possibleScore[Math.floor(rand() * possibleScore.length)],
          moved: { from: null },
        })
      })
    }),
)

const determineNextValidMoves = (state: BoardType) => {
  const moveSet: MoveSet[] = ['left', 'right', 'up', 'down']
  return moveSet.filter((m) => {
    const nextPieceState = piecesReducer(state.pieces, {
      type: 'move',
      payload: m,
      meta: { board: state },
    })
    return nextPieceState.some((p) => p.moved?.from)
  })
}

const defaultBoard: BoardType = {
  boardSize: 4,
  startTime: 0,
  pieces: [],
  moveHistory: [],
  nextValidMoves: [],
  startSeed: null,
  moveCount: 0,
  ended: false,
}

export const board = createSlice({
  name: 'board',
  initialState: defaultBoard,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(newGame, (state, { payload }) => {
        const board: BoardType = {
          startTime: payload.startTime,
          boardSize: payload.boardSize,
          startSeed: payload.startSeed,
          moveCount: 0,
          pieces: [],
          nextValidMoves: [],
          moveHistory: [],
          ended: false,
        }
        board.pieces = piecesReducer(board.pieces, addPiece(board))
        board.nextValidMoves = determineNextValidMoves(board)
        return board
      })
      .addCase(move, (state, action) => {
        // cloneDeep to avoid weird immer behavior https://github.com/immerjs/immer/issues/559
        state.pieces = piecesReducer(_.cloneDeep(state.pieces), {
          ...action,
          meta: { board: state },
        })
        const moved = state.pieces.some((p) => p.moved?.from)
        state.pieces.forEach((p) =>
          console.log(p.id, p.position, p.moved?.from),
        )
        console.log(moved)
        if (moved && !action.meta.noGen) {
          state.pieces = piecesReducer(state.pieces, addPiece(state))
        }
        if (moved) {
          state.moveHistory.push(action.payload)
          state.moveCount++
        }

        // determine next valid move
        state.nextValidMoves = determineNextValidMoves(_.cloneDeep(state))
      }),
})

export default board
