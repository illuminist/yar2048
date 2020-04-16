import board, { piecesReducer, move, MoveSet, PieceType } from './index'

const movedirection: MoveSet[] = ['up', 'left', 'down', 'right']
const testBoardSize = [4, 5]

const rotateBoardCCW = (pieces: PieceType[], boardSize = 4) => {
  return pieces.map((p) => ({
    ...p,
    position: [p.position[1], boardSize - p.position[0] - 1] as [
      number,
      number,
    ],
    ...(p.moved && {
      moved: {
        ...p.moved,
        from:
          p.moved.from &&
          ([p.moved.from[1], boardSize - p.moved.from[0] - 1] as [
            number,
            number,
          ]),
      },
    }),
  }))
}

describe('rotateBoard', () => {
  it('rotateBoard 1', () => {
    expect(
      rotateBoardCCW([
        { id: '0', position: [0, 1], score: 1 },
        { id: '1', position: [1, 2], score: 1 },
      ]),
    ).toMatchObject([
      { id: '0', position: [1, 3], score: 1 },
      { id: '1', position: [2, 2], score: 1 },
    ])
  })
})

describe('piecesReducer', () => {
  const testMoveForDirection = (
    itdoes: string,
    start: PieceType[],
    expected: PieceType[],
  ) => {
    testBoardSize.forEach((size) => {
      let board = start
      let expected1 = expected
      movedirection.forEach((dir) => {
        const b = board
        const e = expected1
        expected1 = rotateBoardCCW(expected1, size)
        board = rotateBoardCCW(board, size)

        describe(`size ${size} moving ${dir}`, () => {
          it(itdoes, () => {
            expect(
              piecesReducer(b, move(dir, { boardSize: size }, { noGen: true })),
            ).toStrictEqual<PieceType[]>(e)
          })
        })
      })
    })
  }

  testMoveForDirection(
    'moves',
    [
      { id: '0', position: [0, 1], score: 1 },
      { id: '1', position: [1, 2], score: 1 },
    ],
    [
      { id: '0', position: [0, 0], score: 1, moved: { from: [0, 1] } },
      { id: '1', position: [1, 0], score: 1, moved: { from: [1, 2] } },
    ],
  )

  testMoveForDirection(
    'moves but piece already at the edge',
    [
      { id: '0', position: [0, 0], score: 1 },
      { id: '1', position: [1, 0], score: 1 },
    ],
    [
      { id: '0', position: [0, 0], score: 1 },
      { id: '1', position: [1, 0], score: 1 },
    ],
  )

  testMoveForDirection(
    'with stop after another piece',
    [
      { id: '0', position: [0, 1], score: 1 },
      { id: '1', position: [1, 2], score: 1 },
      { id: '3', position: [0, 2], score: 2 },
      { id: '4', position: [1, 4], score: 2 },
    ],
    [
      { id: '0', position: [0, 0], score: 1, moved: { from: [0, 1] } },
      { id: '1', position: [1, 0], score: 1, moved: { from: [1, 2] } },
      { id: '3', position: [0, 1], score: 2, moved: { from: [0, 2] } },
      { id: '4', position: [1, 1], score: 2, moved: { from: [1, 4] } },
    ],
  )

  testMoveForDirection(
    'and combine',
    [
      { id: '0', position: [0, 1], score: 1 },
      { id: '1', position: [1, 2], score: 1 },
      { id: '3', position: [0, 2], score: 1 },
      { id: '4', position: [1, 4], score: 1 },
    ],

    [
      { id: '0', position: [0, 0], score: 2, moved: { from: [0, 1] } },
      { id: '1', position: [1, 0], score: 2, moved: { from: [1, 2] } },
      {
        id: '3',
        position: [0, 0],
        score: 1,
        removed: true,
        moved: { from: [0, 2], combine: '0' },
      },
      {
        id: '4',
        position: [1, 0],
        score: 1,
        removed: true,
        moved: { from: [1, 4], combine: '1' },
      },
    ],
  )

  testMoveForDirection(
    'and combine only one',
    [
      { id: '0', position: [0, 1], score: 1 },
      { id: '1', position: [0, 2], score: 1 },
      { id: '2', position: [0, 3], score: 1 },
    ],

    [
      { id: '0', position: [0, 0], score: 2, moved: { from: [0, 1] } },
      {
        id: '1',
        position: [0, 0],
        score: 1,
        removed: true,
        moved: { from: [0, 2], combine: '0' },
      },
      { id: '2', position: [0, 1], score: 1, moved: { from: [0, 3] } },
    ],
  )

  testMoveForDirection(
    'and combine every piece',
    [
      { id: '0', position: [0, 0], score: 1 },
      { id: '1', position: [0, 1], score: 1 },
      { id: '2', position: [0, 2], score: 1 },
      { id: '3', position: [0, 3], score: 1 },
    ],

    [
      { id: '0', position: [0, 0], score: 2 },
      {
        id: '1',
        position: [0, 0],
        score: 1,
        removed: true,
        moved: { from: [0, 1], combine: '0' },
      },
      { id: '2', position: [0, 1], score: 2, moved: { from: [0, 2] } },
      {
        id: '3',
        position: [0, 1],
        score: 1,
        removed: true,
        moved: { from: [0, 3], combine: '2' },
      },
    ],
  )
})

describe('game reducer, issue case', () => {
  it('immer proxy leak', () => {
    const boardState = {
      moveCount: 1,
      moveHistory: ['left'],
      boardSize: 4,
      pieces: [
        {
          id: '1',
          position: [0, 2],
          score: 2,
          moved: {
            from: [1, 2],
          },
        },
        {
          id: '2',
          position: [0, 3],
          score: 4,
          moved: {
            from: [2, 3],
          },
        },
        {
          id: 'pzqf9gpiej',
          position: [0, 0],
          score: 2,
          moved: {
            from: null,
          },
        },
      ],
    }

    const action = move('up')
    expect(board.reducer(boardState as any, action)).toMatchSnapshot()
  })

  it('immer proxy leak 2', () => {
    const boardState = {
      moveCount: 3,
      moveHistory: ['left', 'up', 'up'],
      boardSize: 4,
      pieces: [
        {
          id: '2',
          position: [0, 0],
          score: 4,
          moved: {
            combine: 'pzqf9gpiej',
            from: [0, 1],
          },
          removed: true,
        },
        {
          id: 'pzqf9gpiej',
          position: [0, 0],
          score: 8,
        },
        {
          id: '2cpkkn7ud6q',
          position: [1, 0],
          score: 2,
          moved: {
            from: [1, 1],
          },
        },
        {
          id: '1dfa49b3tmh',
          position: [2, 0],
          score: 4,
          moved: {
            from: [2, 1],
          },
        },
        {
          id: '13tjtrfqovt',
          position: [1, 3],
          score: 2,
          moved: {
            from: null,
          },
        },
      ],
    }

    const action = move('left')
    expect(board.reducer(boardState as any, action)).toMatchSnapshot()
  })

  it('immer proxy leak 3', () => {
    const state = {
      moveCount: 1,
      moveHistory: ['left'],
      boardSize: 4,
      pieces: [
        {
          id: '1',
          position: [0, 2],
          score: 2,
          moved: {
            from: [1, 2],
          },
        },
        {
          id: '2',
          position: [0, 3],
          score: 4,
          moved: {
            from: [2, 3],
          },
        },
        {
          id: 'pzqf9gpiej',
          position: [0, 0],
          score: 2,
          moved: {
            from: null,
          },
        },
      ],
    }
    const action = move('down', undefined)
    expect(board.reducer(state as any, action)).toMatchSnapshot()
  })
})
